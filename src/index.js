const {parseQuery} = require('./queryParser');
const {readCSV} = require('./csvReader');


async function executeSELECTQuery(query) {
    const { fields, table, where } = parseQuery(query);
    const filteredData = [];

    // Read the CSV file
    const data = await readCSV(`${table}.csv`).catch(error => {
        // Handle errors while reading CSV file
        console.error('Error reading CSV file:', error);
        return [];
    });

    // Filter the data based on the WHERE condition
    if (where) {
        data.forEach(row => {
            // Evaluate the WHERE condition for each row
            if (evaluateCondition(row, where)) {
                const filteredRow = {};
                fields.forEach(field => {
                    filteredRow[field] = row[field];
                });
                filteredData.push(filteredRow);
            }
        });
    } else {
        // If no WHERE condition, include all rows
        data.forEach(row => {
            const filteredRow = {};
            fields.forEach(field => {
                filteredRow[field] = row[field];
            });
            filteredData.push(filteredRow);
        });
    }

    return filteredData;
}

// Helper function to evaluate the WHERE condition
function evaluateCondition(row, condition) {
    const [field, operator, value] = condition.split(/\s+/);
    // Assuming simple comparison, e.g., "field = value"
    return row[field] && row[field].toString() === value;
}



// Example usage:
async function main() {
    try {
        const result = await executeSELECTQuery('SELECT id, name FROM sample WHERE id = 1');
        console.log(result);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();

module.exports = { executeSELECTQuery,readCSV,parseQuery };