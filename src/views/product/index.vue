<script setup>
import { ref, provide, onMounted } from 'vue'
import service from '@/axios';
import ProductHeader from "@/components/product/ProductHeader.vue"
import ProductTable from "@/components/product/ProductTable.vue"

const categories = ref(null)
provide('categories', categories)

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

async function fetchProducts() {
    try {
        let resp = await service.get('/products', { params: { ...queryParams.value } })
        products.value = resp.data.data
    } catch (e) {
        console.error(e)
    }
}

onMounted(async () => {
    fetchCategories()
    fetchProducts()
})
</script>

<template>
    <div class="wrapper">
        <ProductHeader />
        <ProductTable :products="products" />
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