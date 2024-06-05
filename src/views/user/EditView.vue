<script setup>
import service from '@/axios';
import { baseURL } from '@/axios';
import { ref, watchEffect, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import locale from 'element-plus/dist/locale/zh-cn.mjs'
import ImageUploader from '@/components/ImageUploader.vue'
import { ElMessage } from 'element-plus';

const router = useRouter();
const route = useRoute();

const URL = '/users';

const genders = [
    { label: '男', value: '0' },
    { label: '女', value: '1' }
]

const roles = ref([])

const userFormRef = ref(null);

const emptyUser = {
    id: null,
    account: null,
    password: null,
    checkPassword: null,
    roleName: null,
    userName: null,
    gender: null,
    birthday: null,
    email: null,
    password: null,
    address: null,
    description: null
}

const editingUser = ref(JSON.parse(JSON.stringify(emptyUser)));

function emailValidator(rule, value, callback) {
    if (value.length > 0 && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback(new Error('邮箱地址格式不正确'))
    }
    callback()
}

function passwordValidator(rule, value, callback) {
    if (value.length < 6 || value.length > 16) {
        callback(new Error('密码长度应为 6 到 16 个字符'))
    } else {
        if (editingUser.value.checkPassword) {
            userFormRef?.value.validateField('checkPassword', callback)
        } else {
            callback()
        }
    }
}

function checkPassValidator(rule, value, callback) {
    if (value !== editingUser.value.password) {
        callback(new Error('两次输入密码不一致'))
    } else {
        callback()
    }
}

const rules = {
    account: [
        { required: true, message: "请输入账号", trigger: "blur" },
    ],
    name: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 2, max: 10, message: "用户名长度应为 2 到 16 个字", trigger: ["change", "blur"] }
    ],
    email: [
        { validator: emailValidator, trigger: 'blur' }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { validator: passwordValidator, trigger: 'blur' }
    ],
    checkPassword: [
        { required: true, message: "请再次输入密码", trigger: "blur" },
        { validator: checkPassValidator, trigger: 'blur' }
    ],
    role: [
        { required: true, message: "请选择身份", trigger: "blur" }
    ]
}

const photo = ref(new File([new Blob()], 'emptyfile.txt', { type: 'text/plain' }));
const photoUrl = ref(null);

function back() {
    router.push({ name: '用户管理' });
}

async function fetchUser(id) {
    let resp = await service.get('/users/' + id);
    editingUser.value = resp.data;
    photoUrl.value = baseURL + URL + '/photo/' + editingUser.value.id
}

async function fetchRoles() {

    let resp = await service.get('/roles');
    roles.value.slice(1);
    roles.value.push(...resp.data);

}

function handleClear() {
    if (route.query.id) {
        fetchUser(route.query.id);
    } else {
        editingUser.value = emptyUser;
    }
}

async function handleUpdate(valid) {
    if (!valid) {
        ElMessage.error('请正确填写信息！');
        return;
    }

    let formData = new FormData();
    let blob = new Blob([JSON.stringify(editingUser.value)], { type: 'application/json' });
    formData.append('userInfo', blob);
    if (photo.value) {
        formData.append('photo', photo.value);
    }
    let resp = await service.put(URL, formData);

    ElMessage.success('修改成功');
    back();
}

async function handleCreate(valid) {
    if (!valid) {
        ElMessage.error('请正确填写信息！');
        return;
    }

    let formData = new FormData();
    let blob = new Blob([JSON.stringify(editingUser.value)], { type: 'application/json' });
    formData.append('user', blob);
    if (photo.value) {
        formData.append('photo', photo.value);
    }
    let resp = await service.post(URL, formData);

    ElMessage.success('添加成功');
    back();

}

onMounted(() => {
    fetchRoles();
    if (route.query.id) {
        fetchUser(route.query.id);
    }
})
</script>

<template>
    <el-form class="wrapper" label-position="top" :rules="rules" :model="editingUser" ref="userFormRef">
        <el-form-item>
            <h2 v-if="editingUser?.id">修改用户信息 <el-text type="info">Edit User Infomation</el-text></h2>
            <h2 v-else>新增用户信息 <el-text type="info">Add User Infomation</el-text></h2>
        </el-form-item>

        <el-row>
            <el-col :span="8">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="editingUser.account" size="large" :disabled="editingUser.id != null" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="editingUser.name" size="large" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="editingUser.gender" size="large">
                        <el-option v-for="item in genders" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editingUser.email" size="large" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="editingUser.phone" size="large" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row v-if="editingUser.id == null">
            <el-col :span="12">
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editingUser.password" size="large" type="password" autocomplete="off" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input v-model="editingUser.checkPassword" size="large" type="password" autocomplete="off" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-form-item label="地址" prop="address">
                    <el-input v-model="editingUser.address" size="large" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-config-provider :locale="locale">
                    <el-form-item label="出生日期" prop="birthday">
                        <el-date-picker v-model="editingUser.birthday" type="date" value-format="YYYY-MM-DD"
                            size="large" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-config-provider>
            </el-col>

            <el-col :span="12">
                <el-form-item label="身份" prop="role">
                    <el-select v-model="editingUser.role" size="large">
                        <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="照片">
                    <ImageUploader @changed="newPhoto => photo = newPhoto" :origin-image="photoUrl" />
                </el-form-item>
            </el-col>
            <el-col :span="16">
                <el-form-item label="简介">
                    <el-input v-model="editingUser.description" type="textarea" :rows="8" size="large" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="3">
                <el-button @click="handleClear" size="large" style="width: 100%;">重置</el-button>
            </el-col>
            <el-col :span="3" :offset="15">
                <el-form-item>
                    <el-button v-if="editingUser?.id" type="primary" @click="userFormRef.validate(handleUpdate)"
                        size="large" style="width: 100%;">保存</el-button>
                    <el-button v-else type="primary" @click="userFormRef.validate(handleCreate)" size="large"
                        style="width: 100%;">创建</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="3">
                <el-form-item>
                    <el-button type="danger" @click="back" size="large" style="width: 100%;">取消</el-button>
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