<template>
  <div class="wrap">
    <el-container class="container">
      <el-header class="header">
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <h3>后台电商管理系统</h3>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="loginout">
              <a @click.prevent="handleSignout()" href="#">退出</a>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="aside" width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :unique-opened="true"
            :router="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">
                  <el-menu-item index="users">
                    <i class="el-icon-star-off"></i>
                    <span>用户列表</span>
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-baseball"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">
                  <el-menu-item index="role">
                    <i class="el-icon-watermelon"></i>
                    角色列表
                  </el-menu-item>
                  <el-menu-item index="right">
                    <i class="el-icon-pear"></i>
                    权限列表
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-sunny"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">
                  <el-menu-item index="1-1">
                    <i class="el-icon-lollipop"></i>
                    商品列表
                  </el-menu-item>
                  <el-menu-item index="1-1">
                    <i class="el-icon-potato-strips"></i>
                    分类参数
                  </el-menu-item>
                  <el-menu-item index="1-1">
                    <i class="el-icon-apple"></i>
                    商品分类
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-partly-cloudy"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">
                  <el-menu-item index="1-1">
                    <i class="el-icon-grape"></i>
                    订单列表
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-alarm-clock"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item-group>
                <template slot="title">
                  <el-menu-item index="1-1">
                    <i class="el-icon-sugar"></i>
                    数据报表
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    handleSignout() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
.wrap,
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #fff;
}

.main {
  background-color: #e9eef3;
}
.loginout {
  position: fixed;
  right: 10px;
}
</style>
