import axios from 'axios';

class HttpService {
  constructor() {
    axios.defaults.baseURL =
      'http://127.0.0.1:3000/';

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
