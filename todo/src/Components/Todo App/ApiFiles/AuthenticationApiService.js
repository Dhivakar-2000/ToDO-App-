import { apiClient } from "./ApiClient"
export const executeBasicAuth
= (token) => apiClient.get(`/basicauth`,{
headers: {
    Authorization: token
}
})

export const executeJwtAuth
= (username,password) => apiClient.post(`/authenticate`,{username,password})