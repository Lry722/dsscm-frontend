<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import service from '@/axios';
import { baseURL } from '@/axios';

const router = useRouter()
const route = useRoute()

const URL = '/providers'

const data = ref()

async function fetchData() {
    let resp = await service.get(`${URL}/${route.query.id}`)
    data.value = resp.data
}

const category = ref('')

function back() {
    router.push({
        name: '供应商管理'
    })
}

onMounted(fetchData)

</script>

<template>
    <div id="wrapper">
        <p>
            <el-text>供应商编码：</el-text>
            <el-text>{{ data?.code }}</el-text>
        </p>
        <p>
            <el-text>供应商名称：</el-text>
            <el-text>{{ data?.name }}</el-text>
        </p>
        <p>
            <el-text>联系人：</el-text>
            <el-text>{{ data?.contact }}</el-text>
        </p>
        <p>
            <el-text>联系电话：</el-text>
            <el-text>{{ data?.phone }}</el-text>
        </p>
        <p>
            <el-text>传真</el-text>
            <el-text>{{ data?.fax }}</el-text>
        </p>
        <p>
            <el-text>地址：</el-text>
            <el-text>{{ data?.address }}</el-text>
        </p>
        <p>
            <el-text>描述：</el-text>
            <el-text>{{ data?.description }}</el-text>
        </p>
        <p>
            <el-text>企业营业执照：</el-text>
            <img v-if="data != null" :src="`${baseURL}/providers/companyLicencePicture/${data?.id}`">
        </p>
        <p>
            <el-text>组织机构代码证</el-text>
            <img v-if="data != null" :src="`${baseURL}/providers/organizationCodePicture/${data?.id}`">
        </p>
        
        <el-button type="success" plain size="large" @click="back">返回</el-button>
    </div>
</template>

<style scoped>
#wrapper {
    display: flex;
    flex-direction: column;
    width: calc(100% - 30px);
    background-color: #fff;
    border-radius: 10px;
    margin: 15px;
    padding: 0 15px;
}

p {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin: 8px;
}

p :first-child {
    width: 120px;
    font-size: medium;
    font-weight: bold;
}

.el-button {
    width: 150px;
    margin: 20px;
}

img {
    width: 150px;
    height: 150px;
    object-fit: contain;
}
</style>