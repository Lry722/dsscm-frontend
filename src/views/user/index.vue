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
    try {
        let resp = await service.get('/roles');
        roles.value.slice(1);
        roles.value.push(...resp.data.data);
    }
    catch (e) {
        console.error(e);
    }
}

const users = ref([])
const editingRow = ref(0);

const total = ref(0);

const queryParams = ref({
    name: '',
    minAge: '',
    maxAge: '',
    gender: '',
    role: '',
    pageNum: 1,
    pageSize: 5
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
    try {
        let resp = await service.delete(URL + '/' + users.value[editingRow.value].id);
        if (resp.data = 200) {
            ElMessage.success('删除成功');
            users.value.splice(editingRow.value, 1);
        } else {
            ElMessage.error('删除失败');
        }
    } catch (e) {
        ElMessage.error('删除失败');
        console.error(e);
    }
}

async function fetchUsers() {
    try {
        const resp = await service.get(URL, { params: { ... queryParams.value } });
        users.value.splice(0, users.value.length);
        users.value.push(...resp.data.data.data);
        total.value = resp.data.data.total;
    } catch (e) {
        console.error(e);
    }
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
        <UserHeader @add="handleCreate()" @search="searchParam => queryParams = {...queryParams, ...searchParam}"></UserHeader>
        <UserTable :users="users" :total="total" :page-size="queryParams.pageSize" @edit="row => handleEdit(row)"
            @delete="row => handleDelete(row)" @pageChanged="newPageNum => queryParams.pageNum = newPageNum"></UserTable>
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