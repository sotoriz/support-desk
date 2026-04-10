import axios from "axios";
import API_URL from "../../config";

// const API_URL = '/api/tickets/'

// ticket connection on deployment
const BASE_URL = `${API_URL}/api/tickets`

const createTicket = async(ticketData,token)=>{
    const config = {
        headers: {
                Authorization:  `Bearer ${token}`
        }
    }
    const response = await axios.post(BASE_URL, ticketData, config, {
       withCredentials: true
    })
    return response.data;
}

// Get user Tickets
const getTickets = async(token)=>{
    const config = {
        headers: {
                Authorization:  `Bearer ${token}`
        }
    }
    const response = await axios.get(BASE_URL, config)
    
    return response.data
}

// Get single Ticket Details
const getTicket = async(ticketId, token)=>{
    const config = {
        headers: {
                Authorization:  `Bearer ${token}`
        }
    }
    const response = await axios.get(`${BASE_URL}/${ticketId}`, config)
    
    return response.data
}

// close Ticket
const closeTicket = async(ticketId, token)=>{
    const config = {
        headers: {
                Authorization:  `Bearer ${token}`
        }
    }
    const response = await axios.put(
        `${BASE_URL}/${ticketId}`, 
        { status: "closed" }, 
        config
    )
    
    return response.data
}


const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
}

export default ticketService