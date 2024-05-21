import { createContext, useState,useContext} from "react";
import { executeBasicAuth, executeJwtAuth } from "../ApiFiles/AuthenticationApiService";
import { apiClient } from "../ApiFiles/ApiClient";

//1.Create a Context For the Components to share.
export const AuthContext = createContext()

// it is for minimal imports
export const useAuth = () => useContext(AuthContext)
    


//2.Share the context with other components using auth provider
export default function AuthProvider({children}){
    
    //3.put some state into context
    const [isAuthenticated,setAuthenticated] = useState(0)
 // const valueToBeShared = {{number,isAuthenticated,setAuthenticated}}
    
     const [username,setUsername] = useState(null)

     const [token , setToken] = useState(null)

    // function login(username,password){
    //     if(username==='Dhiva' && password==='dummy'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     }else{
    //        setAuthenticated(false)
    //        setUsername(username)
    //          return false
    //     }
    // }

    // async function login(username,password){
    //     const bToken = 'Basic ' + window.btoa(username + ":" + password)
    //    try{
    //   const response = await executeBasicAuth(bToken)
           
    //     if(response.status===200){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         setToken(bToken)
    //         //To add basic authorization for every api calls using apiClient
    //         apiClient.interceptors.request.use(
    //             (config) => {
    //                 console.log("Intercepting and adding a basic token")
    //                 config.headers.Authorization = bToken
    //                 return config
    //             }
    //         )
    //         return true
    //     }else{
    //        logout()
    //        return false
    //     }
    // }catch(error){
    //       logout()
    //       return false 
    // }
    // }

    async function login(username,password){

       try{
      const response = await executeJwtAuth(username,password)
        
        if(response.status===200){

            const jwtToken = 'Bearer ' + response.data.token
            
            setAuthenticated(true)
            setUsername(username)
            setToken(jwtToken)
            //To add basic authorization for every api calls using apiClient
            apiClient.interceptors.request.use(
                (config) => {
                    console.log("Intercepting and adding a basic token")
                    config.headers.Authorization = jwtToken
                    return config
                }
            )
            return true
        }else{
           logout()
           return false
        }
    }catch(error){
          logout()
          return false 
    }
    }

    function logout (){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

   
    return(
  <AuthContext.Provider value={{isAuthenticated,login,logout,username,token}}>
    {children}
   </AuthContext.Provider>
    )
}