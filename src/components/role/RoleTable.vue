<script setup>
import { computed, inject } from 'vue'

const prop = defineProps({
    roles: Array
})

const emit = defineEmits(['edit', 'delete'])

const permissionLut = inject('permissionLut')

function valToStr(val) {
    let strs = [
        val & 1 ? '增' : null,
        val & 2 ? '删' : null,
        val & 4 ? '改' : null,
        val & 8 ? '查' : null
    ]
    return strs.filter(s => s).join('/')
}

const formattedRoles = computed(() => {
    return prop.roles.map((role) => {
        return {
            ...role,
            permissions: Object.fromEntries(Object.entries(role.permissions).map(([key, value]) => [key, valToStr(value)]))
        }
    })
})

</script>

<template>
    <el-table :data="formattedRoles" stripe style="width: 100%;">
        <el-table-column prop="name" label="名称" />
        <el-table-column v-for="(value, key) in permissionLut" :key="key" :prop="'permissions.' + key" :label="value"
            width="120" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="emit('edit', scope.$index)">
                    编辑
                </el-button>
                <el-button size="small" type="danger" @click="emit('delete', scope.$index)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped>
.el-table {
    border-radius: 5px;
}
</style>