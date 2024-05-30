<script setup>
import MainView from '@/views/index.vue'
import LoginView from '@/views/login/index.vue'
import store from './store';

</script>

<template>
  <MainView v-if="store.state.logged"></MainView>
  <LoginView v-if="!store.state.logged"></LoginView>
</template>

<style scoped>

</style>
