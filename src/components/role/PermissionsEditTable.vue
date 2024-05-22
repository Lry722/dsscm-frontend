<script setup>
import { computed, inject, ref } from "vue";

const emit = defineEmits(['update'])

const props = defineProps({
    permissions: Object
})

const permissionsLut = inject('permissionLut');
const formattedPermissions = computed(() => {
    return Object.entries(props.permissions).map(([key, value]) => {
        return {
            name: permissionsLut[key],
            c: value & 1,
            r: value & 2,
            u: value & 4,
            d: value & 8
        }
    })
})

</script>

<template>
    <el-table :data="formattedPermissions" :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }">
        <el-table-column type="index" :index="index => formattedPermissions[index].name" width="100">

        </el-table-column>
        <el-table-column label="新增">
            <template #default="scope">
                <el-button @click="emit('update', scope.row.name, 1)" :type="scope.row.c ? 'primary' : 'default'" />
            </template>
        </el-table-column>
        <el-table-column label="删除">
            <template #default="scope">
                <el-button @click="emit('update', scope.row.name, 2)" :type="scope.row.r ? 'primary' : 'default'" />
            </template>
        </el-table-column>
        <el-table-column label="修改">
            <template #default="scope">
                <el-button @click="emit('update', scope.row.name, 4)" :type="scope.row.u ? 'primary' : 'default'" />
            </template>
        </el-table-column>
        <el-table-column label="查询">
            <template #default="scope">
                <el-button @click="emit('update', scope.row.name, 8)" :type="scope.row.d ? 'primary' : 'default'" />
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped></style>