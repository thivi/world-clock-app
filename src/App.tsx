import React, { useCallback, useEffect, useRef, useState } from "react";
import { getTime } from "./api";
import "./App.css";
import ReactLoading from "react-loading";

function App() {
    const [ time, setTime ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ region, setRegion ] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [ editRegion, setEditRegion ] = useState<boolean>(false);
    const firstRender = useRef(true);

    const getTimeFromServer = useCallback(() => {
        setLoading(true);
        getTime(region)
            ?.then((response: string) => {
                setTime(response);
            })
            .catch((error: any) => {
                alert(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [ region ]);

    useEffect(() => {
        if (!region) {
            return;
        }

        if (firstRender.current) {
            getTimeFromServer();
            firstRender.current = false;
        }
    }, [ getTimeFromServer, firstRender, region ]);

    return (
        <div className="wrapper" onClick={ () => setEditRegion(false) }>
            <div className="time">
                { loading ? <ReactLoading type="cylon" color="#fff" height={ 100 } width={ 100 } /> : time }
            </div>
            { editRegion ? (
                <div className="regionInput">
                    <form
                        action="#"
                        onSubmit={ (e) => {
                            e.preventDefault();
                            getTimeFromServer();
                            setEditRegion(false);
                        } }
                    >
                        <input
                            type="text"
                            value={ region }
                            onChange={ (e: any) => setRegion(e.target.value) }
                            onClick={ (e) => e.stopPropagation() }
                        />
                    </form>
                </div>
            ) : (
                <div
                    className="region"
                    onClick={ (e) => {
                        e.stopPropagation();
                        setEditRegion(true);
                    } }
                >
                    { region }
                </div>
            ) }
        </div>
    );
}

export default App;
