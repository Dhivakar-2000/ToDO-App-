import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { retrieveHelloWorld } from "./ApiFiles/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";
export default function WelcomeComponent() {

    const { username } = useParams();

    //Using state to show the message in welcome page
    const [Message, setMessage] = useState(null)

    const authContext = useAuth()

    function CallHelloWorldRestApi() {
        console.log("called")
        //this is the method for using restapi in react application
        // axios.get("http://localhost:8080/hello-world")
        //     //If up is true then
        //     .then(
        //         (response) => SuccessfullResponse(response)
        //     )
        //     //If up is false then catch
        //     .catch(
        //         (error) => ErrorResponse(error)
        //     )
        //     //Default one even if up is true or false
        //     .finally(
        //         () => console.log('cleanup')
        //     )

        retrieveHelloWorld(username,authContext.token)
            .then(
                (response) => SuccessfullResponse(response)
            )
            .catch(
                (error) => ErrorResponse(error)
            )
            .finally(
                () => console.log('cleanup')
            )
    }
    function SuccessfullResponse(response) {
        console.log(response)
        // setMessage(response.data)
         setMessage(response.data.message)
    }
    function ErrorResponse(error) {
        console.log(error)
    }

    return (
        <div className="Welcome">
            <div><h1>Welcome {username} !!</h1></div>
            Manage your Todos here - <Link to={'/todos'}>Go Here</Link>!!!
            <div>
                <button className="btn btn-success m-5" onClick={CallHelloWorldRestApi}>Call Hello World</button>
            </div>
            <div className="text-info">{Message}</div>
        </div>
    )
}
