function parseQuery(query) {
  const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
  const match = query.match(selectRegex);

  if (!match) {
      throw new Error('Invalid query format');
  }
  console.log(match);
  const [, fields, table, whereString] = match;
  const whereClauses = parseWhereClause(whereString);

  return {
      fields: fields.split(',').map(field => field.trim()),
      table: table.trim(),
      whereClauses: whereClauses
  };
}

function parseWhereClause(whereString) {
  if (!whereString) {
      return [];
  }

  // Split the whereString at occurrences of "AND" or "OR", excluding them from the result
  const conditions = whereString.split(/\s+(?:AND|OR)\s+/i);

  return conditions.map(condition => {
      // Split each condition into field, operator, and value
      const [field, operator, value] = condition.split(/\s+/);
      return { field, operator, value };
  });
}


module.exports = {parseQuery,parseWhereClause};
