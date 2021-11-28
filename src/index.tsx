import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider, SecureApp, Storage } from "@asgardeo/auth-react";
import ReactLoading from "react-loading";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider
            config={{
                clientID: "ZrXCj42s3ZO8KFJ8mlPZezHI4_Qa",
                signInRedirectURL: origin,
                serverOrigin: "https://api.asgardeo.io/t/worldclock",
                storage: Storage.WebWorker,
                resourceServerURLs: [process.env.REACT_APP_API_ENDPOINT ?? ""]
            }}
        >
            <SecureApp
                fallback={
                    <div className="wrapper">
                        <ReactLoading type="spinningBubbles" color="#fff" height={100} width={100} />
                    </div>
                }
            >
                <App />
            </SecureApp>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
