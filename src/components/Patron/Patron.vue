<template>
  <div class="common-layout">
    <el-container>
      <el-header>Welcome to the British Library
        <div class="flex-grow" />
        <el-button @click="logout">Logout</el-button>
      </el-header>

      <el-container class="layout-container">
        <el-aside width="250px">
          <el-menu router="true" default-active="/Patron/BookSearch" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item index="/Patron/BookSearch">Book Search</el-menu-item>
                <el-menu-item index="/Patron/ShopLists">Shop Lists</el-menu-item>
                <el-menu-item index="/Patron/BorrowedBook">Borrowed Book</el-menu-item>
                <el-menu-item index="/Patron/HistoricalBook">Historical Borrowed Book</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex';
import { checkFeeLimit,  warning} from "@/api"
import { useRouter } from "vue-router"
const router = useRouter();

const store = useStore();
onMounted(() => {
  const feeCheck = checkFeeLimit(store.state.username);
  feeCheck.then((res) => {
    if(res == false) {
     warning("There are some books have been over due")
    }
  })
})

const logout = () => router.push({
  path: "/"
})

</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  .el-header {
    height: 10vh;
    width: 100%;
    background-color: #409eff;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: white;
    .flex-grow {
     flex-grow: 1;
    }
  }

  .layout-container {
    height: 90vh;
  }

  .el-aside {
    
    .el-menu {
      height: 100%;
      .el-menu-item {

      }
    }
  }
}
</style>
