import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/index.vue";
import ProductsView from "@/views/product/index.vue";
import BillsView from "@/views/bill/index.vue";
import OrdersView from "@/views/order/index.vue";
import ProvidersView from "@/views/provider/index.vue";
import UsersView from "@/views/user/index.vue";
import RolesView from "@/views/role/index.vue";
import MessagesView from "@/views/message/index.vue";
import MessagesManageView from "@/views/messageManage/index.vue";
import UserEditView from "@/views/user/EditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "首页",
      component: HomeView,
    },
    {
      path: "/product",
      name: "商品管理",
      component: ProductsView,
    },
    {
      path: "/bill",
      name: "采购订单管理",
      component: BillsView,
    },
    {
      path: "/order",
      name: "销售订单管理",
      component: OrdersView,
    },
    {
      path: "/provider",
      name: "供应商管理",
      component: ProvidersView,
    },
    {
      path: "/user",
      name: "用户管理",
      component: UsersView,
    },
    {
      path: "/user/edit",
      name: "用户编辑",
      component: UserEditView,
    },
    {
      path: "/role",
      name: "角色管理",
      component: RolesView,
    },
    {
      path: "/message",
      name: "消息查看",
      component: MessagesView,
    },
    {
      path: "/message-manage",
      name: "消息管理",
      component: MessagesManageView,
    },
  ],
});

export default router;
