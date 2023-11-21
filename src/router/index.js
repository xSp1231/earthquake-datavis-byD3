import {createRouter, createWebHistory} from 'vue-router'
const routes = [
    {
        path: "",
        name: "test",
        redirect: "/home", //直接跳转到/home页面
    },
    {
        path: "/home",
        name: "main",
        component: () => import('../views/Home.vue'),
    },

];
const index = createRouter({
    history: createWebHistory(), routes,
})
export default index
