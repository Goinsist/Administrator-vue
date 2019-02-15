<template>
  <div class="wrapper">
    <db-header></db-header>
    <el-row class="container">
      <el-col :span="4" class="menu">
        <db-sidebar></db-sidebar>
      </el-col>
      <el-col :span="20" class="content">

        <db-table></db-table>

      </el-col>


    </el-row>

    <el-row>
      <el-col :span="24">
        <footer class="footer">
          <db-footer></db-footer>
        </footer>

      </el-col>
    </el-row>
  </div>
</template>
