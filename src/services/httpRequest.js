import axiosInstance from "./axiosInstance";

class HttpRequest {
  
  async get(url, config = {}) {
    return axiosInstance.get(url, {
      headers: { 
        'Content-Type': 'application/json' 
      },
      ...config
    })
  }

  async post(url, data = {}, config = {}) {
    return axiosInstance.post(url, data, config)
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;