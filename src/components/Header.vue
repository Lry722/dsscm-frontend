<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const pathList = computed(() => {
    return route.matched.filter(item => item.name != '首页');
}, { immediate: true })


</script>

<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="({name, path}, index) in pathList" :key="index" :to="path">{{ name }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped></style>