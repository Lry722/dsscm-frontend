<script setup>
import { ref, provide, onMounted } from 'vue'
import service from '@/axios'
import RoleHeader from '@/components/role/RoleHeader.vue'
import RoleTable from '@/components/role/RoleTable.vue'
import RoleEditDialog from '@/components/role/RoleEditDialog.vue'

const URL = '/roles';

const permissionLut = {
    'product': '商品',
    'bill': '采购订单',
    'order': '销售订单',
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

    await service.post(URL, newRole);
    roles.value.push(newRole);

    addDialogVisible.value = false;
}

async function sendDelete() {

    await service.delete(URL, roles.value[editingRow.value].id);

    roles.value.splice(editingRow.value, 1);
}

async function sendUpdate(newVal) {

    await service.put(URL, newVal)

    roles.value[editingRow.value] = JSON.parse(JSON.stringify(newVal));
    editDialogVisible.value = false;
}

async function sendFetch(name = '') {

    const response = await service.get(URL, { params: { name } });
    roles.value.splice(0, roles.value.length);
    roles.value.push(...response.data.data);

}

onMounted(() => {
    sendFetch();
})

</script>

<template>
    <div class="wrapper">
        <RoleHeader @add="addDialogVisible = true" @search="name => sendFetch(name)" />
        <RoleTable @edit="row => handleEdit(row)" @delete="row => handleDelete(row)" :roles="roles" />
    </div>

    <RoleEditDialog id="editDialog" :role="roles[editingRow]" :visible="editDialogVisible"
        @closed="editDialogVisible = false" @confirmed="newVal => sendUpdate(newVal)" />
    <RoleEditDialog id="addDialog" :role="emptyRole" :visible="addDialogVisible" @closed="addDialogVisible = false"
        @confirmed="(newRole) => sendCreate(newRole)" />
</template>

<style scoped>
.wrapper {
    margin: 0 15px;
}

.wrapper>* {
    margin: 15px 0;
}
</style>