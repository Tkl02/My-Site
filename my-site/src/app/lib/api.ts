import axios from "axios";

const verceUrl = 'http://localhost:9595'

export const api = axios.create({
    baseURL: `${verceUrl}/api`,
    withCredentials: true
})

