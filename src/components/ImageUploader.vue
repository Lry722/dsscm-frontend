<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import service from '@/axios';

const emit = defineEmits(['changed'])
const props = defineProps({
  originImage: String
})

const imageUrl = ref(null)
const uploadBanner = ref()

const handleChange = (file) => {
  if (file.type !== 'image/jpeg') {
    ElMessage.error('图片必须为 JPG 格式!')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不得超过 2MB!')
    return false
  }
  return true
}

const handleUpload = (file) => {
  imageUrl.value = URL.createObjectURL(file.file)
  emit('changed', file.file)
}

const clearUploaded = () => {
  imageUrl.value = null;
  uploadBanner.value.clearFiles();
  emit('changed', null);
};

watchEffect(async () => {
  if (props.originImage) {
    let resp = await service.get(props.originImage, {
      responseType: "blob",
    });
    if (resp.data.size) {
      imageUrl.value = URL.createObjectURL(resp.data);
    } else {
      imageUrl.value = null
    }
  }
})
</script>

<template>
  <el-upload class="image-uploader" action="#" :limit="1" :show-file-list="false" :http-request="handleUpload"
    :before-upload="handleChange" accept=".jpg,.jpeg" :disabled="imageUrl != null" ref="uploadBanner">
    <img v-if="imageUrl" :src="imageUrl" class="image" />
    <el-icon v-else class="image-uploader-icon">
      <Plus />
    </el-icon>
    <el-icon v-if="imageUrl" class="logoDelete" @click.stop="clearUploaded">
      <CircleCloseFilled />
    </el-icon>
  </el-upload>
</template>

<style scoped>
.image-uploader .image {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.image-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.image-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>