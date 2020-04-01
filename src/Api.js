import axios from "axios";
import store from "./store";

export default class Api {
    static init() {
        // Add a request interceptor
        axios.interceptors.request.use(
            (config) => {
                return Promise.resolve(config);
            },
            error => Promise.reject(error),
        );

        // Add a response interceptor
        axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log("error response", error);
            return Promise.reject(error);
        });
    }

    static searchWeatherImgApi(keyword, success, failure) {
        
        axios.get(`https://images-api.nasa.gov/search?q=${keyword}`).then(
            (response) => {
                if (success) {
                    success(response);
                }
            },
            (error) => {
                if (failure) {
                    failure(error);
                }
            },
        );
    }

    static graphDetailApi(success, failure) {
        axios.get(`https://api.nasa.gov/insight_weather/?api_key=DDz14KZjytRMwXmLi6JAz1mguDV0zcqCSs6QksTZ&feedtype=json&ver=1.0`).then(
            (response) => {
                if (success) {
                    success(response);
                }
            },
            (error) => {
                if (failure) {
                    failure(error);
                }
            },
        );
    }

}
