import Vue from "vue";
import Router from "vue-router";

import store from "./store";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: () => import(/* webpackChunkName: "Layout" */ "./components/Layout.vue"),
            children: [
                {
                    path: "/",
                    name: "WeatherImgSearchPage",
                    component: () => import(/* webpackChunkName: "WeatherImgSearchPage" */ "./views/WeatherImgSearchPage.vue"),
                    meta: {
                        requiresAuth: false,
                    },
                },
                {
                    path: "/graph",
                    name: "ShowWeatherGraph",
                    component: () => import(/* webpackChunkName: "ShowWeatherGraph" */ "./views/WeatherImgSearchPage.vue"),
                    meta: {
                        requiresAuth: false,
                    },
                }
            ]
        }
    ]
});


export default router;
