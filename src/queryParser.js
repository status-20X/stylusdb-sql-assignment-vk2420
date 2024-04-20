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

  const operatorRegex = /([=!<>]=?)/;

  
  const conditions = whereString.split(/\s+(?:AND|OR)\s+/i);

  return conditions.map(condition => {
   
      const [fieldWithValue, operator, value] = condition.split(operatorRegex);
      const field = fieldWithValue.trim();
     
      const trimmedValue = value.trim();
      return { field, operator, value: trimmedValue };
  });
}



module.exports = {parseQuery,parseWhereClause};
