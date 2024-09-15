
import { Link ,Outlet} from 'react-router-dom';
function Dashboard() {
    return (
        <div style={{display:'flex', flexDirection : 'row'}}>
            
            <div style={{width:'25%' ,backgroundColor:'royalblue',height:'100vh'}}>
                    <Link  to = '/dashboard/addstudent' style={{color : 'white' , display:'block'}}>AddStudent </Link>
                    <Link  to = '/dashboard/studentlist' style={{color : 'white' , display:'block'}}>Studentlist</Link>
                    <Link  to = '/dashboard/addfaculty' style={{color : 'white' , display:'block'}}>addfaculty </Link>
                    <Link  to = '/dashboard/facultylist' style={{color : 'white' , display:'block'}}>facultylist</Link>
            </div>

            <div style={{width:'70%',height:'100vh'}}>
                    <Outlet/>
            </div>

        </div>
    );
}

export default Dashboard;