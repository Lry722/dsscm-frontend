<script setup>
import { baseURL } from '@/axios'

const props = defineProps({
    data: Object
})

const statusDict = {
    0: '待审核',
    1: '审核通过',
    2: '配货',
    3: '卖家已发货',
    4: '已收货',
}

const paymentTypeDict = {
    0: '当面支付',
    1: '线上支付',
    2: '货到付款'
}

</script>

<template>
    <div class="wrapper">
        <div class="header">
            <el-row>
                <el-col :span="16">
                    <el-text type="info">订单号 </el-text>
                    <el-text size="large">{{ data.serialNumber }}</el-text>
                </el-col>
                <el-col :span="8">
                    <el-text type="info">订单状态 </el-text>
                    <el-text size="large">{{ statusDict[data.status] }}</el-text>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-text type="info">顾客姓名 </el-text>
                    <el-text size="large">{{ data.customerName }}</el-text>
                </el-col>
                <el-col :span="8">
                    <el-text type="info">联系电话 </el-text>
                    <el-text size="large">{{ data.customerPhone }}</el-text>
                </el-col>
                <el-col :span="8">
                    <el-text type="info">创建时间 </el-text>
                    <el-text size="large">{{ data.creationTime }}</el-text>
                </el-col>
            </el-row>
        </div>
        <el-table :data="data.details" stripe>
            <el-table-column prop="productName" label="商品名称" />
            <el-table-column label="商品图片">
                <template #default="scope">
                    <img :src="`${baseURL}/products/photo/${scope.row.productId}`" />
                </template>
            </el-table-column>
            <el-table-column prop="productPrice" label="价格" :formatter="(bill) => '￥' + bill.totalPrice" />
            <el-table-column prop="quantity" label="数量" />
            <el-table-column prop="totalPrice" label="小计价格" :formatter="(bill) => '￥' + bill.totalPrice" />
        </el-table>
        <div class="footer">
            <el-row>
                <el-col :span="8">
                    <el-text type="info">付款方式 </el-text>
                    <el-text size="large">{{ paymentTypeDict[data.paymentType] }}</el-text>
                </el-col>
                <el-col :span="8">
                    <el-text type="info">商品数量 </el-text>
                    <el-text size="large">{{ data.count }}</el-text>
                </el-col>
                <el-col :span="8">
                    <el-text type="info">总消费 </el-text>
                    <el-text size="large">￥{{ data.totalPrice }}</el-text>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 6px #ccc;
}

.header> :last-child {
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 25px;
    padding-right: 25px;
}

.header> :first-child {
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 25px;
    padding-right: 25px;
}

.footer {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
}

img {
    width: 160px;
    height: 90px;
    object-fit: contain;
    /* 或 cover, depending on your needs */
    object-position: 0%;
}
</style>