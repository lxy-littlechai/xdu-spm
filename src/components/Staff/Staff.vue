<template>
  <div class="common-layout">
    <el-container>
      <el-header>Book Management</el-header>
      <el-container class="layout-container">
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item index="2" router="">
              <el-icon><icon-menu /></el-icon>
              <span>Patron Operation</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <setting />
              </el-icon>
              <span>Book Operation</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>


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
  }

  .layout-container {
    height: 90vh;
  }

  .el-aside {
    .el-menu {
      height: 100%;
    }
  }
}
</style>
