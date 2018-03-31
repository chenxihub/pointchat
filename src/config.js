import axios from 'axios'

import {Toast} from 'antd-mobile'

//拦截请求

axios.interceptors.request.use(function (config) {
    Toast.loading('loading...', 0);
    return config;
});

axios.interceptors.response.use(function (config) {
    setTimeout(function () {
        Toast.hide();
    }, 1000)
    return config;
});