<script setup>
import { computed, inject } from 'vue'

const emit = defineEmits(['inspect', 'edit', 'delete', 'pageChanged'])

const props = defineProps({
    data: Array,
    total: Number,
    pageSize: Number,
})

const providers = inject('providers');
const products = inject('products');

const formmatedData = computed(() => props.data.map(entry => ({
    ...entry,
    provider: providers.value.find(provider => provider.id === entry.provider)?.name ?? '-',
    product: products.value.find(product => product.id === entry.product)?.name ?? '-',
    paid: entry.paid ? '已付款' : '未付款',
})))

</script>

<template>
    <el-table :data="formmatedData" stripe style="width: 100%;">
        <el-table-column prop="code" label="订单编码" width="100" />
        <el-table-column prop="product" label="商品名称" />
        <el-table-column prop="provider" label="供应商" />
        <el-table-column prop="totalPrice" label="订单金额" :formatter="(bill) => '￥' + bill.totalPrice" />
        <el-table-column prop="paid" label="付款状态" />
        <el-table-column prop="creationTime" label="创建时间" />
        <el-table-column label="操作" width="200">
            <template #default="scope">
                <el-button size="small" plain @click="emit('inspect', scope.$index)">
                    查看
                </el-button>
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