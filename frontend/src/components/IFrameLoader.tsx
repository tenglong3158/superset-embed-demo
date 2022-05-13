import { Component } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import './IFrameLoader.css'
import axios from "axios";

function fetchGuestTokenFromBackend(): Promise<string> {
    return new Promise<string>((resolve) => {
        console.log("====> Calling token!")
        axios.post("http://127.0.0.1:8000/fetchGuestToken").then((response) => {
            console.log(response.data);
        });
        resolve("mytoken");
    })
}

export class IFrameLoader extends Component {
    state = {
        isLoaded: false
    }

    componentDidMount() {
        this.setState({ isLoaded: true });
        embedDashboard({
            id: "63", // given by the Superset embedding UI
            supersetDomain: "https://analytics.test.data.avedian.info",
            mountPoint: document.getElementById("superset-container")!, // any html element that can contain an iframe
            fetchGuestToken: () => fetchGuestTokenFromBackend(),
            debug: true
        });
    }

    render() {
        return <div id="superset-container" className="IFrameLoader"></div>
    }
}
