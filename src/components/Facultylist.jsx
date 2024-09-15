import React, { useEffect, useState } from 'react';
import {app} from '../firebase'
import {collection,getDocs,getFirestore,deleteDoc,doc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
function Facultylist() {

    const [data,setdata] = useState([])

    const navigate = useNavigate()
    

    const getdata = async () => {
        const db = getFirestore(app)
        const docref = collection(db,'faculty')
        const docsnap = await getDocs(docref)
        console.log(docsnap);
        const data = docsnap.docs.map((doc) => ({
            id:doc.id,
            ...doc.data()
        }))

        console.log(data);
        setdata(data)
    }

    useEffect( () => {
        getdata()
    },[])

    const deletedata = async(id) => {
        const db = getFirestore(app)
        const dataref = doc(db,'faculty',id)
        try{
            await deleteDoc(dataref)
            getdata()

        }catch(error){
            console.log(error);

        }   
    }


    return (
        <div>
            <h1>faculty list</h1>
            {
                data.map((ele) => (
                    <div style={{marginLeft:'3rem'}} key={ele.id}>
                        <p>{ele.fname} {ele.phone}</p>
                        <button onClick={() => deletedata(ele.id)}>delete</button>
                        <button  onClick={() => navigate('/dashboard/updatefaculty',{state:ele})}>updatefaculty</button>
                    </div>
                ))
            }
             
            
        </div>
    );
}

export default Facultylist;