import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import University from "../views/University";
import Quota2022 from "../views/Quota2022";
import UniversityDetail from "../views/UniversityDetail";
import Test from "../views/Test";
import TestDetail from "../views/TestDetail";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/university",
        name: "university",
        component: University,
    },
    {
        path: "/quota2022",
        name: "quota2022",
        component: Quota2022,
    },
    {
        path: "/university-detail/:id",
        name: "university-detail",
        component: UniversityDetail,
    },
    {
        path: "/test",
        name: "test",
        component: Test,
    },
    {
        path: "/test-detail/:id",
        name: "test-detail",
        component: TestDetail,
    },
];

const router = new VueRouter({
    routes,
});

export default router;