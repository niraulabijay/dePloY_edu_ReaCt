import React, { useState } from "react";
import ReactDOM from "react-dom";
import Dashboard from "../Dashboard/Dashboard";
import "./Homepage.css";
import {
    BrowserRouter,
    Route,
    Switch,
} from "react-router-dom";
import "../Dashboard/assets/css/userStyle.css";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../Context/Auth";
import ResetPassword from "../components/Register/ResetPassword";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

export default function Index() {
    // cons history = useHistory();
    const Tokens = data => {
        if(data){
        localStorage.setItem("tokens", JSON.stringify(data));
        // setAuthtokens(token)
        const token = JSON.parse(localStorage.getItem("tokens"));
        setAuthtokens(token);
        }else{
            setAuthtokens(null);
     }
    };
    const [Authtoken, setAuthtokens] = useState(
        Tokens.tokens
            ? Tokens.tokens
            : localStorage.getItem("tokens")
            ? JSON.parse(localStorage.getItem("tokens"))
            : false
    );
    // let { path, url } = useRouteMatch();
    // console.log(path);

    return (
        <React.Fragment>
            <AuthContext.Provider value={{ Authtoken, StorageToken: Tokens }}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/set-password" component={ResetPassword} />
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    </Switch>
                </BrowserRouter>
            </AuthContext.Provider>
        </React.Fragment>
    );  
}

if (document.getElementById("example")) {
    ReactDOM.render(<Index />, document.getElementById("example"));
}
// let { params } = useParams();
