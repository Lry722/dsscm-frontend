<script setup>
import { inject, onMounted, ref } from 'vue';

const emit = defineEmits(['add', 'search']);

const searchParam = ref({
    name: null,
    category: null
});

const categories = inject('categories');
</script>

<template>
    <el-row>
        <el-col :span="2">
            <el-button id="new-role" @click="emit('add')">新增商品</el-button>
        </el-col>
        <el-col :span="2" :offset="12">
            <el-text>商品名</el-text>
        </el-col>
        <el-col :span="2">
            <el-input v-model="searchParam.name" @keyup.enter.native="emit('search', searchName)"></el-input>
        </el-col>
        <el-col :span="2">
            <el-text>商品类别</el-text>
        </el-col>
        <el-col :span="2">
            <el-select v-model="searchParam.category" placeholder="-">
                <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-col>
        <el-col :span="2">
            <el-button id="search" icon="Search" type="primary" @click="emit('search', searchParam)">搜索</el-button>
        </el-col>
    </el-row>
</template>

<style scoped>
.el-col {
    display: flex;
    justify-content: center;
}
</style>