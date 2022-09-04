
import apiService from "../../services/userApi";
import CoreTable from "../Core/Table/TableLayout";
function UserList() {

    const usersProp = {
        Username: {
            ControlType: "Text"
        },
        FullName: {
            ControlType: "Text"
        },
        Role: {
            ControlType: "Text"
        }
    }

    return (
        <div className="UserList">
            <CoreTable apiService={apiService} title="User" modalProp={usersProp}></CoreTable>
        </div>
    );
}

export default UserList;
