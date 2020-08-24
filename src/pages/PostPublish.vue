<template>
  <div class="post-publish">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="40px">
      <el-form-item label="标题">
        <el-input v-model="form.title" class="title-input" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <!-- 发布文章 -->
        <vue-editor v-model="form.content" v-if="form.type === 1"></vue-editor>
        <!-- 发布视频 -->
        <el-input v-model="form.content" v-if="form.type === 2" placeholder="请输入视频地址"></el-input>
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox
            v-for="item in categoryList"
            :key="item.id"
            :label="item.id"
            :disabled="item.id === 999"
          >{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :action="'/upload' | fixUrl"
          :headers="headers"
          name="file"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <!-- 单选框 -->
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      categoryList: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created() {
    this.getategoryList()
  },
  methods: {
    // 获取栏目
    async getategoryList() {
      const res = await this.$axios.get('/category')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.categoryList = data
      }
    },
    // 上传成功时
    handleSuccess(response) {
      // console.log(reponse)
      const { statusCode, data } = response
      if (statusCode === 200) {
        this.form.cover.push({
          id: data.id
        })
        // console.log(this.form.cover)
      }
    },
    // 删除图片
    handleRemove(file) {
      const id = file.response.data.id
      this.form.cover = this.form.cover.filter((item) => item.id !== id)
    },
    // 发布文章
    async publish() {
      // 对数据进行格式处理
      const data = { ...this.form }
      data.categories = data.categories.map((item) => {
        return {
          id: item
        }
      })
      const res = await this.$axios.post('/post', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$message.success(message)
        this.$router.push('/post-list')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-publish {
  .el-form {
    margin-top: 20px;
    .title-input {
      width: 400px;
    }
  }
}
</style>
<style lang="scss">
.post-publish {
  .ql-editor {
    background-color: rgb(208, 228, 236);
  }
}
</style>
