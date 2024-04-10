function parseSql(query) {
   
    const selectPattern = /SELECT\s+(.+?)\s+FROM/i;
    const fromPattern = /FROM\s+(.+)/i;
  
    const selectMatch = selectPattern.exec(query);
    const fromMatch = fromPattern.exec(query);
  
    if (selectMatch && fromMatch) {
      const selectFields = selectMatch[1].trim().split(/\s*,\s*/);
      const fromTable = fromMatch[1].trim();
  
      return {
        selectFields,
        fromTable,
      };
    }
  
    return null;
  }