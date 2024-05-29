<script setup>
import MainView from '@/views/index.vue'
import LoginView from '@/views/login/index.vue'
import { useStore } from 'vuex';
import { provide } from 'vue';

provide('baseURL', 'http://localhost:8081')
</script>

<template>
  <!-- <MainView></MainView> -->
  <LoginView></LoginView>
</template>

<style scoped>

</style>
