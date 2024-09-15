import  { useState } from 'react';
import { collection,addDoc,getFirestore } from "firebase/firestore"; 
import {app} from '../firebase'
import { useNavigate } from 'react-router-dom';

function Addfaculty() {
    const [name,setname] = useState('')
    const [phone,setphone] = useState(null)

    const navigate = useNavigate()

    const submithandler = async (e) =>{
        e.preventDefault();
        console.log(name, phone);
        const db = getFirestore(app)
        
        const docref = await addDoc(collection(db,'faculty'),{
            fname : name,
            phone : phone
        })

        navigate('/dashboard/facultylist')
        console.log(docref,docref.id);
        
    }
    

    return (
        <div>
            <h1>add faculty</h1>
            <form onSubmit={submithandler}>
                <input type="text" onChange={(e) => setname(e.target.value)} placeholder='enter faculty name'/>
                <input type="number" onChange={(e) => setphone(e.target.value)} placeholder='phone number'/>
                <button type='submit'>submit</button>
            </form>
        </div>
    );
}

export default Addfaculty;