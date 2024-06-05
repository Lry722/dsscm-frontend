<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import service from '@/axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const props = defineProps({
    rawData: Object
})

const data = ref(null)
const isAddingCategory = ref(false)
const addingCategoryName = ref('')
const inputRef = ref(null)

function exitAdding() {
    isAddingCategory.value = false
    addingCategoryName.value = ''
}

async function handleAdd() {
    if (addingCategoryName.value) {
        let newCategory = {
            parent: data.value.id,
            name: addingCategoryName.value,
            level: 3
        }
        console.log(newCategory);
        let resp = await service.post('/products/categories', newCategory)
        newCategory.id = resp.data
        data.value.children.push(newCategory)
        ElMessage.success('添加成功')
    }
    exitAdding();
}

async function handleDeleteLevel2() {
    let confirmed = await ElMessageBox.confirm(
        `确定要删除${data.value.name}及其下所有分类吗？`,
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    if (!confirmed) return

    let resp = await service.delete(`/products/categories/${data.value.id}`)

    data.value = null
    ElMessage.success('删除成功')

}

async function handleDeleteLevel3(id) {
    let resp = await service.delete(`/products/categories/${id}`)

    data.value.children = data.value.children.filter(category => category.id != id)
    ElMessage.success('删除成功')

}

watchEffect(() => {
    if (props.rawData) {
        data.value = JSON.parse(JSON.stringify(props.rawData))
    }
})

</script>

<template>
    <ul v-if="data" class="card">
        <li class="card-title">
            {{ data?.id }} | {{ data?.name }}
            <el-icon id="delete-button" size="large" @click="handleDeleteLevel2">
                <Delete />
            </el-icon>
        </li>
        <li v-for="category in data?.children" :key="category.id" class="card-item">
            <span>{{ category.id }} | {{ category.name }}</span>
            <el-icon id="delete-button" @click="handleDeleteLevel3">
                <Close />
            </el-icon>
        </li>
        <li class="card-add">
            <el-icon id="add-button" v-show="!isAddingCategory"
                @click="() => { isAddingCategory = true; inputRef.focus() }">
                <Plus />
            </el-icon>
            <el-input v-model="addingCategoryName" ref="inputRef" v-show="isAddingCategory" @keydown.enter="handleAdd"
                @keydown.esc="exitAdding" @blur="exitAdding"></el-input>
        </li>
    </ul>
</template>

<style scoped>
ul {
    padding-inline-start: 0;
}

ul li {
    list-style: none;
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
}

.card-title {
    color: #fff;
    border: #337ab7 solid 1px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #337ab7;
}

.card-item {
    border: #dcdfe6 solid 1px;
    border-top: none;
}

#delete-button {
    color: #b1b3b8;
}

#delete-button:hover {
    cursor: pointer;
    color: inherit;
}

.card-add {
    color: #b1b3b8;
    border: #dcdfe6 solid 1px;
    border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#add-button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>