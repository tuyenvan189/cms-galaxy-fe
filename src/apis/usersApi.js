import httpRequest from '../services/httpRequest'

export const fetchUsers = async() => {
    const res = await httpRequest.get(`${process.env.REACT_APP_ENDPOINT}/user`)
    return res.data;
}

export const addUsers = async(bodyData = {}) => {
    const res = await httpRequest.post(`${process.env.REACT_APP_ENDPOINT}/user/register`, bodyData)
    return res.data
}

export const deleteUsers = async(id) => {
    const res = await httpRequest.delete(`${process.env.REACT_APP_ENDPOINT}/user/${id}`)
    return res.data
}