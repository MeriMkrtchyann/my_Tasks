const paginationConfig = (total) => {
    return {
      current: 1,
      pageSize: 10,
      total,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30'],
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        console.log('Page:', page, 'PageSize:', pageSize);
      },
    };
  };
  
  export {paginationConfig}