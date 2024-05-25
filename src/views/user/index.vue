<script setup>
import { ref, provide, onMounted, watch, inject } from 'vue'
import axios from 'axios'
import UserHeader from '@/components/user/UserHeader.vue';

const URL = inject('baseURL') + '/users'

const users = ref([])
const editingRow = ref(0);

function handleEdit(row) {
    editingRow.value = row;
    editDialogVisible.value = true;
}

function handleDelete(row) {
    editingRow.value = row;
    sendDelete();
}

async function sendCreate(newRole) {
    try {
        console.log(newRole)
        await axios.post(URL, newRole);
        users.value.push(newRole);
    } catch (e) {
        console.error(e);
    }
    addDialogVisible.value = false;
}

async function sendDelete() {
    try {
        await axios.delete(URL, users.value[editingRow.value].id);
    } catch (e) {
        console.error(e);
    }
    users.value.splice(editingRow.value, 1);
}

function sendUpdate(newVal) {
    users.value[editingRow.value] = JSON.parse(JSON.stringify(newVal));
    editDialogVisible.value = false;
}

async function sendFetch(name = '') {
    try {
        const response = await axios.get(URL, { params: { name } });
        users.value.splice(0, users.value.length);
        users.value.push(...response.data.data);
    } catch (e) {
        console.error(e);
    }
}

onMounted(() => {
    sendFetch();
})
</script>

<template>

    <UserHeader></UserHeader>

</template>

<style scoped>
.el-row {
    margin: 15px;
}
</style>