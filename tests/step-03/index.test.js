const parseQuery = require('../../src/queryParser');

test('Read CSV File', async () => {
    const data = await readCSV('./sample.csv');
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(3);
    expect(data[0].name).toBe('John');
    expect(data[0].age).toBe('30'); //ignore the string type here, we will fix this later
});

test('Parse SQL Query', () => {
    const query = 'SELECT id, name FROM sample';
    const parsedData = parseQuery(query);
    expect(parsedData).toEqual({
        fields: ['id', 'name'],
        table: 'sample'
    });
});