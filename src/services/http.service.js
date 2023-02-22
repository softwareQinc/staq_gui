import axios from 'axios';

class HttpService {

  constructor() {
    //const { STAQ_SERVICE_IP } = process.env;
    console.log("ip", process.env.REACT_APP_STAQ_SERVICE_IP)
    axios.defaults.baseURL =
      process.env.REACT_APP_STAQ_SERVICE_IP ? process.env.REACT_APP_STAQ_SERVICE_IP : 'http://localhost:3000/';

    //axios.defaults.headers.post['Content-Type'] =
    //  'application/x-www-form-urlencoded';

    // Add a request interceptor
    axios.interceptors.request.use(
      async (config) => {
        //const accessUser = await StorageService.getObject('ACCESS_USER');
        //if (accessUser && accessUser.token) {
        //  config.headers.Authorization = `Bearer ${accessUser.token}`;
        //}
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          return response.data;
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(url) {
    return axios.get(url);
  }

  post(url, model) {
    return axios.post(url, model);
  }

  put(url, model) {
    return axios.put(url, model);
  }

  remove(url) {
    return axios.delete(url);
  }
}

export default new HttpService();
