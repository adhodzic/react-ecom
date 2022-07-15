import { useEffect, useState } from "react";
import apiService from "../../services/userApi";
import {Table} from "react-bootstrap"
function UserList() {
    const [users, setUsers] = useState();
    useEffect(() => {
        const getData = async function () {
            const data = await apiService.getUsers();
            setUsers(data);
            console.log(data);
        };
        getData();
    }, []);
    return (
        <div className="UserList">
            {users && <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, i) => {
                        return (
                            <tr>
                                <td>{i+1}</td>
                                <td>{user.FullName}</td>
                                <td>{user.Username}</td>
                                <td>{user.Role}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>}
        </div>
    );
}

export default UserList;
