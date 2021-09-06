import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Pages/Nav";
import Home from "./Pages/Home";
import userReg from "./Pages/UserReg";
import AllComp from "./Pages/AllComplaints";
import newComp from "./Pages/NewComplaint";
import ViewComp from "./Pages/ViewComplaint";
import AllUsers from "./Pages/AllUsers"
import Permissions from "./Pages/Permissions";
import TestPage from "./Pages/TestPage";
import "./i18nextInit";
import {useUserInfo} from './context/UserInfoContext'

function App() {
  
  const userInfo = useUserInfo();
  return (
  
   <div className="App">
      <Router>
        <Nav />

        <Switch>
          <Route path="/" exact >
          {!userInfo?<Home/>:<AllComp/>}
          </Route>
          <Route path="/auth/signup" exact component={userReg} />
          <Route path="/complaints/new" exact component={newComp} />
          <Route path="/complaints" component={ViewComp} />
          <Route path="/Users/" exact component={AllUsers} />
          <Route path="/Users/Permissions/" exact component={Permissions} />
          <Route path="/p" exact component={TestPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
