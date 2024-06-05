<script setup>
import { ref, onMounted, watch } from 'vue'
import service from '@/axios';
import ProviderHeader from "@/components/provider/ProviderHeader.vue"
import ProviderTable from "@/components/provider/ProviderTable.vue"
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter()

const total = ref(0)
const data = ref([])
const queryParams = ref({
    pageNum: 1,
    pageSize: 10
})

async function deleteData(row) {
    let resp = await service.delete(`/providers/${data.value[row].id}`)

    ElMessage.success('删除成功');
    fetchData();
}

async function fetchData() {
    let resp = await service.get('/providers', { params: { ...queryParams.value } })
    data.value = resp.data.data
    total.value = resp.data.total
}

function handleInspect(row) {
    router.push({ name: '供应商详情', query: { id: data.value[row].id } })
}

function handleAdd() {
    router.push({ name: '供应商编辑' })
}

function handleEdit(row) {
    router.push({ name: '供应商编辑', query: { id: data.value[row].id } })
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
        <ProviderHeader @add="handleAdd" @search="(searchParams) => { queryParams = { ...queryParams, ...searchParams } }" />
        <ProviderTable :data="data" :total="total" :page-size="queryParams.pageSize" @inspect="handleInspect" @edit="handleEdit" @delete="deleteData"
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