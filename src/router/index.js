import { createRouter, createWebHistory } from 'vue-router'
import ticketList from '../views/ticketlist.vue'
import ticketDetail from '../views/ticketdetail.vue'
import postList from '../views/postlist.vue'
import singleBlog from '@/components/singleblog.vue'


const routes = [    
    {
        path: '/',
        name: 'TicketList',
        component: ticketList
    },
    {
        path: '/ticketDetail/:ticketID',
        name: 'TicketDetail',
        component: ticketDetail
    },
    {
        path: '/postList',
        name: 'postList',
        component: postList
    },
    {
        path: '/blog/:id',
        name: 'singleBlog',
        component: singleBlog
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router