const {parseQuery} = require('./queryParser');
const {readCSV} = require('./csvReader');

async function executeSELECTQuery(query) {
    const { fields, table } = parseQuery(query);
    const filteredData = [];

    // Read the CSV file and filter the fields based on the query
    await readCSV(`${table}.csv`).then(data => {
        data.forEach(row => {
            const filteredRow = {};
            fields.forEach(field => {
                filteredRow[field] = row[field];
            });
            filteredData.push(filteredRow);
        });
    }).catch(error => {
        // Handle errors while reading CSV file
        console.error('Error reading CSV file:', error);
    });

    return filteredData;
}

module.exports = {executeSELECTQuery,readCSV,parseQuery};
