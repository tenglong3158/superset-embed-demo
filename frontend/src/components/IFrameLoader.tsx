import { Component } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import './IFrameLoader.css'
import axios from "axios";

function fetchGuestTokenFromBackend(): Promise<string> {
    return new Promise<string>((resolve) => {
        console.log("====> Calling token!")
        axios.post("http://127.0.0.1:8000/fetchGuestToken").then((response) => {
            console.log(response.data);
            resolve(response.data.token);
        });
        // resolve("mytoken");
    })
}

export class IFrameLoader extends Component {
    state = {
        isLoaded: false
    }

    async componentDidMount() {
        this.setState({ isLoaded: true });
        const myDashboard = await embedDashboard({
            id: "f26a4ce2-710b-4f6b-8fa3-3f6653060b71", // given by the Superset embedding UI
            supersetDomain: "http://127.0.0.1:5000",
            // supersetDomain: "http://testdap.juneyaoair.com:5000/",
            mountPoint: document.getElementById("superset-container")!, // any html element that can contain an iframe
            fetchGuestToken: () => fetchGuestTokenFromBackend(),
            debug: true
        });

        const { width, height } = await myDashboard.getScrollSize();
        console.log('getScrollSize11   width:',width,'   height:',height)
        setInterval(async () => {
            const { width, height } = await myDashboard.getScrollSize();
            // imaginary setCSS function. Replace with  whatever method of styling is standard in your application.
            console.log('getScrollSize   width:',width,'   height:',height)
        }, 1000);
    }

    render() {
        return <div id="superset-container" className="IFrameLoader"></div>
    }
}
