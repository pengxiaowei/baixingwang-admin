<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>计划
          </template>

          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="/plans/edit">新建计划</el-menu-item>
            <el-menu-item index="/plans/list">计划列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>站点
          </template>
          <el-menu-item-group>
            <template slot="title">分组二</template>
            <el-menu-item index="/sites/edit">新建站点</el-menu-item>
            <el-menu-item index="/sites/list">站点列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>百姓网</span>
      </el-header>

      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {};
</script>