
import './App.css';
import './styles/_global.scss';
import Navbar from './components/Navbar/Navbar'; 
import Homepage from './pages/Homepage';
import AddEmployee from './pages/AddEmployee';  
import { Routes, Route } from 'react-router-dom';
import EditEmployee from './pages/EditEmployee';
import ViewEmpDetails from './pages/ViewEmpDetails';
/* const router=createBrowserRouter({

    path: "/", element: <Homepage />,
    children: [ 
    {path: "add-employee", element: <AddEmployee /> }]



}); */

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
           <Route path='/' element={<Homepage/>}> </Route>
          <Route path='add' element={<AddEmployee/>}/>
          <Route path='/edit/:id' element={<EditEmployee/>}></Route>
          <Route path='view/:id' element={<ViewEmpDetails/>}></Route>
      </Routes>
      
      
    </div>
  );
}

export default App;
