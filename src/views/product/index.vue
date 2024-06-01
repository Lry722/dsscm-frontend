<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import service from '@/axios';
import ProductHeader from "@/components/product/ProductHeader.vue"
import ProductTable from "@/components/product/ProductTable.vue"
import { ElMessage } from 'element-plus';

const categories = ref(null)
provide('categories', categories)

const total = ref(0)
const products = ref([])
const queryParams = ref({
    pageNum: 1,
    pageSize: 5
})

async function fetchCategories() {
    try {
        let resp = await service.get('/products/categories')
        categories.value = resp.data.data
    } catch (e) {
        console.error(e)
    }
}

async function deleteProduct(row) {
    try {
        let resp = await service.delete(`/products/${products.value[row].id}`)
        if (resp.data.code === 200) {
            ElMessage.success('删除成功');
            fetchProducts();
        }
    } catch (e) {
        console.error(e)
    }
}

async function fetchProducts() {
    try {
        let resp = await service.get('/products', { params: { ...queryParams.value } })
        products.value = resp.data.data.data
        total.value = resp.data.data.total
    } catch (e) {
        console.error(e)
    }
}

watch(queryParams, () => {
    fetchProducts();
}, { deep: true })

onMounted(async () => {
    fetchCategories()
    fetchProducts()
})
</script>

<template>
    <div class="wrapper">
        <ProductHeader @search="(searchParams) => { queryParams = { ...queryParams, ...searchParams } }" />
        <ProductTable :products="products" :total="total" :page-size="queryParams.pageSize" @delete="deleteProduct"
            @pageChanged="(page) => queryParams.pageNum = page" />
    </div>

</template>

<style scoped>
.wrapper {
    margin: 0 15px;
}

.wrapper>* {
    margin: 15px 0;
}
</style>