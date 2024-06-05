<script setup>
import service from '@/axios';
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import store from '@/store';

const URL = '/login';

const form = ref({
    account: '',
    password: '',
    rememberMe: false,
})

async function handleSubmit() {
    if (form.value.account === '') {
        ElMessage.error('账号不能为空')
        return
    } else if (form.value.password === '') {
        ElMessage.error('密码不能为空')
        return
    }

    const resp = await service.post(URL, form.value)

    ElMessage.success('登陆成功')
    store.commit('login')

} 
</script>

<template>
    <div class="wrapper">
        <el-form :model="form">
            <div id="logo"></div>
            <el-form-item>
                <h1></h1>
            </el-form-item>

            <el-form-item prop="account">
                <el-input v-model="form.account" size="large" placeholder="请输入账号" :prefix-icon="User"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input v-model="form.password" size="large" placeholder="请输入密码" :prefix-icon="Lock"></el-input>
            </el-form-item>

            <el-form-item>
                <el-row>
                    <el-col :span="5">
                        <el-checkbox v-model="form.rememberMe" size="large">记住我</el-checkbox>
                    </el-col>
                    <el-col :span="5" :offset="14">
                        <el-button class="login-btn" size="large" type="primary" @click="handleSubmit">登陆</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: RGB(215, 191, 113);
    background-image: url(@/assets/image/loginlight.png);
    background-position: center;
}

#logo {
    position: relative;
    left: 49px;
    top: -10px;
    width: 68px;
    height: 72px;
    background-image: url(@/assets/image/loginlogo.png);
}

h1 {
    width: 100%;
    height: 43px;
    background-image: url(@/assets/image/loginname.png);
    background-position: center;
    background-repeat: no-repeat;
    margin-top: 10px;
    margin-bottom: 40px;
}

.el-form {
    width: 640px;
    height: 426px;
    padding: 20px;
    border-radius: 10px;
    background-image: url(@/assets/image/loginbox.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.el-input {
    margin-left: 10%;
    width: 50%;
}

.el-checkbox {
    margin-left: 10%;
    width: 50%;
}

.login-btn {
    width: 100%;
}

.el-row {
    width: 80%;
    margin-left: 10%;
    margin-top: 10px;
}
</style>