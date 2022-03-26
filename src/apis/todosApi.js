import httpRequest from '../services/httpRequest'

export const fetchTodos = async() => {
    const res = await httpRequest.get(`https://tony-json-server.herokuapp.com/api/todos`)
    return res.data;
}



