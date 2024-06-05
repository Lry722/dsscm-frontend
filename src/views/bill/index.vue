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
    pageSize: 10
})

async function fetchProviders() {
    let resp = await service.get('/providers/list')
    providers.value = resp.data
}

async function fetchProducts() {

    let resp = await service.get('/products/list')
    products.value = resp.data

}

async function deleteData(row) {

    let resp = await service.delete(`/bills/${data.value[row].id}`)

    ElMessage.success('删除成功');
    fetchData();

}

async function fetchData() {

    let resp = await service.get('/bills', { params: { ...queryParams.value } })
    data.value = resp.data.data
    total.value = resp.data.total

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