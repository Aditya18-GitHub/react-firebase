

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Addstudent from './components/Addstudent'
import Studentlist from './components/Studentlist'
import UpdateStudent from './components/updatestudent'
import Addfaculty from './components/Addfaculty'
import Facultylist from './components/Facultylist'
import Updatefaculty from './components/Updatefaculty'
import Signup from './components/Signup'
import Login from './components/Login'




 





const router = createBrowserRouter([
  {path:'' ,Component : Login},     
  {path:'signup' ,Component : Signup},
  

  {path: 'dashboard' , Component:Dashboard,children:[

        {path : '',Component:Studentlist},
        {path : 'addstudent',Component:Addstudent},
        {path : 'studentlist',Component:Studentlist},
        {path : 'updatestudent',Component:UpdateStudent},
        {path : 'addfaculty',Component:Addfaculty},
        {path : 'facultylist',Component:Facultylist},
        {path : 'updatefaculty',Component:Updatefaculty},

  ]}



])

 




function App() {
  

  return (
    <>
      <RouterProvider router = {router}></RouterProvider>  
    </>
  )
}

export default App
