import { useState } from "react"
import { Button } from "react-bootstrap"


function User(props) {
    const {Username, Role, FullName} = props.user
    const [username, setUsername] = useState(Username)
    const [role, setRole] = useState(Role)
    const [fullName, setFullName] = useState(FullName)
    const [isInEdit, setIsInEdit] = useState(false)
    return(
        <div className="User-info">
            {!isInEdit && <div className="User-view">
                <p>{username}</p>
                <p>{role}</p>
                <p>{fullName}</p>
            </div>}
            {isInEdit && <div className="User-edit">
                <input value={username} onChange={(e)=> setUsername(e.target.value)}></input>
                <input value={role} onChange={(e)=> setRole(e.target.value)}></input>
                <input value={fullName} onChange={(e)=> setFullName(e.target.value)}></input>
            </div>}
            <Button onClick={()=> setIsInEdit(!isInEdit)}>Edit</Button>
        </div>
    )
}

export default User