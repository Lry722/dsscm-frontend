<script setup>
import { computed, inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['add', 'search']);

const router = useRouter();

const searchParams = ref({
    name: null,
    categoryLevel1: null
});

const categories = inject('categories');
</script>

<template>
    <el-row>
        <el-col :span="2">
            <el-button id="new-role" @click="emit('add')">新增商品</el-button>
        </el-col>
        <el-col :span="2" :offset="10">
            <el-text>商品名</el-text>
        </el-col>
        <el-col :span="2">
            <el-input v-model="searchParams.name" @keyup.enter.native="emit('search', searchParams)"></el-input>
        </el-col>
        <el-col :span="2">
            <el-text>商品类别</el-text>
        </el-col>
        <el-col :span="2">
            <el-select v-model="searchParams.categoryLevel1" placeholder="-">
                <el-option label="-" value="" key=""></el-option>
                <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-col>
        <el-col :span="2">
            <el-button id="search" icon="Search" type="primary" @click="emit('search', searchParams)"> 搜索 </el-button>
        </el-col>
        <el-col :span="2">
            <el-button id="viewCategories" type="primary" plain
                @click="router.push('/product/category')">商品分类</el-button>
        </el-col>
    </el-row>
</template>

<style scoped>
.el-col {
    display: flex;
    justify-content: center;
}
</style>