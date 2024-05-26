<script setup>
import { computed, inject } from 'vue'

const emit = defineEmits(['edit', 'delete'])

const prop = defineProps({
    users: Array
})

const roles = inject('roles');

function calculateAge(birthdayString) {
    var birthday = new Date(birthdayString);
    var today = new Date();
    var currentYear = today.getFullYear();
    var birthYear = birthday.getFullYear();
    var age = currentYear - birthYear;
    // 如果今年还没过生日，年龄需要减一
    if (today.getMonth() < birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) {
        age--;
    }
    return age;
}

const formattedUsers = computed(() => {
    return prop.users.map(user => {
        return {
            ...user,
            role: roles.value.find(role => role.id === user.role)?.name,
            gender: user.gender ? (user.gender === 'M' ? '男' : '女') : '-',
            age: user.birthday ? calculateAge(user.birthday) : '-'
        }
    })
})

</script>

<template>
    <el-table :data="formattedUsers" stripe style="width: 100%;">
        <el-table-column prop="account" label="账号" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="role" label="角色" />
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