import Nav from "./Nav";
import Login from "./Pages/Login";
import userReg from "./Pages/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import "./i18nextInit";
import { useUserInfo } from "./context/UserInfoContext";
import AllProd from "./Pages/AllProducts";
import NewProd from "./Pages/NewProduct";
import Product from "./Pages/Product";
import AdminPanel from "./Pages/AdminPanel";
import { AbilityContext } from "./components/components";
import defineRulesFor, { buildAbilityFor } from "./components/ability";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
// import Test from "./componants/AbilityTest";
function App() {
  let token;
  const userInfo = useUserInfo();
  const [ability, setAbility] = useState(buildAbilityFor("Guest"));
  useEffect(() => {
    if (sessionStorage.getItem("UserInfo") != null) {
      let data = sessionStorage.getItem("role");
      token = jwt_decode(sessionStorage.getItem("UserInfo")).role;
      setAbility(
        !!token
          ? defineRulesFor(token, JSON.parse(data))
          : buildAbilityFor("Guest")
      );
    }
    return setAbility(buildAbilityFor(token));
  }, [userInfo]);

  return (
    <AbilityContext.Provider value={ability}>
      <div className="App">
        <Router>
          <Nav />
          <CssBaseline />
          <Switch>
            <Route path="/" exact>
              {!userInfo ? <Login /> : <AllProd />}
            </Route>
            <Route path="/signup" exact component={userReg} />
            <Route path="/new" exact component={NewProd} />
            <Route path="/product" exact component={Product} />
            <Route path="/adminpanel" exact component={AdminPanel} />
          </Switch>
        </Router>
      </div>
    </AbilityContext.Provider>
  );
}

export default App;
