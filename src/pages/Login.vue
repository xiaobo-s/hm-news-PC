<template>
  <div class="login">
    <el-form status-icon :rules="rules" ref="form" :model="form" label-width="80px">
      <img class="logo" src="~assets/02.jpg" alt />
      <el-form-item label="账号" prop="username">
        <el-input placeholder="请输入账号" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login" class="login-btn" type="primary">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // 校验规则
      rules: {
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: ['change', 'blur']
          },
          {
            pattern: /^1\d{4,10}$/,
            message: '账号必须是1开头的5-11位的数字',
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^\w{3,11}$/,
            message: '密码必须是3-11位的字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    // 重置
    reset() {
      this.$refs.form.resetFields()
    },
    // 登录
    async login() {
      try {
        await this.$refs.form.validate()
        const res = await this.$axios.post('/login', this.form)
        const { statusCode, message, data } = res.data
        if (statusCode === 200) {
          // 提示用户登录成功
          this.$message.success(message)
          // 存储token
          localStorage.setItem('token', data.token)
          // 存储个人信息
          localStorage.setItem('user', JSON.stringify(data.user))
          // 跳转到首页
          this.$router.push('/')
        } else {
          this.$message.error(message)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  .el-form {
    width: 400px;
    padding: 70px 70px 20px 20px;
    border: 5px solid #ccc;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 200px;
    position: relative;
    .logo {
      position: absolute;
      top: -80px;
      left: 50%;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      transform: translateX(-50%);
      border: 5px solid orange;
    }
    .login-btn {
      margin-right: 60px;
    }
  }
}
</style>
