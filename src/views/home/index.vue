<script setup>
import { onMounted, ref } from 'vue';
import { default as service } from '@/axios';
import Sales24HChart from '@/components/home/Sales24HChart.vue';

const overview = ref({
    productCount: 0,
    providerCount: 0,
    salesToday: 0,
    salesMonth: 0,
})


async function fetchData() {

    let resp = await service.get('/overview');
    overview.value = resp.data;

}

onMounted(() => {
    fetchData();
})

</script>

<template>
    <div class="overview">
        <div class="header">
            <div class="header-item">
                <div class="content">
                    <el-icon>
                        <Coin style="color: #F3BB45" />
                    </el-icon>
                    <div class="text">
                        <p>商品种类</p>
                        {{ overview.productCount }}样
                    </div>
                </div>
                <hr>
            </div>
            <div class="header-item">
                <div class="content">
                    <el-icon>
                        <Wallet style="color: #7AC29A" />
                    </el-icon>
                    <div class="text">
                        <p>供应商数</p>
                        {{ overview.providerCount }}个
                    </div>
                </div>
                <hr>
            </div>
            <div class="header-item">
                <div class="content">
                    <el-icon>
                        <ShoppingCart style="color: #EB5E28" />
                    </el-icon>
                    <div class="text">
                        <p>今日销售额</p>
                        ￥{{ overview.salesToday }}
                    </div>
                </div>
                <hr>
            </div>
            <div class="header-item">
                <div class="content">
                    <el-icon>
                        <DataLine style="color: #68B3C8" />
                    </el-icon>
                    <div class="text">
                        <p>本月销售额</p>
                        ￥{{ overview.salesMonth }}
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
    <Sales24HChart />
</template>

<style scoped>
.overview {
    margin: 25px;
}

.header {
    display: flex;
    justify-content: space-between;
    height: 130px;
    margin-bottom: 20px;
    font-family: sans-serif;
}

.header-item {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    width: 23%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
}

.content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 60%;
    margin-bottom: 5px;
}

.text {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: right;
    font-size: 28px;
}

p {
    font-size: 0.6em;
    margin: 0;
}

.el-icon {
    font-size: 50px;
    margin-left: 10px;
}

hr {
    width: 100%;
    height: 1px;
    border: none;
    background-color: #dcdfe6;
}
</style>