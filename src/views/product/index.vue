<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/axios';
import ProductHeader from "@/components/product/ProductHeader.vue"
import ProductTable from "@/components/product/ProductTable.vue"
import { ElMessage } from 'element-plus';

const router = useRouter()

const categories = ref(null)
provide('categories', categories)

const total = ref(0)
const data = ref([])
const queryParams = ref({
    pageNum: 1,
    pageSize: 10
})

async function fetchCategories() {
    let resp = await service.get('/products/categories')
    categories.value = resp.data
}

async function deleteData(row) {
    let resp = await service.delete(`/products/${data.value[row].id}`)
    ElMessage.success('删除成功');
    fetchData();
}

async function fetchData() {
    let resp = await service.get('/products', { params: { ...queryParams.value } })
    data.value = resp.data.data
    total.value = resp.data.total
}

function handleInspect(row) {
    router.push({ name: '商品详情', query: { id: data.value[row].id } })
}

function handleEdit(row) {
    router.push({ name: '商品编辑', query: { id: data.value[row].id } })
}

function handleAdd() {
    router.push({ name: '商品编辑' })
}

watch(queryParams, () => {
    fetchData();
}, { deep: true })

onMounted(async () => {
    fetchCategories()
    fetchData()
})
</script>

<template>
    <div class="wrapper">
        <ProductHeader @search="(searchParams) => { queryParams = { ...queryParams, ...searchParams } }"
            @add="handleAdd" />
        <ProductTable :products="data" :total="total" :page-size="queryParams.pageSize" @inspect="handleInspect" @edit="handleEdit"
            @delete="deleteData" @pageChanged="(page) => queryParams.pageNum = page" />
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