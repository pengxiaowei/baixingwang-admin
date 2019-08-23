<template>
  <div class="home">
    <el-main>
      <el-form @submit.native.prevent="search">
        <el-form-item>
          <el-input v-model="keyword" style="width:260px"></el-input>
          <el-button type="primary" native-type="subimt">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="sites">
        <el-table-column prop="url" label="链接地址" width="140"></el-table-column>
        <el-table-column prop="keyword" label="关键词" width="140"></el-table-column>
        <el-table-column prop="snapshot_time" label="快照时间" width="120"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="120"></el-table-column>
        <el-table-column prop="status" label="是否收录">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.record === 1">收录</el-tag>
            <el-tag type="info" v-else>未收录</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push('/sites/edit/' + scope.row._id)">编辑</el-button>
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
        :page-sizes="[3,4,6]"
        :page-size="limit"
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
      sites: [],
      page: 1,
      keyword: "",
      limit: 3,
      total: 0
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
        `sites?keyword=${this.keyword}&page=${this.page}&limit=${this.limit}`
      );
      this.sites = res.data.data;
      this.total = res.data.total;
    },
    async remove(row) {
      try {
        await this.$confirm(`是否确认删除"${row.url}"`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      } catch (e) {
        return;
      }
      await this.$http.delete("sites/" + row._id);
      this.$message.success("删除成功!");
      this.fetch();
    },
    async stop(row) {
      await this.$http.put(`sites/${row._id}/no`);
      this.$message.success("禁用成功");
      this.fetch();
    },
    async stopup(row) {
      await this.$http.put(`sites/${row._id}/yes`);
      this.$message.success("启用成功");
      this.fetch();
    }
  },
  created() {
    this.fetch();
  }
};
</script>
