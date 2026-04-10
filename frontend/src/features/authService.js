import axios from 'axios'
import API_URL from '../config' 


// const API_URL = '/api/users'
// RENDER DEPLOYMENT
const BASE_URL = `${API_URL}/api/users`


//  Register user
const register = async(userData)=>{
    const response = await axios.post(BASE_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//  Login user
const login = async(userData)=>{
    const response = await axios.post(BASE_URL + '/login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//  Logout users
const logout  = ()=>{localStorage.removeItem('user')

}

const authService = {
    register,
    logout,
    login,
}

export default authService