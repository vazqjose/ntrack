import { createRouter, createWebHistory } from 'vue-router'
import ticketList from '../views/ticketlist.vue'
import ticketDetail from '../views/ticketdetail.vue'
import postList from '../views/postlist.vue'
import singleBlog from '../views/singleblog.vue'


const routes = [    
    {
        path: '/',
        name: 'TicketList',
        component: ticketList
    },
    {
        path: '/ticketdetail/:ticketID',
        name: 'ticketDetail',
        component: ticketDetail
    },
    {
        path: '/posts',
        name: 'postList',
        component: postList
    },
    {
        path: '/posts/:id',
        name: 'singleBlog',
        component: singleBlog,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router