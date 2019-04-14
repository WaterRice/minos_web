import axios from "axios";
import router from "./router";

let base = "";

const redirector = url => {
    router.replace({
        path: url,
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
};

axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 404:
                    redirector("/404");
                    break;
                case 401:
                    redirector("/login");
                    break;
                case 500:
                    redirector("/500");
                    break;
                default:
                    redirector("/404");
            }
        }
        return Promise.reject(err);
    }
);

export const postRequest = (url, params) => {
    return axios({
        method: "post",
        url: `${base}${url}`,
        data: params,
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });
};

export const uploadFileRequest = (url, params) => {
    return axios({
        method: "post",
        url: `${base}${url}`,
        data: params,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const putRequest = (url, params) => {
    return axios({
        method: "put",
        url: `${base}${url}`,
        data: params,
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });
};

export const deleteRequest = url => {
    return axios({
        method: "delete",
        url: `${base}${url}`
    });
};

export const getRequest = (url, params) => {
    return axios.get(`${base}${url}`, {
        params: params
    });
};
