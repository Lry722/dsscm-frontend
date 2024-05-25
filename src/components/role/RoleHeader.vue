<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add', 'search']);

const searchName = ref('');
</script>

<template>
    <el-row>
        <el-col :span="2">
            <el-button id="new-role" @click="emit('add')">新增角色</el-button>
        </el-col>
        <el-col :span="3" :offset="17">
            <el-input v-model="searchName" placeholder="按名称查找" @keyup.enter.native="emit('search', searchName)"></el-input>
        </el-col>
        <el-col :span="2" justify-content="center">
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