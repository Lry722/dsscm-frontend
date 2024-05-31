<script setup>
import { ref, watch } from 'vue'
import { ArrowRight, User, Message, Setting, ArrowLeft } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import store from '@/store';
import { baseURL } from '@/axios'

const photoURL = ref(null);
const userName = ref(null);
watch(() => store.state.userId, (newValue) => {
    if (newValue) {
        photoURL.value = baseURL + "/users/photo"
        userName.value = store.state.userName
    }
}, { immediate: true })

const route = useRoute();
const pathList = computed(() => {
    return route.matched.filter(item => item.name != '首页');
}, { immediate: true })

const greet = computed(() => {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 6) {
        return "晚上好";
    } else if (hour < 11) {
        return "上午好";
    } else if (hour < 13) {
        return "中午好";
    } else if (hour < 18) {
        return "下午好";
    } else {
        return "晚上好";
    }
})

</script>

<template>
    <el-row>
        <el-col :span="12">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="({ name, path }, index) in pathList" :key="index" :to="path">{{ name
                    }}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col id="user-info" :span="12">
            <el-text size="large">{{ userName }}，{{ greet }}！</el-text>
            <el-dropdown>
                <el-avatar :size="50" :src="photoURL" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="User">个人中心</el-dropdown-item>
                        <el-dropdown-item icon="Message">消息</el-dropdown-item>
                        <el-dropdown-item icon="Setting">设置</el-dropdown-item>
                        <el-dropdown-item icon="ArrowLeft" @click="store.commit('logout')">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<style scoped>
.el-row {
    width: 100%;
    align-items: center;
}

#user-info {
    display: flex;
    justify-content: right;
    align-items: center;
}

.el-text {
    margin-right: 20px;
}

.el-avatar {
    min-width: 50px;
    cursor: pointer;
}
</style>