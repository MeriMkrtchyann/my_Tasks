const paginationConfig = (total, pageSize, current) => {
    return {
      current,
      pageSize,
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