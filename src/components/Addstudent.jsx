import  { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref as storageRef,uploadBytes,getDownloadURL} from "firebase/storage";
import {app} from '../firebase'
import { useNavigate } from 'react-router-dom';
function Addstudent() {
    const [name,setname] = useState('')
    const[phone,setphone] = useState(null)
    const[num,setadm] = useState(null)

    const[selectedfile,setselectedfile] = useState(null)

    const navigate = useNavigate()

    const handlefilechange = (e) => {
        const file = e.target.files[0]
        setselectedfile(file)

    }

    const submithander = async (e) => {
        e.preventDefault();
        //console.log(name,phone)
        const db = getDatabase(app);

        const storage = getStorage(app)

        const stref = storageRef(storage,`images/${num}`)

        await uploadBytes(stref,selectedfile)
        const imageurl = await getDownloadURL(stref)


        set(ref(db, 'student/'+num), {
            name: name,
            phone : phone,
            imageurl : imageurl
          })
          .then(() => navigate('/dashboard/studentlist'))
          .catch((error) => {
            console.log(error);
          })
 
    }

    
    
    return (
        <div>
            <form onSubmit={submithander}>
                <input onChange={(e) => setadm(e.target.value)} type="number" placeholder='adm num'/>
                <input onChange={(e) => setname(e.target.value)} type="text" placeholder='student name'/>
                <input onChange={(e) => setphone(e.target.value)} type="number" placeholder='phone number'/>
                <input type="file" onChange={handlefilechange}/>
                <button type='submit'>submit</button>
            </form>
        </div>
    );
}

export default Addstudent;