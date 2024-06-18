import { Breadcrumb} from "antd";
import { PersonalAdminInfo } from "../components/adminDetails/PersonalAdminInfo";
import { InputAdminInfo } from "../components/adminDetails/InputAdminInfo";

const AdminDetails = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column' , gap: 25 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Իմ էջը </Breadcrumb.Item>
                <Breadcrumb.Item>Խմբագրել</Breadcrumb.Item>
            </Breadcrumb>
            <PersonalAdminInfo/>
            <InputAdminInfo/>
        </div>
    );
};

export { AdminDetails };
