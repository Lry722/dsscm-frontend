<script setup>
import axios from 'axios';
import { ref, inject, watchEffect, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import locale from 'element-plus/dist/locale/zh-cn.mjs'
import ImageUploader from '@/components/ImageUploader.vue'

const router = useRouter();
const route = useRoute();

const genders = [
    { label: '男', value: 'M' },
    { label: '女', value: 'F' }
]

const roles = ref([])

const editingUser = ref({
    "id": null,
    "account": "",
    "roleName": "",
    "userName": "",
    "gender": "",
    "birthday": "",
    "email": "",
    "phone": "",
    "address": "",
    "description": ""
});

function cancelEdit() {
    router.push({ name: '用户管理' });
}

async function fetchUser(id) {
    try {
        let resp = await axios.get(inject('baseURL') + '/users/' + id);
        editingUser.value = resp.data.data;
    } catch (e) {
        console.error(e)
    }
}

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

onMounted(() => {
    fetchRoles();
    fetchUser(route.query.id);
})
</script>

<template>
    <el-form class="wrapper" label-position="top">
        <el-form-item>
            <h2 v-if="editingUser?.id">修改用户信息 <el-text type="info">Edit User Infomation</el-text></h2>
            <h2 v-else>新增用户信息 <el-text type="info">Add User Infomation</el-text></h2>
        </el-form-item>

        <el-row>
            <el-col :span="8">
                <el-form-item label="账号">
                    <el-input v-model="editingUser.account" readonly size="large" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="用户名">
                    <el-input v-model="editingUser.userName" size="large" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="性别">
                    <el-select v-model="editingUser.gender" size="large">
                        <el-option v-for="item in genders" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="邮箱">
                    <el-input v-model="editingUser.email" size="large" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="电话">
                    <el-input v-model="editingUser.phone" size="large" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-form-item label="地址">
                    <el-input v-model="editingUser.address" size="large" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-config-provider :locale="locale">
                    <el-form-item label="出生日期">
                        <el-date-picker v-model="editingUser.birthday" type="date" size="large"
                            style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-config-provider>
            </el-col>

            <el-col :span="12">
                <el-form-item label="角色">
                    <el-select v-model="editingUser.role" size="large">
                        <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>


        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="照片">
                    <ImageUploader />
                </el-form-item>>
            </el-col>
            <el-col :span="16">
                <el-form-item label="简介">
                    <el-input v-model="editingUser.description" type="textarea" :rows="8" size="large" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3" :offset="18">
                <el-form-item>
                    <el-button v-if="editingUser?.id" type="primary" @click="saveUser" size="large" style="width: 100%;">保存</el-button>
                    <el-button v-else type="primary" @click="createUser" size="large" style="width: 100%;">创建</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="3">
                <el-form-item>
                    <el-button type="danger" @click="cancelEdit" size="large" style="width: 100%;">取消</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<style scoped>
.wrapper {
    margin: 15px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;
}

.el-col {
    padding: 8px;
}
</style>