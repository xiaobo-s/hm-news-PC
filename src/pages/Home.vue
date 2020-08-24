<template>
  <el-container class="home">
    <el-aside width="200px">
      <div class="title">
        <h3 @click="$router.push('/')">黑马程序员</h3>
      </div>
      <el-menu
        :default-active="$route.path"
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/post-list">
          <i class="el-icon-menu"></i>
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="/post-publish">
          <i class="el-icon-setting"></i>
          <span slot="title">文章发布</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <img :src="user.head_img | fixUrl" alt />
        <div class="nickname">{{user.nickname}}</div>
        <a href="javascript:;" class="logout" @click="logout">退出</a>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    // 退出
    async logout() {
      try {
        await this.$confirm('确认要退出吗', '温馨提示', {
          type: 'warning'
        })
        // 提示退出成功
        this.$message.success('退出成功')
        // 清除本地存储
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.push('/login')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .el-aside {
    background-color: #545c64;
    .title {
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      background-color: #545c64;
      color: white;
    }
    .el-menu {
      text-align: center;
      border-right: none;
    }
  }
  .el-header {
    background-color: #333333;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 60px;
    padding-right: 30px;
    color: white;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .nickname {
      margin: 0 10px;
    }
    a {
      color: orange;
      text-decoration: none;
    }
  }
  .el-main {
    background-color: #e9eef3;
  }
}
</style>
