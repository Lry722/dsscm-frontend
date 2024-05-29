<script setup>
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
import { provide } from 'vue';

</script>

<template>
    <el-container class="main-container">
        <Aside></Aside>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.main-container {
    height: 100vh;
}

.el-header {
    display: flex;
    align-items: center;
    height: 66px;
    border-bottom: 2px solid #e6e6e6;
}

.el-main {
    padding: 0;
    background-color: #f4f3ef;
}
</style>