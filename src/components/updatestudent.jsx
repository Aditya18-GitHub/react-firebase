import  { useEffect, useState } from 'react';
import { getDatabase, ref, update } from "firebase/database";
import {app} from '../firebase'
import { useNavigate ,useLocation} from 'react-router-dom';
import { getStorage,ref as stref,uploadBytes,getDownloadURL } from 'firebase/storage';

function UpdateStudent() {
    const location = useLocation()

    const [name,setname] = useState(location.state[1].name)
    const[phone,setphone] = useState(location.state[1].phone)
    const[num,setadm] = useState(location.state[0])

    const[selectedfile,setselectedfile] = useState(null)


    const navigate = useNavigate()
    
    const handlefilechange = (e) => {
        const file = e.target.files[0]
        setselectedfile(file)

    }


   

    const submithander = async (e) => {
        e.preventDefault();
        //console.log(name,phone)
        if(selectedfile){
                const db = getDatabase(app);
                const studentref = ref(db,'student/'+location.state[0])

                const st = getStorage(app)

                const storageRef = stref(st,'images/'+num)
                
                await uploadBytes(storageRef,selectedfile)


                const imageurl = await getDownloadURL(storageRef)

                update(studentref,{
                    name:name,
                    phone:phone,
                    imageurl : imageurl
                })
                .then(() => {
                    navigate('/studentlist')
                })
                .catch((error)=>{
                    console.log(error);
                    
                })
        
        }
        else{
            const db = getDatabase(app);
            const studentref = ref(db,'student/'+location.state[0])

            update(studentref,{
                name:name,
                phone:phone,
                
            })
            .then(() => {
                navigate('/studentlist')
            })
            .catch((error)=>{
                console.log(error);
                
            })



        }

        

    }

    
    return (
        <div>
            <form onSubmit={submithander}>

                <input disabled value={num} onChange={(e) => setadm(e.target.value)} type="number" placeholder='adm num'/>
                <input value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder='student name'/>
                <input value={phone} onChange={(e) => setphone(e.target.value)} type="number" placeholder='phone number'/>
                <input  type="file" onChange={handlefilechange}/>
                <button type='submit'>update</button>
            </form>
        </div>
    );
}

export default UpdateStudent;