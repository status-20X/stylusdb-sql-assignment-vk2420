const { parseQuery } = require('./queryParser');
const { readCSV } = require('./csvReader');

async function executeSELECTQuery(query) {
    const { fields, table, whereClauses } = parseQuery(query);
    const data = await readCSV(`${table}.csv`);
    console.log("thank you vanshul and priyanshu",data,"thank you vanshul and priyanshu")
    console.log(whereClauses,"open source")
    // Ensure whereClauses is an array
    if (!Array.isArray(whereClauses)) {
        throw new Error('whereClauses must be an array');
    }

    // Filter the data based on the WHERE clause
    const filteredData = whereClauses.length > 0
        ? data.filter(row => whereClauses.every(clause => evaluateCondition(row, clause)))
        : data;
    

    // Map the filtered data to select the specified fields
    const selectedData = filteredData.map(row => {
        const selectedRow = {};
        fields.forEach(field => {
            selectedRow[field] = row[field];
        });
        return selectedRow;
    });

    return selectedData;
}
/*[
    { id: '1', name: 'John', age: '30' },
    { id: '2', name: 'Jane', age: '25' },
    { id: '3', name: 'Bob', age: '22' }
  ] 
*/
function evaluateCondition(row, clause) {
    const { field, operator, value } = clause;
    switch (operator) {
        case '=': return row[field] === value;
        case '!=': return row[field] !== value;
        case '>': return row[field] > value;
        case '<': return row[field] < value;
        case '>=': return row[field] >= value;
        case '<=': return row[field] <= value;
        default: throw new Error(`Unsupported operator: ${operator}`);
    }
}

module.exports = { executeSELECTQuery, readCSV, parseQuery, evaluateCondition };
