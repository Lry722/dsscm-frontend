<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/axios'
import UserHeader from '@/components/user/UserHeader.vue';
import UserTable from '@/components/user/UserTable.vue';
import { ElMessage } from 'element-plus';
import { debounce } from 'lodash'

const router = useRouter();

const URL = '/users'

const roles = ref([
    { label: '-', value: '' }
])
provide('roles', roles)

async function fetchRoles() {
    let resp = await service.get('/roles');
    roles.value.push(...resp.data);
}

const users = ref([])
const editingRow = ref(0);

const total = ref(0);

const queryParams = ref({
    pageNum: 1,
    pageSize: 10
})

function handleCreate() {
    router.push({ name: '用户编辑' })
}

function handleEdit(row) {
    router.push({ name: '用户编辑', query: { id: users.value[row].id } })
}

function handleDelete(row) {
    editingRow.value = row;
    sendDelete();
}

async function sendDelete() {
    let resp = await service.delete(URL + '/' + users.value[editingRow.value].id);
    if (resp.data = 200) {
        ElMessage.success('删除成功');
        users.value.splice(editingRow.value, 1);
    } else {
        ElMessage.error('删除失败');
    }
}

async function fetchUsers() {
    const resp = await service.get(URL, { params: { ...queryParams.value } });
    users.value.splice(0, users.value.length);
    users.value.push(...resp.data.data);
    total.value = resp.data.total;
}

watch(queryParams, () => {
    fetchUsers();
}, { deep: true })

onMounted(() => {
    fetchRoles();
    fetchUsers();
})
</script>

<template>
    <div class="wrapper">
        <UserHeader @add="handleCreate()" @search="searchParam => queryParams = { ...queryParams, ...searchParam }">
        </UserHeader>
        <UserTable :users="users" :total="total" :page-size="queryParams.pageSize" @edit="row => handleEdit(row)"
            @delete="row => handleDelete(row)" @pageChanged="newPageNum => queryParams.pageNum = newPageNum">
        </UserTable>
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