const {parseQuery} = require('./queryParser');
const {readCSV} = require('./csvReader');

async function executeSELECTQuery(query) {
    // Parse the SQL query to extract fields, table, and whereClauses
    const { fields, table, whereClauses } = parseQuery(query);

    // Read the CSV file data
    const data = await readCSV(`${table}.csv`);

    // Apply WHERE clause filtering if whereClauses exist
    const filteredData = whereClauses.length > 0
        ? data.filter(row => {
            // Check if all whereClauses conditions are satisfied for the row
            return whereClauses.every(clause => {
                // You can expand this to handle different operators
                return row[clause.field] === clause.value;
            });
        })
        : data;

    // Select the specified fields from the filtered data
    const selectedData = filteredData.map(row => {
        const selectedRow = {};
        fields.forEach(field => {
            selectedRow[field] = row[field];
        });
        return selectedRow;
    });

    return selectedData;
}

module.exports = {executeSELECTQuery,readCSV,parseQuery};
