<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import axios from 'axios'
import RoleHeader from '@/components/role/RoleHeader.vue'
import RoleTable from '@/components/role/RoleTable.vue'
import RoleEditDialog from '@/components/role/RoleEditDialog.vue'

const permissionLut = {
    'product': '商品',
    'bill': '账单',
    'order': '订单',
    'provider': '供应商',
    'user': '用户',
    'role': '角色',
    'message': '消息'
};
provide('permissionLut', permissionLut);

const roles = ref([]);

const emptyRole = {
    id: null,
    name: "",
    permissions: {
        product: 0,
        bill: 0,
        order: 0,
        provider: 0,
        user: 0,
        role: 0,
        message: 0
    }
};

const editingRow = ref(0);
const editDialogVisible = ref(false);
const addDialogVisible = ref(false);

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
        await axios.post('http://localhost:8080/roles', newRole);
        roles.value.push(newRole);
    } catch (e) {
        console.error(e);
    }
    addDialogVisible.value = false;
}

async function sendDelete() {
    try {
        await axios.delete(`http://localhost:8080/roles/${roles.value[editingRow.value].id}`);
    } catch (e) {
        console.error(e);
    }
    roles.value.splice(editingRow.value, 1);
}

function sendUpdate(newVal) {
    // TODO: 发送更新请求
    roles.value[editingRow.value] = JSON.parse(JSON.stringify(newVal));
    editDialogVisible.value = false;
}

async function sendFetch(name = '') {
    try {
        // 发送获取请求，携带searchName为参数
        const response = await axios.get('http://localhost:8080/roles', { params: { name } });
        roles.value.splice(0, roles.value.length);
        roles.value.push(...response.data.data);
    } catch (e) {
        console.error(e);
    }
}

onMounted(() => {
    sendFetch();
})

</script>

<template>
    <RoleHeader @add="addDialogVisible = true" @search="name => sendFetch(name)" />
    <el-row>
        <RoleTable @edit="row => handleEdit(row)" @delete="row => handleDelete(row)" :roles="roles" />
    </el-row>

    <RoleEditDialog id="editDialog" :role="roles[editingRow]" :visible="editDialogVisible"
        @closed="editDialogVisible = false" @confirmed="newVal => sendUpdate(newVal)" />
    <RoleEditDialog id="addDialog" :role="emptyRole" :visible="addDialogVisible" @closed="addDialogVisible = false"
        @confirmed="(newRole) => sendCreate(newRole)" />
</template>

<style scoped>
.el-row {
    margin: 15px;
}
</style>