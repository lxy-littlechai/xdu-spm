<template>
  <div class="container">
    <div class="cover"></div>
    <el-menu
    default-active="/Patron/BookSearch"
    class="el-menu"
    mode="horizontal"
    :ellipsis="false"
    :router="true"
  >
    <el-menu-item>Welcome to Library</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/Patron/BookSearch">Book Search</el-menu-item>
    <el-menu-item index="/Patron/BorrowedBook">Borrowed Book</el-menu-item>
    <el-menu-item index="/">Logout</el-menu-item>
  </el-menu>
  
  </div>
<router-view ></router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'


</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .cover {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: -999;
    background-image: url(https://s.cn.bing.net/th?id=OHR.QingMing2023_ZH-CN6951199028_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&qlt=50);
  }
  
  
  .el-menu {
    width: 100%;
    position: fixed;
    opacity: 0.8;
    z-index: 999;
  }
}
.flex-grow {
  flex-grow: 1;
}
</style>