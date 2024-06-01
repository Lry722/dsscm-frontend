<script setup>
import { computed, inject } from 'vue'

const emit = defineEmits(['inspect', 'edit', 'delete', 'pageChanged'])

const props = defineProps({
    products: Array,
    total: Number,
    pageSize: Number,
})

const categories = inject('categories')

function flattenObject({ id, name, children }, result = []) {
    result.push([id, name]);

    children?.forEach(child => {
        flattenObject(child, result);
    });

    return result;
}

function flattenArray(array) {
    let flattenedResult = [];
    for (const item of array) {
        flattenedResult = flattenedResult.concat(flattenObject(item));
    }
    return flattenedResult;
}

const flattenedCategories = computed(() => {
    return Object.fromEntries(flattenArray(categories.value));
})

const formattedProducts = computed(() => {
    return props.products.map(product => {
        return {
            ...product,
            categoryLevel1: flattenedCategories.value[product.categoryLevel1],
            categoryLevel2: flattenedCategories.value[product.categoryLevel2],
            categoryLevel3: flattenedCategories.value[product.categoryLevel3],
        }
    })
})

</script>

<template>
    <el-table :data="formattedProducts" stripe style="width: 100%;">
        <el-table-column prop="id" label="商品编号" width="100"/>
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="price" label="单价" :formatter="(product) => '￥'+product.price"/>
        <el-table-column prop="placement" label="摆放位置" />
        <el-table-column prop="categoryLevel1" label="一级分类" />
        <el-table-column prop="categoryLevel2" label="二级分类" />
        <el-table-column prop="categoryLevel3" label="三级分类" />
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