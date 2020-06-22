import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosWithAuth from "./utils/axiosWithAuth";
import { InitialContext } from "./contexts/InitialContext";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import ClassList from "./Components/ClassList";
import Register from "./Components/Register";

import "./App.css";

function App() {
  const [session, setSession] = useState([]);
  const [reservedClasses, setReservedClasses] = useState([]);
  const reserveClass = (clas) => {
    setReservedClasses([...reservedClasses, clas]);
  };
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/clients")
      .then((res) => console.log(res.data));
  });

  useEffect(() => {
    axiosWithAuth()
      .get("/classes")
      .then((res) =>
        // console.log(res.data)
        setSession(res.data)
      );
  }, []);
  console.log(session);
  return (
    <>
      <Router>
        <div className="App">
          <h1>App page</h1>
          <InitialContext.Provider value={{ session, reserveClass }}>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/class-list">
                <ClassList />
              </Route>

              <Link to="/login">
                <button className="home-button">Login</button>
              </Link>

              <PrivateRoute exact path="/class-list" component={ClassList} />
              <Route path="/login" component={Login} />
            </Switch>
          </InitialContext.Provider>
        </div>
      </Router>
    </>
  );
}

export default App;
