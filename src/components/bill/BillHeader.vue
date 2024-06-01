<script setup>
import { computed, inject, onMounted, ref } from 'vue';

const emit = defineEmits(['add', 'search']);

const searchParams = ref({
    product: null,
    provider: null,
    paid: null
});
const providerName = ref(null);
const productName = ref(null);

const providers = inject('providers');
const products = inject('products');

function queryProviderSearch(queryString, cb) {
    const results = queryString ?
        providers.value.filter(provider => provider.name.toLowerCase().includes(queryString.toLowerCase())) :
        [];
    cb(results)
}

function handleProviderSelect(item) {
    searchParams.value.provider = item.id;
}

function queryProductSearch(queryString, cb) {
    const results = queryString ?
        products.value.filter(product => product.name.toLowerCase().includes(queryString.toLowerCase())) :
        [];
    cb(results)
}

function handleProductSelect(item) {
    searchParams.value.product = item.id;
}

</script>

<template>
    <el-row>
        <el-col :span="2">
            <el-button id="new-role" @click="emit('add')">新增订单</el-button>
        </el-col>
        <el-col :span="2" :offset="7">
            <el-text>商品名称</el-text>
        </el-col>
        <el-col :span="2">
            <el-autocomplete v-model="productName" :fetch-suggestions="queryProductSearch" value-key="name" clearable
                @select="handleProductSelect" @clear="searchParams.product = null" @keyup.enter.native="emit('search', searchParams)" />
        </el-col>
        <el-col :span="2">
            <el-text>供应商</el-text>
        </el-col>
        <el-col :span="3">
            <el-autocomplete v-model="providerName" :fetch-suggestions="queryProviderSearch" value-key="name" clearable
                @select="handleProviderSelect" @clear="searchParams.provider = null" @keyup.enter.native="emit('search', searchParams)" />
        </el-col>
        <el-col :span="2">
            <el-text>付款状态</el-text>
        </el-col>
        <el-col :span="2">
            <el-select v-model="searchParams.paid" placeholder="-">
                <el-option label="-" value="" key=""></el-option>
                <el-option label="未支付" value="0" key="0"></el-option>
                <el-option label="已支付" value="1" key="1"></el-option>
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