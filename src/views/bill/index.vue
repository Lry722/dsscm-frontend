<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import service from '@/axios';
import BillHeader from "@/components/bill/BillHeader.vue"
import BillTable from "@/components/bill/BillTable.vue"
import { ElMessage } from 'element-plus';

const providers = ref(null)
provide('providers', providers)

const products = ref(null)
provide('products', products)

const total = ref(0)
const data = ref([])
const queryParams = ref({
    pageNum: 1,
    pageSize: 5
})

async function fetchProviders() {
    try {
        let resp = await service.get('/providers/list')
        providers.value = resp.data.data
    } catch (e) {
        console.error(e)
    }
}

async function fetchProducts() {
    try {
        let resp = await service.get('/products/list')
        products.value = resp.data.data
    } catch (e) {
        console.error(e)
    }
}

async function deleteData(row) {
    try {
        let resp = await service.delete(`/bills/${data.value[row].id}`)
        if (resp.data.code === 200) {
            ElMessage.success('删除成功');
            fetchData();
        }
    } catch (e) {
        console.error(e)
    }
}

async function fetchData() {
    try {
        let resp = await service.get('/bills', { params: { ...queryParams.value } })
        data.value = resp.data.data.data
        total.value = resp.data.data.total
    } catch (e) {
        console.error(e)
    }
}

watch(queryParams, () => {
    fetchData();
}, { deep: true })

onMounted(async () => {
    fetchProviders()
    fetchProducts()
    fetchData()
})
</script>

<template>
    <div class="wrapper">
        <BillHeader @search="(searchParams) => { queryParams = { ...queryParams, ...searchParams } }" />
        <BillTable :data="data" :total="total" :page-size="queryParams.pageSize" @delete="deleteData"
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