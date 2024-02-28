import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        component: () => {
            return import('./pages/index.vue');
        },
        name: 'index',
        path: '/',
    },
    {
        component: () => {
            return import('./pages/Task.vue');
        },
        name: 'Task',
        path: '/task',
    },
    {
        component: () => {
            return import('./pages/CreateProject.vue');
        },
        name: 'CreateProject',
        path: '/create-project',
    },
    {
        component: () => {
            return import('./pages/CreateTask.vue');
        },
        name: 'CreateTask',
        path: '/create-task',
    },
    {
        component: () => {
            return import('./pages/Users.vue');
        },
        name: 'User',
        path: '/users',
    },
    {
        component: () => {
            return import('./pages/Timestamp.vue');
        },
        name: 'Timestamp',
        path: '/timestamp',
    },
    {
        component: () => {
            return import('./pages/AnalyticsProject.vue');
        },
        name: 'AnalyticsProject',
        path: '/analytics-project',
    },
    {
        component: () => {
            return import('./pages/Settings.vue');
        },
        name: 'Settings',
        path: '/settings',
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router