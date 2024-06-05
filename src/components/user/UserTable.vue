<script setup>
import { computed, inject } from 'vue'

const emit = defineEmits(['edit', 'delete', 'pageChanged'])

const props = defineProps({
    users: Array,
    total: Number,
    pageSize: Number,
})

const roles = inject('roles');

function calculateAge(birthdayString) {
    var birthday = new Date(birthdayString);
    var today = new Date();
    var currentYear = today.getFullYear();
    var birthYear = birthday.getFullYear();
    var age = currentYear - birthYear;
    if (today.getMonth() < birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) {
        age--;
    }
    return age;
}

const formattedUsers = computed(() => {
    return props.users.map(user => {
        return {
            ...user,
            role: roles.value.find(role => role.id === user.role)?.name,
            gender: user.gender ? (user.gender == 0 ? '男' : '女') : '-',
            age: user.birthday ? calculateAge(user.birthday) : '-'
        }
    })
})

</script>

<template>
    <el-table :data="formattedUsers" stripe style="width: 100%;">
        <el-table-column prop="account" label="账号" width="200" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="role" label="身份" />
        <el-table-column label="操作" width="140">
            <template #default="scope">
                <el-button size="small" plain type="warning" @click="emit('edit', scope.$index)">
                    编辑
                </el-button>
                <el-button size="small" plain type="danger" @click="emit('delete', scope.$index)">
                    删除
                </el-button>
            </template>
        </el-table-column>

        <template #append>
            <el-pagination background layout="prev, pager, next" :total="props.total" :page-size="props.pageSize"
                @current-change="page => emit('pageChanged', page)" />
        </template>
    </el-table>
</template>

<style scoped>
.el-table {
    border-radius: 5px;
}

.el-pagination {
    margin: 20px;
    justify-content: right;
}
</style>