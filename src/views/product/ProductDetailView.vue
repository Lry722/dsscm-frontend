<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import service from '@/axios';
import { baseURL } from '@/axios';

const router = useRouter()
const route = useRoute()

const data = ref()

async function fetchData() {
    let resp = await service.get(`/products/${route.query.id}`)
    data.value = resp.data
}

const category = ref('')

onMounted(async () => {
    await fetchData()
    let result = ''
    let resp = await service.get(`/products/categories/${data.value.categoryLevel1}`)
    result += resp.data.name
    resp = await service.get(`/products/categories/${data.value.categoryLevel2}`)
    result += ' ' + resp.data.name
    resp = await service.get(`/products/categories/${data.value.categoryLevel3}`)
    result += ' ' + resp.data.name
    category.value = result
})

function back() {
    router.push({
        name: '商品管理'
    })
}

</script>

<template>
    <div id="wrapper">
        <p>
            <el-text>商品编码：</el-text>
            <el-text>{{ data?.id }}</el-text>
        </p>
        <p>
            <el-text>商品名称：</el-text>
            <el-text>{{ data?.name }}</el-text>
        </p>
        <p>
            <el-text>商品类别：</el-text>
            <el-text>{{ category }}</el-text>
        </p>
        <p>
            <el-text>价格：</el-text>
            <el-text>￥{{ data?.price }}</el-text>
        </p>
        <p>
            <el-text>单位：</el-text>
            <el-text>{{ data?.unit }}</el-text>
        </p>
        <p>
            <el-text>数量：</el-text>
            <el-text>{{ data?.stock }}</el-text>
        </p>
        <p>
            <el-text>摆放位置：</el-text>
            <el-text>{{ data?.placement }}</el-text>
        </p>
        <p>
            <el-text>商品描述：</el-text>
            <el-text>{{ data?.description }}</el-text>  
        </p>
        <p>
            <el-text>图片：</el-text>
            <img v-if="data != null" :src="`${baseURL}/products/photo/${data?.id}`">
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
    width: 100px;
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