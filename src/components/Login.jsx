import React, { useState } from 'react';
import { signInWithEmailAndPassword ,getAuth,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import {app} from '../firebase'
function Login() {

    const [email,setemail] = useState('')
    const [pass,setpass] = useState(null)

    const navigate = useNavigate()

    const usersignup = (e) => {
        e.preventDefault();
        console.log(email,pass);
        const auth = getAuth(app)
        signInWithEmailAndPassword(auth, email, pass)
        .then((res) => {
            console.log(res.user);
            navigate('/dashboard')
        })
        .catch((error ) => {
            console.log(error);
            alert('please sign up first')
        })
    }


    const loginwithgoogle = () => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,provider)
        .then((res) =>{
            console.log(res);
            navigate('/dashboard')
            
        }).catch(error => {
            console.log(error);
            
        })
    }



    return (
        <div>
            <h1>login</h1>
            <form onSubmit={usersignup}>

                   <input type="email" onChange = {(e) => setemail(e.target.value)} placeholder='Enter your email'/>
                   <input type="password" onChange = {(e) => setpass(e.target.value)} placeholder='Enter password'/> 
                   <button type='submit'>Submit</button>
                    <br />
                    <br />
                    <button type='button' onClick={loginwithgoogle}>login with google</button>

            </form>
        </div>
    );
}

export default Login;