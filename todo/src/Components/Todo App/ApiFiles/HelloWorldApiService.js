import { apiClient } from "./ApiClient"
// export const retrieveHelloWorld  = () =>  apiClient.get("/hello-world-bean")
//Response to preflight request doesn't pass access control check => Authorization header
export const retrieveHelloWorld
    = (username) => apiClient.get(`/hello-world/path-variable/${username}`
    // ,{
    //     headers: {
    //         Authorization: token
    //     }
    // }
    )

