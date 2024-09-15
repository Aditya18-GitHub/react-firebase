import React, { useState } from 'react';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import {app} from '../firebase'
import {useNavigate} from 'react-router-dom'

function Signup() {
    
    const [email,setemail] = useState('')
    const [pass,setpass] = useState(null)

    const navigate = useNavigate()

    const usersignup = (e) => {
        e.preventDefault();
        console.log(email,pass);
        const auth = getAuth(app)
        createUserWithEmailAndPassword(auth, email, pass)
        .then((res) => {
            console.log(res.user);
            navigate('/login')
        })
        .catch((error ) => {
            console.log(error);
        })
    }



    return (
        <div>
            <h1>sign up</h1>
            <form onSubmit={usersignup}>

                   <input type="email" onChange = {(e) => setemail(e.target.value)} placeholder=' email'/>
                   <input type="password" onChange = {(e) => setpass(e.target.value)} placeholder=' password'/> 
                   <button type='submit'>Submit</button>


            </form>
        </div>
    );
}

export default Signup;