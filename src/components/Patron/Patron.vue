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
    <el-menu-item index="/Patron/HistoricalBook">Historical Borrowed Book</el-menu-item>
    <el-menu-item index="/">Logout</el-menu-item>
  </el-menu>
  
  </div>
<router-view ></router-view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex';
import { checkFeeLimit,  warning} from "@/api"

const store = useStore();
onMounted(() => {
  const feeCheck = checkFeeLimit(store.state.username);
  feeCheck.then((res) => {
    if(res == false) {
     warning("There are some books have been over due")
    }
  })
  

})

</script>

<style lang="scss" scoped>
.container {
  position: relative;
  .cover {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: -999;
    background-image: url(../../assets/british-library.jpg);
    background-size:cover;
    background-repeat: no-repeat;
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