import { updateSortOrderInColumns } from '../utils/utils';
import { updatePagination } from '../../redux/slices/audits/auditsSlice';

export const handleTableChange = (dispatch, setColumns ) => (pagination, _filters, sorter) => {

  const newSortOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
  const newSortField = sorter.field || "createdAt";
  
  dispatch(updatePagination({
    page: pagination.current,
    size: pagination.pageSize,
    sortOrder: newSortOrder,
    sortField: newSortField,
    defaultSort: null, 
  }));

  setColumns(prevColumns => updateSortOrderInColumns(prevColumns, newSortField, sorter));
};
