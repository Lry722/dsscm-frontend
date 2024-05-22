import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import BillsView from '@/views/BillsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import ProvidersView from '@/views/ProvidersView.vue'
import UsersView from '@/views/UsersView.vue'
import RolesView from '@/views/RolesView.vue'
import MessagesView from '@/views/MessagesView.vue'
import MessagesManageView from '@/views/MessagesManageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页',
      component: HomeView
    },
    {
      path: '/product',
      name: '商品管理',
      component: ProductsView
    },
    {
      path: '/bill',
      name: '采购订单管理',
      component: BillsView
    },
    {
      path: '/order',
      name: '销售订单管理',
      component: OrdersView
    },
    {
      path: '/provider',
      name: '供应商管理',
      component: ProvidersView
    },
    {
      path: '/user',
      name: '用户管理', 
      component: UsersView
    },
    {
      path: '/role',
      name: '角色管理',
      component: RolesView
    },
    {
      path: '/message',
      name: '消息查看',
      component: MessagesView
    },
    {
      path: '/message-manage',
      name: '消息管理',
      component: MessagesManageView
    }
  ]
})

export default router
