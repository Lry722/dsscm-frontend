<script setup>
import { useRoute } from 'vue-router'

const route = useRoute();
</script>

<template>
    <el-aside>
        <h1>
            百货中心供应链管理系统
        </h1>
        <hr style="margin: 20px; border: 1px solid #DCDFE6;">
        <el-menu :router="true" :default-active="route.path">
            <el-menu-item index="/">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                首页
            </el-menu-item>
            <el-menu-item index="/product">
                <el-icon>
                    <Document />
                </el-icon>
                商品管理
            </el-menu-item>
            <el-menu-item index="/bill">
                <el-icon>
                    <ShoppingTrolley />
                </el-icon>
                采购订单管理
            </el-menu-item>
            <el-menu-item index="/order">
                <el-icon>
                    <DataLine />
                </el-icon>
                销售订单管理
            </el-menu-item>
            <el-menu-item index="/provider">
                <el-icon>
                    <Box />
                </el-icon>
                供应商管理
            </el-menu-item>
            <el-menu-item index="/user">
                <el-icon>
                    <User />
                </el-icon>
                用户管理
            </el-menu-item>
            <el-menu-item index="/role">
                <el-icon>
                    <Key />
                </el-icon>
                权限管理
            </el-menu-item>
            <el-menu-item index="/message">
                <el-icon>
                    <ChatLineSquare />
                </el-icon>
                消息查看
            </el-menu-item>
            <el-menu-item index="/message-manage">
                <el-icon>
                    <Filter />
                </el-icon>
                消息管理
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<style scoped>
.el-aside {
    width: 250px;
    padding-right: 1px;
    box-shadow: inset -1px 0px 0px 0px #DDDDDD;
    overflow-x: hidden
}

.el-aside h1 {
    color: #303133;
    text-align: center;
    padding: 15px 0 0;
    font-size: 18px;
}

.el-menu {
    border-right: none;
}

.el-menu-item {
    color: #606266;
    font-size: 14px;
    align-items: center;
}

.el-menu-item.is-active::before {
    border-right: 18px solid #DDDDDD;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    content: "";
    display: inline-block;
    position: absolute;
    right: -1px;
    top: 9px;
}

.el-menu-item.is-active::after {
    border-right: 18px solid #f4f3ef;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    content: "";
    display: inline-block;
    position: absolute;
    right: -2px;
    top: 9px;
}

.el-menu-item .el-icon {
    margin-right: 10px;
}
</style>