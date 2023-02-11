const users = [];

function userJoin(id, username,room){
    const user ={id , username , room};


users.push(user);

return user;
}


function getCurrentUser(id){
    return users.find(user =>user.id ===id);

    
}

function userLeave(id){
    const index = user.findIndex(user=>user.id ===id);

    if(index!==-1){

        return user.splice(index,1);
    }
}


function getRoomUsers(room) {
    return user.filter(user=>user.room == room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}