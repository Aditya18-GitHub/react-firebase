
import { Link ,Outlet} from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth as getauth, onAuthStateChanged } from "firebase/auth";
import {app} from '../firebase'
import Login from './Login';

function Dashboard() {

    const [userlogin,setuserlogin] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const auth = getauth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in
              console.log("User is signed in:", user);
              setuserlogin(true)
              // Perform actions for logged-in users
            } else {
              // User is signed out
              
              console.log("User is signed out");
              // Perform actions for logged-out users
                
              navigate('/')
              
               
            }
          });

    },[])

    
    const logout = () => {
        const auth = getAuth();
        signOut(auth)
        .then(() => {
            // Handle successful sign-out
            console.log("User signed out successfully.");
            navigate('/')
            // Redirect to your desired page or perform other actions
        })
        .catch((error) => {
            // Handle sign-out errors
            console.error("Error signing out:", error);
        });
    }

  

    

    return (
        <>

        {userlogin && (
                <div style={{display:'flex', flexDirection : 'row'}}>
                    
                    <div style={{width:'25%' ,backgroundColor:'royalblue',height:'100vh'}}>
                            <Link  to = '/dashboard/addstudent' style={{color : 'white' , display:'block'}}>AddStudent </Link>
                            <Link  to = '/dashboard/studentlist' style={{color : 'white' , display:'block'}}>Studentlist</Link>
                            <Link  to = '/dashboard/addfaculty' style={{color : 'white' , display:'block'}}>addfaculty </Link>
                            <Link  to = '/dashboard/facultylist' style={{color : 'white' , display:'block'}}>facultylist</Link>
                            <br/>
                            <br/>
                            <button onClick={logout}>logout</button>
                    </div>

                    <div style={{width:'70%',height:'100vh'}}>
                            <Outlet/>
                    </div>

                </div>

            )   


            
        }
            
        
        
        
        
        
        
        
        
        
        
        
        </>
    );
}

export default Dashboard;