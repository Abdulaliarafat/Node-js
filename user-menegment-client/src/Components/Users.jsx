import React, { use } from 'react';

const Users = ({userPromise}) => {
    const users=use(userPromise)
    console.log(users)
    const handleAddUser=(e)=>{
        e.preventDefault()
        const name=e.target.name.value
        const email=e.target.email.value
        const user={name,email}
        console.log(user)
    }
    return (
        
        <div>
            <form onSubmit={handleAddUser} action="">
                <input name='name' type="text" />
                <br />
                <input type="email" name="email" id="" />
                <br />
                <input type="submit" value="Add user" />
            </form>
            <div>
                {
                users.map(user=><p key={user.id}>{user.name} :  {user.email}</p>)
            }
            </div>
        </div>
    );
};

export default Users;