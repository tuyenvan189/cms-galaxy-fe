import httpRequest from '../services/httpRequest'

export const fetchProducts = async() => {
    const res = await httpRequest.get(`${process.env.REACT_APP_ENDPOINT}/product`)
    return res.data;
}

