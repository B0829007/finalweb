import './App.css';
import React from 'react';
import SignInSide from './signin';
import SignUp from './signup';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import TodoApp from './TodoApp';
import Pick from './DatePicker';
import ReactGa from 'react-ga';
import {useEffect}from 'react';

function App() {

  useEffect(()=>{ ReactGa.initialize('UA-193182661-1')     
  ReactGa.pageview(window.location.pathname)   },[])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={SignInSide}></Route>
          <Route path="/signup" component={SignUp} />
          <Route path="/todo" component={TodoApp}><span className="title">Todo List</span> <br/><TodoApp /></Route>
          <Route path="/pick" ><Pick/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
