function parseQuery(sqlQuery) {
  // Regular expression patterns
  const selectPattern = /SELECT\s+(.+?)\s+FROM/i;
  const fromPattern = /FROM\s+(\w+)/i;

  // Match SELECT fields
  const selectMatch = sqlQuery.match(selectPattern);
  const selectFields = selectMatch ? selectMatch[1].split(',').map(field => field.trim()) : [];

  // Match FROM table
  const fromMatch = sqlQuery.match(fromPattern);
  const fromTable = fromMatch ? fromMatch[1] : null;

  // Return parsed data
  return {
      fields: selectFields,
      table: fromTable
  };
}
module.exports = {parseQuery};
// Example usage:
const query = 'SELECT id, name FROM sample';
const parsedData = parseQuery(query);
console.log(parsedData);
