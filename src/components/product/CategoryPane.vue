<script setup>
import { ref, watchEffect } from 'vue';
import CategoryCard from './CategoryCard.vue';
import service from '@/axios';
import { ElMessage } from 'element-plus'

const props = defineProps({
    rawData: Object
})
const data = ref(null)

const emit = defineEmits(["add", "delete", "edit"])

const isAddingCategory = ref(false)
const addingCategoryName = ref(null)
const inputRef = ref(null)

function exitAdding() {
    isAddingCategory.value = false
    addingCategoryName.value = null
}

async function finishAddingCategory() {
    if (addingCategoryName.value) {
        let newCategory = {
            parent: data.value.id,
            name: addingCategoryName.value,
            level: 2,
            children: []
        }
        console.log(newCategory);
        let resp = await service.post('/products/categories', newCategory)
        newCategory.id = resp.data
        data.value.children.push(newCategory)
        ElMessage.success('添加成功')
    }
    exitAdding()
}

watchEffect(() => {
    if (props.rawData) {
        data.value = JSON.parse(JSON.stringify(props.rawData))
    }
})
</script>

<template>
    <el-tab-pane class="category-pane">
        <CategoryCard v-for="item in data.children" :key="item.id" :rawData="item"></CategoryCard>
        <div class="card add-category-level1">
            <el-icon v-show="!isAddingCategory" class="add-category-level1-icon"
                @click="() => { isAddingCategory = true; inputRef.focus() }">
                <Plus />
            </el-icon>
            <el-input ref="inputRef" v-show="isAddingCategory" v-model="addingCategoryName"
                @keyup.enter="finishAddingCategory" @keydown.esc="exitAdding" @blur="exitAdding"></el-input>
        </div>
        <span class="card break"></span>
        <span class="card break"></span>
        <span class="card break"></span>
    </el-tab-pane>
</template>

<style scoped>
.el-tab-pane {
    display: flex;
    flex-flow: column wrap;
    align-content: space-between;
    width: 100%;
    height: 1000px;
}

.card:nth-of-type(4n+1) {
    order: 1;
}

.card:nth-of-type(4n+2) {
    order: 2;
}

.card:nth-of-type(4n+3) {
    order: 3;
}

.card:nth-of-type(4n) {
    order: 4;
}

.card {
    width: 23%;
    padding: 0 1%;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
}

.break {
    flex-basis: 100%;
    width: 0;
    margin: 0;
}

.add-category-level1 {
    width: 23%;
    height: 42px;
    padding: 0 1%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.el-icon.add-category-level1-icon {
    font-size: 16px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    text-align: center;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.el-icon.add-category-level1-icon:hover {
    border-color: var(--el-color-primary);
}
</style>