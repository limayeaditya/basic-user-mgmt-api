

let allUsers = [
    {
        id: 0,
        name:"Try1",
        email:"try1@example.com",
        phone:"9887897889",
        password:"123456"
    }
    
]

const getUserData = (name)=>{
    for(let i=0;i<allUsers.length;i++){
        if(allUsers[i].name === name){
            return allUsers[i]
        }
    }
}
const updateUserData = (emailInToken,name,email,phone)=>{
    for(let i=0;i<allUsers.length;i++){
        if(allUsers[i].email === emailInToken){
            allUsers[i].name = name
            allUsers[i].email = email
            allUsers[i].phone = phone
        }
        console.log(allUsers[i]);
        
        return allUsers[i]
    }
}


const registerUser = (name,email,phone,password)=>{
    const id = allUsers.length + 1
    let user = {
        id: id,
        name: name,
        email: email,
        phone: phone,
        password:password
    }
    allUsers.push(user)
    
}

const loginUser = (email,password)=>{
    for(let i=0;i<allUsers.length;i++){
        if(allUsers[i].email === email && allUsers[i].password === password){
        {
                console.log(allUsers[i]);
                return allUsers[i]
            }
        }else{
            return []
        }
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserData,
    updateUserData
}