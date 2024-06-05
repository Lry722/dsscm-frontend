<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import service from '@/axios'
import { baseURL } from '@/axios';
import { ElMessage } from 'element-plus';
import ImageUploader from '@/components/ImageUploader.vue';

const router = useRouter();
const route = useRoute();

const URL = `/providers`;

const emptyData = {
    code: null,
    name: null,
    description: null,
    contact: null,
    phone: null,
    address: null,
    fax: null
}

const editingData = ref(JSON.parse(JSON.stringify(emptyData)));
const companyLicencePicture = ref(new File([new Blob()], 'emptyfile.txt', { type: 'text/plain' }));
const companyLicencePictureUrl = ref(null)
const organizationCodePicture = ref(new File([new Blob()], 'emptyfile.txt', { type: 'text/plain' }));
const organizationCodePictureUrl = ref(null)
const formRef = ref(null);
const rules = ref({
    code: [{ required: true, message: '请输入供应商编码', trigger: 'blur' }],
    contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
});

async function fetchData(id) {
    let resp = await service.get(`${URL}/${id}`);
    editingData.value = resp.data;
    companyLicencePictureUrl.value = baseURL + URL + '/companyLicencePicture/' + editingData.value.id
    organizationCodePictureUrl.value = baseURL + URL + '/organizationCodePicture/' + editingData.value.id
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
    formData.append('provider', blob);
    if (companyLicencePicture.value) {
        formData.append('companyLicencePicture', companyLicencePicture.value);
    }
    if (organizationCodePicture.value) {
        formData.append('organizationCodePicture', organizationCodePicture.value);
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
    formData.append('provider', blob);
    if (companyLicencePicture.value) {
        formData.append('companyLicencePicture', companyLicencePicture.value);
    }
    if (organizationCodePicture.value) {
        formData.append('organizationCodePicture', organizationCodePicture.value);
    }
    await service.post(URL, formData);
    ElMessage.success('添加成功');
    back();
}

function back() {
    router.push({ name: '供应商管理' });
}
onMounted(async () => {
    if (route.query.id) {
        fetchData(route.query.id);
    }
})

</script>

<template>
    <el-form class="wrapper" label-position="top" :rules="rules" :model="editingData" ref="formRef">
        <el-row>
            <el-col :span="12">
                <el-form-item label="供应商编码" prop="code">
                    <el-input v-model="editingData.code" size="large" :disabled="route.query.id != null" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="供应商名称" prop="name">
                    <el-input v-model="editingData.name" size="large" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="editingData.contact" size="large" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="editingData.phone" size="large" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="联系地址" prop="address">
                    <el-input v-model="editingData.address" size="large" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="传真" prop="fax">
                    <el-input v-model="editingData.fax" size="large" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-form-item label="描述" prop="description">
                    <el-input v-model="editingData.description" type="textarea" :rows="6" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="企业营业执照">
                    <ImageUploader @changed="newPhoto => companyLicencePicture = newPhoto"
                        :origin-image="companyLicencePictureUrl" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="组织机构代码证">
                    <ImageUploader @changed="newPhoto => organizationCodePicture = newPhoto"
                        :origin-image="organizationCodePictureUrl" />
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