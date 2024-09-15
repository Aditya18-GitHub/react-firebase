import { useEffect, useState } from "react";
import { getDatabase,onValue,ref, remove } from "firebase/database";
import { getStorage, ref as stref,deleteObject } from "firebase/storage";
import {app} from '../firebase'
import { useNavigate } from "react-router-dom";

function Studentlist() {
    const [studentData,setstudentdata] = useState(null)
    const navigate = useNavigate()
    useEffect(() =>{
        
        const db = getDatabase(app)
        const studentref = ref(db,'student')
        onValue(studentref, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            setstudentdata(data)

        })

    },[])

    const deletedata = (key) => {
        const db = getDatabase(app)
        const studentref = ref(db,'student/'+key)

        const storage = getStorage(app)
        const storageRef = stref(storage,'images/'+key)

        deleteObject(storageRef)
        remove(studentref)

    }

    

    return (
        <div>
            <h1>student data</h1>

            {studentData && (
                <div>
                    {Object.entries(studentData).map(([key,value]) => {
                        return (
                            <div style={{marginLeft : '5rem'}} key={key}>
                                {console.log(value.name)}
                                <img style={{height:'6rem',width:'6rem'}} src={value.imageurl} alt="studentlogo" />
                                <p>{value.name} {value.phone}</p>
                                <button style={{marginRight:'1.5rem'}}  onClick={() => deletedata(key)}>delete</button>
                                <button  onClick={() => navigate('/dashboard/updatestudent',{state:[key,value]})}>updatestudent</button>
                             </div>
                        )
                    })}
                </div>

            )}
            
        </div>
    );
}

export default Studentlist;