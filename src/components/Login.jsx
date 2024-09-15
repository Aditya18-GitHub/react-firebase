import React, { useState } from 'react';
import { signInWithEmailAndPassword ,getAuth,signInWithPopup,GoogleAuthProvider, signInWithPhoneNumber, RecaptchaVerifier} from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import {app} from '../firebase'
function Login() {

    const [email,setemail] = useState('')
    const [pass,setpass] = useState(null)
    const [phone,setphone] = useState(null)
    const [isopt,setisotp] = useState(false)
    const [code,setcode] = useState('')


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


    const sendotp = () =>{
        const auth = getAuth(app)
        const appverifier = new RecaptchaVerifier(auth,'abc',{'size':'invisible'})
        signInWithPhoneNumber(auth,phone,appverifier)
        .then((res) =>{
            console.log(res);
            window.confirmationres = res;
            console.log('otp send');
            setisotp(true)
            
        }).catch((error)=>{
            console.log(error);
        })
    }


    const confirmotp = () => {
        window.confirmationres.confirm(code)
        .then((res) => {
            console.log(res);
            console.log('otp confirmed');
            navigate('/dashboard')
            
        }).catch((error)=>{
            console.log(error);
        })
    }
    

    const getsignup = () =>{
        navigate('/signup')
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
                    <br />
                    <br />
                    
                    {!isopt ? 
                        <div>
                            <h3>login with otp</h3>
                            <input  onChange={(e) => setphone(e.target.value)} placeholder='enter phone num'/>
                            <div id='abc'></div>
                            <button type='button' onClick={sendotp}>send otp</button>
                        </div>

                        :

                        <div>
                            <h3>cinfirm opt</h3>
                            <input type='text' onChange={(e) => setcode(e.target.value)}/>
                            
                            <button type='button' onClick={confirmotp}>Submit OTP</button>
                        </div>

                
                
                
                    }



            </form>

            <div>
                <h3>if Not account</h3>
                <button onClick={getsignup}>signup</button>
            </div>
        </div>
    );
}

export default Login;