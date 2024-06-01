<script setup>
import { ref, onMounted, watch } from 'vue'
import service from '@/axios';
import ProviderHeader from "@/components/provider/ProviderHeader.vue"
import ProviderTable from "@/components/provider/ProviderTable.vue"
import { ElMessage } from 'element-plus';

const total = ref(0)
const data = ref([])
const queryParams = ref({
    pageNum: 1,
    pageSize: 5
})

async function deleteData(row) {
    try {
        let resp = await service.delete(`/providers/${data.value[row].id}`)
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
        let resp = await service.get('/providers', { params: { ...queryParams.value } })
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
    fetchData()
})
</script>

<template>
    <div class="wrapper">
        <ProviderHeader @search="(searchParams) => { queryParams = { ...queryParams, ...searchParams } }" />
        <ProviderTable :data="data" :total="total" :page-size="queryParams.pageSize" @delete="deleteData"
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