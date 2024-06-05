<script setup>
import { inject, onMounted, ref } from 'vue';

const emit = defineEmits(['add', 'search']);

const searchParams = ref({
    name: '',
    minAge: '',
    maxAge: '',
    gender: '',
    role: ''
});

const genders = [
    { label: '-', value: '' },
    { label: '男', value: '0' },
    { label: '女', value: '1' }
]

const roles = inject('roles');
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
            <el-input v-model="searchParams.name" @keyup.enter.native="emit('search', searchParams)"></el-input>
        </el-col>
        <el-col :span="1">
            <el-text>年龄</el-text>
        </el-col>
        <el-col :span="2">
            <el-row>
                <el-col :span="10">
                    <el-input v-model="searchParams.minAge" oninput="value=value.replace(/[^\d]/g,'')"
                        @keyup.enter.native="emit('search', searchParams)"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-text type="info">-</el-text>
                </el-col>
                <el-col :span="10">
                    <el-input v-model="searchParams.maxAge" oninput="value=value.replace(/[^\d]/g,'')"
                        @keyup.enter.native="emit('search', searchParams)"></el-input>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="1">
            <el-text>性别</el-text>
        </el-col>
        <el-col :span="2">
            <el-select v-model="searchParams.gender" placeholder="-">
                <el-option v-for="item in genders" :key="item.value" :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
        </el-col>
        <el-col :span="1">
            <el-text>角色</el-text>
        </el-col>
        <el-col :span="2">
            <el-select v-model="searchParams.role" placeholder="-">
                <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-col>
        <el-col :span="2">
            <el-button id="search" icon="Search" type="primary" @click="emit('search', searchParams)">搜索</el-button>
        </el-col>
    </el-row>
</template>

<style scoped>
.el-col {
    display: flex;
    justify-content: center;
}
</style>