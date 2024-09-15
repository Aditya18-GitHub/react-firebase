import  { useState } from 'react';
import { collection,getFirestore ,updateDoc,doc} from "firebase/firestore"; 
import {app} from '../firebase'
import { useLocation ,useNavigate} from 'react-router-dom';

function Updatefaculty() {

    const location = useLocation()
    console.log(location.state);
    
    const [name,setname] = useState(location.state.fname)
    const [phone,setphone] = useState(location.state.phone)


    const navigate = useNavigate()



    const submithandler = async (e) =>{
        e.preventDefault();
        console.log(name, phone);
        const db = getFirestore(app)

        const docref = doc(db,'faculty',location.state.id)
        
        try{
            await updateDoc(docref,{
                fname : name,
                phone : phone

            })

            navigate('/facultylist')

        }catch(error){
            console.log(error);
        }
        
    }
    

    return (
        <div>
            <h1>update faculty</h1>
            <form onSubmit={submithandler}>
                <input value={name}  type="text"  onChange={(e) => setname(e.target.value)} placeholder='enter faculty name'/>
                <input value={phone}  type="number"  onChange={(e) => setphone(e.target.value)} placeholder='phone number'/>
                <button type='submit' >update</button>
            </form>
        </div>
    );
}

export default Updatefaculty;