<script setup>
import { ref, onMounted, watch } from 'vue'
import service from '@/axios';
import OrderHeader from "@/components/order/OrderHeader.vue"
import OrderCard from '@/components/order/OrderCard.vue';
import { ElMessage } from 'element-plus';

const total = ref(0)
const data = ref([])
const queryParams = ref({
    pageNum: 1,
    pageSize: 5
})

async function deleteData(row) {
    try {
        let resp = await service.delete(`/orders/${data.value[row].id}`)
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
        let resp = await service.get('/orders', { params: { ...queryParams.value } })
        data.value = resp.data.data.data
        total.value = resp.data.data.total
        console.log(data.value)
    } catch (e) {
        console.error(e)
    }
}

watch(queryParams, () => {
    fetchData();
}, { deep: true })

onMounted(async () => {
    fetchData()
})
</script>

<template>
    <div class="wrapper">
        <OrderHeader @search="(searchParams) => { queryParams = { ...queryParams, ...searchParams } }" />
        <el-divider />
        <OrderCard v-for="(item, index) in data" :key="index" :data="item" @delete="deleteData(index)" />
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