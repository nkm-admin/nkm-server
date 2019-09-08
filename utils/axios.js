const Axios = require('axios');

const option = {
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  },
  transformRequest: data => {
    return JSON.stringify(data);
  }
}

const axios = Axios.create(option);

// 添加请求拦截器
axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
})

axios.interceptors.response.use(response => {
  return {
    data: response.data,
    status: response.status,
    headers: response.headers,
    statusText: response.statusText
  }
}, error => {
  return Promise.reject(error);
});

module.exports = axios;
