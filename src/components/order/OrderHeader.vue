<script setup>
import { computed, ref } from 'vue';

const emit = defineEmits(['add', 'search']);

const searchParams = ref({
    customerName: null,
    status: null,
});

</script>

<template>
    <el-row>
        <el-col :span="2" :offset="14">
            <el-text>收货人姓名</el-text>
        </el-col>
        <el-col :span="2">
            <el-input v-model="searchParams.customerName" @keyup.enter.native="emit('search', searchParams)"></el-input>
        </el-col>
        <el-col :span="2">
            <el-text>供应商名称</el-text>
        </el-col>
        <el-col :span="2">
            <el-select v-model="searchParams.status" placeholder="-">
                <el-option label="-" value="" key=""></el-option>
                <el-option label="待审核" value="0" key="0"></el-option>
                <el-option label="通过审核" value="1" key="1"></el-option>
                <el-option label="配货" value="2" key="2"></el-option>
                <el-option label="卖家已发货" value="3" key="3"></el-option>
                <el-option label="已收获" value="4" key="4"></el-option>
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