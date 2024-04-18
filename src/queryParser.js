function parseQuery(query) {
  const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
  const match = query.match(selectRegex);

  if (match) {
      const [, fields, table, where] = match;
      const parsedData = {
          fields: fields.split(',').map(field => field.trim()),
          table: table.trim(),
          where: null // Initialize 'where' property
      };

      if (where) {
          // Extract and store the WHERE clause separately
          parsedData.where = where.trim();
      }
console.log(parsedData)
      return parsedData;
  } else {
      throw new Error('Invalid query format');
  }
}

module.exports = {parseQuery};

