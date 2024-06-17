import { Table } from "antd";
import { handleTableChange } from "../../utils/tableHelpers";

function InformationTable (prop) {

    const {columns, users, setColumns, pagination, total} = prop;

    return(
        <Table
            columns={columns} 
            dataSource={users} 
            onChange={handleTableChange(setColumns)}
            rowKey="id"
            pagination={{
                current: pagination.page,
                pageSize: pagination.size,
                total: total,
                showSizeChanger: pagination.showSizeChanger,
                pageSizeOptions: pagination.pageSizeOptions,
                showQuickJumper: pagination.showQuickJumper,
            }}
            scroll={{
                x: 1000
            }}
        />
    )
}

export {InformationTable}