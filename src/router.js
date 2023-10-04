import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from "@/components/HelloWorld.vue";
import Dos from "@/components/Dos.vue";

const routes = [
    {
        path: '/',
        component: HelloWorld
    },
    {
        path: '/Dos',
        component: Dos
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
