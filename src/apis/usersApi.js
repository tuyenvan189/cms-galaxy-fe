import httpRequest from '../services/httpRequest'

export const fetchUsers = async() => {
    const res = await httpRequest.get(`${process.env.REACT_APP_ENDPOINT}/users`)
    return res.data;
}

export const addUsers = async(bodyData = {}) => {
    const res = await httpRequest.post(`${process.env.REACT_APP_ENDPOINT}/users/register`, bodyData)
    return res.data
}