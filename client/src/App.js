import './App.css';
import { Switch, Route } from 'react-router-dom'
import  Landing  from './componentes/Landing';
import  Home  from './componentes/Home';
import  Form  from './componentes/Form';
import  Detail  from './componentes/Detail';
import  Navbar  from './componentes/Navbar';

function App() {
  return (
    <div className="App">
        <Switch>
         <Route exact path='/'><Landing/></Route> 
         <Route path='/home'><Navbar/><Home/></Route>
         <Route exact path='/form'><Navbar/><Form/></Route>
         <Route exact path='/detail/:id'><Navbar/><Detail/></Route>
         <Route path='*'>Ruta Invalida</Route>  
         </Switch>
    </div> 
  );
}

export default App;
