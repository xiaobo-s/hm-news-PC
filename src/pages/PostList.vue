<template>
  <div class="post-list">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table :data="postList">
      <el-table-column :index="indexMethod" label="序号" type="index"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="作者" prop="user.nickname"></el-table-column>
      <el-table-column label="创建时间">
        <template v-slot:default="obj">{{ obj.row.create_date | time }}</template>
      </el-table-column>
      <el-table-column label="封面">
        <template v-slot:default="obj">
          <img :src="obj.row.cover[0].url | fixUrl" alt />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" plain size="small">编辑</el-button>
        <el-button type="danger" plain size="small">删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total,sizes,prev,pager,next,jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 4,
      total: 0
    }
  },
  created() {
    this.getPostList()
  },
  methods: {
    // 发送请求获取文章列表
    async getPostList() {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data, total } = res.data
      if (statusCode === 200) {
        this.postList = data
        this.total = total
        // console.log(this.total)
        // console.log(this.postList)
      }
    },
    // 修改每页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.pageIndex - 1
      this.getPostList()
    },
    // 页面变化时,触发
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getPostList()
    },
    // 控制序号
    indexMethod(index) {
      // 序号要加上前面页数的总条数
      return (this.pageIndex - 1) * this.pageSize + index + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
  img {
    width: 120px;
    height: 70px;
    object-fit: cover;
  }
}
</style>
