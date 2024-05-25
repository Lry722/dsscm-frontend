<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const emit = defineEmits(['add', 'search']);

const searchParam = ref({
    name: '',
    ageRange: '',
    gender: '',
    role: ''
});

const genders = [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' }
]

const roles = ref([])

async function getRoles() {
    await axios.get('')
}

onMounted(() => {
    getRoles();
})
</script>

<template>
    <el-row>
        <el-col :span="2">
            <el-button id="new-role" @click="emit('add')">新增用户</el-button>
        </el-col>
        <el-col :span="1" :offset="8">
            <el-text>用户名</el-text>
        </el-col>
        <el-col :span="2">
            <el-input v-model="searchParam.name" @keyup.enter.native="emit('search', searchName)"></el-input>
        </el-col>
        <el-col :span="1">
            <el-text>年龄</el-text>
        </el-col>
        <el-col :span="2">
            <el-input v-model="searchParam.ageRange"></el-input>
        </el-col>
        <el-col :span="1">
            <el-text>性别</el-text>
        </el-col>
        <el-col :span="2">
            <el-select v-model="searchParam.gender" placeholder=""></el-select>
        </el-col>
        <el-col :span="1">
            <el-text>身份</el-text>
        </el-col>
        <el-col :span="2">
            <el-select v-model="searchParam.role" placeholder=""></el-select>
        </el-col>
        <el-col :span="2">
            <el-button id="search" type="primary" @click="emit('search', searchName)">搜索</el-button>
        </el-col>
    </el-row>
</template>

<style scoped>
.el-col {
    display: flex;
    justify-content: center;
}
</style>