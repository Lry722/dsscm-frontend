<script setup>
import { ref, watch } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import store from '@/store';
import { baseURL } from '@/axios'

const photoURL = ref(null);
watch(() => store.state.userId, (newValue) => {
    console.log(newValue)
    if (newValue) {
        photoURL.value = baseURL + "/users/photo/0"
        console.log(photoURL.value)
    }
}, { immediate: true })

const route = useRoute();
const pathList = computed(() => {
    return route.matched.filter(item => item.name != '首页');
}, { immediate: true })

</script>

<template>
    <el-row>
        <el-col :span="23">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="({ name, path }, index) in pathList" :key="index" :to="path">{{ name
                    }}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="1">
            <el-avatar :size="50" :src="photoURL" />
        </el-col>
    </el-row>
</template>

<style scoped>
.el-row {
    width: 100%;
    align-items: center;
}

.el-avatar {
    margin-left: auto;
}
</style>