<script setup>
import { ref, inject, watchEffect } from 'vue'
import PermissionsEditTable from './PermissionsEditTable.vue'

const emit = defineEmits(['closed', 'confirmed'])
const props = defineProps({
    role: Object,
    visible: Boolean
})

const editingRole = ref()
watchEffect(() => {
    if (props.role) {
        editingRole.value = JSON.parse(JSON.stringify(props.role))
    }
})

// 将中文权限名转换为英文权限名
const permissionRLut = Object.fromEntries(Object.entries(inject('permissionLut')).map(([key, value]) => [value, key]))

</script>

<template>
    <el-dialog title="编辑" :model-value="props.visible" @close="emit('closed')">
        <el-form :model="editingRole">
            <el-form-item label="角色名称">
                <el-input v-model="editingRole.name" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <!-- 接受按钮的点击信号，切换对应的权限的bit -->
                <PermissionsEditTable :permissions="editingRole.permissions" @update="(permission, value) => {
                    editingRole.permissions[permissionRLut[permission]] ^= value
                }" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="emit('closed')">
                    取消
                </el-button>
                <el-button type="primary" @click="emit('confirmed', editingRole)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped></style>