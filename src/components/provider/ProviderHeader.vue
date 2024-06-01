<script setup>
import { computed, ref } from 'vue';

const emit = defineEmits(['add', 'search']);

const searchParams = ref({
    code: null,
    name: null,
});

</script>

<template>
    <el-row>
        <el-col :span="2">
            <el-button id="new-role" @click="emit('add')">新增供应商</el-button>
        </el-col>
        <el-col :span="2" :offset="12">
            <el-text>供应商编码</el-text>
        </el-col>
        <el-col :span="2">
            <el-input v-model="searchParams.name" @keyup.enter.native="emit('search', searchParams)"></el-input>
        </el-col>
        <el-col :span="2">
            <el-text>供应商名称</el-text>
        </el-col>
        <el-col :span="2">
            <el-input v-model="searchParams.code" @keyup.enter.native="emit('search', searchParams)"></el-input>
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