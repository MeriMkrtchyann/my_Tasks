const updateSortOrderInColumns = (prevColumns, newSortField, sorter) => {
    return prevColumns.map(column => {
      if ('dataIndex' in column && column.dataIndex === newSortField) {
        return {
          ...column,
          sortOrder: sorter.order,
        };
      }
      return {
        ...column,
        sortOrder: null,
      };
    });
  };

export {updateSortOrderInColumns}