<template>
  <div>
    <h2>{{id?'编辑' : '新建'}}计划</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="url">
        <el-input v-model="plan.url"></el-input>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="plan.keyword"></el-input>
      </el-form-item>
      <el-form-item label="平台">
        <el-radio v-model="plan.platform" label="pc">PC端</el-radio>
        <el-radio v-model="plan.platform" label="mobile">移动端</el-radio>
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
      plan: {}
    };
  },
  methods: {
    async save() {
      // let res;
      if (this.id) {
        await this.$http.put("plans/" + this.id, this.plan);
      } else {
        await this.$http.post("plans", this.plan);
      }
      this.$router.push("/plans/list");
      this.$message.success("保存成功");
    },
    async fetch() {
      const res = await this.$http.get("plans/" + this.id);
      this.plan = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
