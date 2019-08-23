<template>
  <div>
    <h2>{{id?'编辑' : '新建'}}站点</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="url">
        <el-input v-model="site.url"></el-input>
      </el-form-item>

       <el-form-item label="关键词">
        <el-input v-model="site.keyword"></el-input>
      </el-form-item>

      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="site.snapshot_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="site.snapshot_time" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="subimt">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      site: {}
    };
  },
  methods: {
    async save() {
      // let res;
      if (this.id) {
        await this.$http.put("sites/" + this.id, this.site);
      } else {
        await this.$http.post("sites", this.site);
      }
      this.$router.push("/sites/list");
      this.$message.success("保存成功");
    },
    async fetch() {
      const res = await this.$http.get("sites/" + this.id);
      this.site = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
