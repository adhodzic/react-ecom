
import apiService from "../../services/userApi";
import TableLayout from "../Core/Table/TableLayout";
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
            <TableLayout apiService={apiService} title="User" modalProp={usersProp}></TableLayout>
        </div>
    );
}

export default UserList;
