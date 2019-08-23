<template>
  <div class="home">
    <el-main>
      <el-form @submit.native.prevent="search">
        <el-form-item>
          <el-input style="width:260px" v-model="keyword"></el-input>
          <el-button type="primary" native-type="subimt">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="plans">
        <el-table-column prop="url" label="链接地址" width="140"></el-table-column>
        <el-table-column prop="keyword" label="关键字" width="120"></el-table-column>
        <el-table-column prop="platform" label="平台" width="120"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1">启用</el-tag>
            <el-tag type="info" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push('/plans/edit/' + scope.row._id)">编辑</el-button>
            <el-button size="mini" type="info" @click="stop(scope.row)">禁用</el-button>
            <el-button size="mini" type="primary" @click="stopup(scope.row)">启用</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="padding-top:2rem"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="limit"
        :page-sizes="[3,4,6]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-main>
  </div>
</template>

<script>
// import { async } form "q";
export default {
  data() {
    return {
      plans: [],
      page: 1,
      keyword: "",
      total: 0,
      limit: 3
    };
  },
  watch: {
    page() {
      this.fetch();
    }
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val;
      this.fetch();
      console.log(`每页 ${val} 条`);
    },

    async handleCurrentChange(val) {
      console.log(`每 ${val} 条`);
    },

    async search() {
      this.fetch();
    },

    async fetch() {
      const res = await this.$http.get(
        `plans?keyword=${this.keyword}&page=${this.page}&limit=${this.limit}`
      );
      this.plans = res.data.data;
      this.total = res.data.total;
    },
    async remove(row) {
      try {
        await this.$confirm(`是否确认删除"${row.keyword}"`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      } catch (e) {
        return;
      }
      await this.$http.delete("plans/" + row._id);
      this.$message.success("删除成功!");
      this.fetch();
    },
    async stop(row) {
      await this.$http.put(`plans/${row._id}/stop`);
      this.$message.success("禁用成功");
      this.fetch();
    },
    async stopup(row) {
      await this.$http.put(`plans/${row._id}/startup`);
      this.$message.success("启用成功");
      this.fetch();
    }
  },
  created() {
    this.fetch();
  }
};
</script>
