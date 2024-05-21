import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from './security/AuthContext'
export default function LoginComponent() {

    const [username,setUsername] = useState('Dhiva')
    const [password,setPassword] = useState('')

   
    const [showErrorMessage,setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event){
        // console.log(event.target.value)
        setUsername(event.target.value)
    }

    function handlePasswordChange(event){
        
        setPassword(event.target.value)
    }

    async function handleSubmit(){
        if(await authContext.login(username,password)){
            navigate(`/welcome/${username}`)

        }else{
            setShowErrorMessage(true)
        }
    }

    //This is the traditional method
    // function SuccessMessage(){
    //     if(showSuccessMessage){
    //         return <div className='SuccessMessage'> Authenticated Successfully</div>
    //     }
    //     return null
    // }

    // function ErrorMessage(){
    //     if(showErrorMessage){
    //         return <div className='ErrorMessage'> Authenticated Failed. Please try again.</div>
    //     }
    //     return null
    // }
    return(
    <div className="Login">
        <h1>Time to Login !</h1>
        {/* This is the react way i.e true && value,then value is shown */}
        {showErrorMessage && <div className='ErrorMessage'> Authenticated Failed. Please try again.</div>}
        <div className="Login Form">
           <div>
            <label>USERNAME : </label>
            <input type="text" name="username" value={username} onChange={handleUsernameChange}/>

            </div> 

            <div>
            <label>PASSWORD : </label>
            <input type="password" name="password" value={password} onChange={handlePasswordChange} />

            </div> 
        </div>
        <div>
            <button type="button" name="login" onClick={handleSubmit}>LOGIN</button>
        </div>
    </div>
    )
}