
const hasRole = function (role){
    let user = JSON.parse(getUserFromLocalStorage())
    return user ? user.Role.includes(role):false;
}
function getUserFromLocalStorage(){
    return localStorage.getItem('User')
}
module.exports = {hasRole} ;