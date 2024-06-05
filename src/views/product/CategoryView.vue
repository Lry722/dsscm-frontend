<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import service from '@/axios';
import CategoryPane from '@/components/product/CategoryPane.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const categories = ref([]);

const activeCategoryLevel1 = ref()

async function fetchData() {

    let resp = await service.get('/products/categories');
    categories.value = resp.data;
    activeCategoryLevel1.value = categories.value[0].id;

}

async function handleTabEdit(targetName, action) {

    if (action === 'add') {
        let newCategoryName = await ElMessageBox.prompt('请输入名称', '添加一级分类', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        })
        let newCategory = {
            name: newCategoryName.value,
            parent: 0,
            level: 1,
            children: []
        }
        let resp = await service.post('/products/categories', newCategory);

        newCategory.id = resp.data;
        categories.value.push(newCategory);
        ElMessage.success('添加成功');


    } else {
        let confirmed = await ElMessageBox.confirm(
            `确定要删除${categories.value.find(item => item.id == targetName).name}及其下所有分类吗？`,
            '警告',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        if (confirmed) {
            let resp = await service.delete(`/products/categories/${targetName}`);

            categories.value = categories.value.filter(item => item.id != targetName);
            ElMessage.success('删除成功');

        }
    }
}

onMounted(() => {
    fetchData();
})
</script>

<template>
    <div class="wrapper">
        <el-tabs v-model="activeCategoryLevel1" type="card" editable class="demo-tabs" @edit="handleTabEdit">
            <CategoryPane v-for="(item, index) in categories" :rawData="item" :key="index" :label="item.name"
                :name="item.id" />
        </el-tabs>
    </div>

</template>

<style scoped>
.wrapper {
    margin: 20px;
    padding: 1px 15px;
    background-color: #fff;
    border-radius: 10px;
}

.wrapper>* {
    margin: 15px 0;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>