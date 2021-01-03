<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '54px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition ="false"
          :router="true"
          :default-active="activePath"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eef"
        >
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item :index="'/' + child.path + ''" v-for="child in item.children" :key="child.id" @click="savaNavState('/' + child.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{child.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("./login");
    },
    async getMenuList() {
      const {data: res} = await this.$http.get('menus')
      console.log(res);
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    savaNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  created() {
    this.getMenuList()
    this.savaNavState()
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .iconfont{
    margin-right: 10px;
  }
  .el-menu{
    border-right: node;
  }
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    color: #fff;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>