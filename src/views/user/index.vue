<script setup>
import { ref, provide, onMounted, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import UserHeader from '@/components/user/UserHeader.vue';
import UserTable from '@/components/user/UserTable.vue';
import { ElMessage } from 'element-plus';

const URL = inject('baseURL') + '/users'

const roles = ref([
    { label: '-', value: '' }
])
provide('roles', roles)

async function fetchRoles() {
    try {
        let resp = await axios.get(inject('baseURL') + '/roles');
        roles.value.slice(1);
        roles.value.push(...resp.data.data);
    }
    catch (e) {
        console.error(e);
    }
}

const users = ref([])
const editingRow = ref(0);

const router = useRouter();

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
        let resp = await axios.delete(URL + '/' + users.value[editingRow.value].id);
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

async function fetchUsers(queryParam) {
    try {
        const response = await axios.get(URL, { params: queryParam });
        users.value.splice(0, users.value.length);
        users.value.push(...response.data.data);
    } catch (e) {
        console.error(e);
    }
}

onMounted(() => {
    fetchRoles();
    fetchUsers();
})
</script>

<template>
    <div class="wrapper">
        <UserHeader @add="handleCreate()" @search="queryParam => fetchUsers(queryParam)"></UserHeader>
        <UserTable :users="users" @edit="row => handleEdit(row)" @delete="row => handleDelete(row)"></UserTable>
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