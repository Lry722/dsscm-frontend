<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import service from '@/axios'
import { baseURL } from '@/axios';
import { ElMessage } from 'element-plus';
import ImageUploader from '@/components/ImageUploader.vue';

const router = useRouter();
const route = useRoute();

const URL = `/products`;

const emptyData = {
    name: null,
    price: null,
    stock: null,
    placement: null,
    unit: null,
    categoryLevel1: null,
    categoryLevel2: null,
    categoryLevel3: null,
    description: null,
}

const editingData = ref(JSON.parse(JSON.stringify(emptyData)));
const photo = ref(new File([new Blob()], 'emptyfile.txt', { type: 'text/plain' }));
const photoUrl = ref(null)
const categories = ref(null);
const formRef = ref(null);
const rules = ref({
    name: [
        { required: true, message: '请输入商品名称', trigger: 'blur' },
    ],
    price: [
        { required: true, message: '请输入商品价格', trigger: 'blur' },
        { pattern: /^\d+(\.\d+)?$/, message: '请输入正确的价格', trigger: 'blur'}
    ],
    stock: [
        { required: true, message: '请输入商品库存', trigger: 'blur' },
        { pattern: /^\d+$/, message: '请输入正确的库存', trigger: 'blur'}
    ],
    placement: [
        { required: true, message: '请输入商品摆放位置', trigger: 'blur' },
    ],
    unit: [
        { required: true, message: '请输入商品单位', trigger: 'blur' },
    ],
    categoryLevel1: [
        { required: true, message: '请选择商品一级分类', trigger: 'blur' },
    ],
    categoryLevel2: [
        { required: true, message: '请选择商品二级分类', trigger: 'blur' },
    ],
    categoryLevel3: [
        { required: true, message: '请选择商品三级分类', trigger: 'blur' },
    ],
});

async function fetchData(id) {
    let resp = await service.get(`/products/${id}`);
    editingData.value = resp.data;
    if (editingData.value.photo) {
        photoUrl.value = baseURL + URL + '/photo/' + editingData.value.id
    }
}

async function fetchCategories() {
    let resp = await service.get(`/products/categories`);
    categories.value = resp.data;
}

function handleClear() {
    if (route.query.id) {
        fetchData(route.query.id);
    } else {
        editingData.value = JSON.parse(JSON.stringify(emptyData));
    }
}

async function handleUpdate(valid) {
    if (!valid) {
        ElMessage.error('请正确填写信息！');
        return;
    }

    let formData = new FormData();
    let blob = new Blob([JSON.stringify(editingData.value)], { type: 'application/json' });
    formData.append('product', blob);
    if (photo.value) {
        formData.append('photo', photo.value);
    }
    let resp = await service.put(URL, formData);

    ElMessage.success('修改成功');
    back();
}

async function handleCreate(valid) {
    if (!valid) {
        ElMessage.error('请正确填写信息！');
        return;
    }

    let formData = new FormData();
    let blob = new Blob([JSON.stringify(editingData.value)], { type: 'application/json' });
    formData.append('product', blob);
    if (photo.value) {
        formData.append('photo', photo.value);
    }
    await service.post(URL, formData);
    ElMessage.success('添加成功');
    back();
}

function back() {
    router.push({ name: '商品管理' });
}

const categoriesLevel1 = categories
const categoriesLevel2 = ref([])
const categoriesLevel3 = ref([])

watch(() => editingData.value.categoryLevel1, (newValue) => {
    editingData.value.categoryLevel2 = null;
    editingData.value.categoryLevel3 = null;
    categoriesLevel2.value = [];
    categoriesLevel3.value = [];
    if (newValue && categoriesLevel1.value) {
        categoriesLevel2.value = categoriesLevel1.value.find((item) => item.id === newValue).children;
    }
})

watch(() => editingData.value.categoryLevel2, (newValue) => {
    editingData.value.categoryLevel3 = null;
    categoriesLevel3.value = [];
    if (newValue && categoriesLevel2.value) {
        categoriesLevel3.value = categoriesLevel2.value.find((item) => item.id === newValue).children;
    }
})

watch(() => editingData.price, (newValue) => {
    console.log(newValue);
})

onMounted(async () => {
    await fetchCategories();
    if (route.query.id) {
        fetchData(route.query.id);
    }
})

</script>

<template>
    <el-form class="wrapper" label-position="top" :rules="rules" :model="editingData" ref="formRef">
        <el-row>
            <el-col :span="12">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="editingData.name" size="large" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="价格" prop="price">
                    <el-input v-model="editingData.price" size="large"
                        :formatter="(value) => `￥ ${value}`"
                        :parser="(value) => value.replace(/\￥\s/g, '')" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="库存" prop="stock">
                    <el-input v-model="editingData.stock" type="number" size="large" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="摆放位置" prop="placement">
                    <el-input v-model="editingData.placement" size="large" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="editingData.unit" size="large" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="一级分类" prop="categoryLevel1">
                    <el-select v-model="editingData.categoryLevel1" size="large" placeholder="请选择">
                        <el-option v-for="category in categoriesLevel1" :key="category.id" :label="category.name"
                            :value="category.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="二级分类" prop="categoryLevel2">
                    <el-select v-model="editingData.categoryLevel2" size="large" placeholder="请选择">
                        <el-option v-for="category in categoriesLevel2" :key="category.id" :label="category.name"
                            :value="category.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="三级分类" prop="categoryLevel3">
                    <el-select v-model="editingData.categoryLevel3" size="large" placeholder="请选择">
                        <el-option v-for="category in categoriesLevel3" :key="category.id" :label="category.name"
                            :value="category.id" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="图片">
                    <ImageUploader @changed="newPhoto => photo = newPhoto" :origin-image="photoUrl" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="商品描述" prop="description">
                    <el-input v-model="editingData.description" type="textarea" :rows="6" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="3">
                <el-button @click="handleClear" size="large" style="width: 100%;">重置</el-button>
            </el-col>
            <el-col :span="3" :offset="15">
                <el-form-item>
                    <el-button v-if="editingData?.id" type="primary" @click="formRef.validate(handleUpdate)"
                        size="large" style="width: 100%;">保存</el-button>
                    <el-button v-else type="primary" @click="formRef.validate(handleCreate)" size="large"
                        style="width: 100%;">创建</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="3">
                <el-form-item>
                    <el-button type="danger" @click="back" size="large" style="width: 100%;">取消</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<style scoped>
.wrapper {
    margin: 15px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;
}

.el-col {
    padding: 8px;
}
</style>