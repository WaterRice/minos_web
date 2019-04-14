<template>
  <v-app>
    <home-toolbar></home-toolbar>
    <v-container>
      <v-layout wrap justify-center>
        <v-flex>
          <v-card tile flat>
            <v-card-title class="primary--text" primary-title>题目描述:</v-card-title>
            <v-flex md9>
              <v-card-text v-html="problem.descb"></v-card-text>
            </v-flex>
          </v-card>
          <v-card tile flat>
            <v-card-title class="primary--text" primary-title>输入样例:</v-card-title>
            <v-flex md9>
              <v-card-text v-html="problem.input" style="letter-spacing: 6px"></v-card-text>
            </v-flex>
          </v-card>
          <v-card tile flat>
            <v-card-title class="primary--text" primary-title>输出样例:</v-card-title>
            <v-flex md9>
              <v-card-text v-html="problem.output" style="letter-spacing: 6px"></v-card-text>
            </v-flex>
            <v-card tile flat>
              <v-card-title class="primary--text" primary-title>编辑代码:</v-card-title>
              <v-flex md3>
                <v-select :items="items" label="请选择语言" solo></v-select>
              </v-flex>
              <v-textarea
                rows="20"
                solo
                flat
                label="edit your code here"
                color="white"
                dark
                v-model="code"
              ></v-textarea>
            </v-card>
            <v-container>
              <v-layout>
                <v-flex md3>
                  <v-btn color="primary" class="white--text" @click="submit" :loading="loading">提交</v-btn>
                </v-flex>
                <v-flex md9>
                  <v-btn flat color="orange" to="/board">去瞅瞅榜单:)</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar v-model="msgBar.show" bottom :color="msgBar.color">
      {{msgBar.msg}}
      <v-btn color="white" flat @click="show = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import HomeToolbar from "@/components/HomeToolbar.vue";
export default {
  props: ["id"],
  components: {
    HomeToolbar
  },
  data: () => ({
    msgBar: {
      show: false,
      msg: "",
      color: null
    },
    problem: {
      id: 0,
      title: "",
      content: "",
      input: "",
      output: ""
    },
    code: "",
    items: ["Java", "C++", "C", "Python", "Go"],
    loading: false
  }),
  methods: {
    submit() {
      this.loading = true;
      let _this = this;
      let param = {
        problemId: _this.id,
        content: _this.code,
        language: 0
      };
      this.$postRequest("/student/codesubmissions", param).then(res => {
        if (res.data == true) {
          this.showMsg("正确通过所有样例", "teal");
        } else {
          this.showMsg("未通过所有测试样例", "error");
        }
        this.loading = false;
      });
    },
    showMsg(msg, color) {
      this.msgBar.color = color;
      this.msgBar.msg = msg;
      this.msgBar.show = true;
    }
  },
  mounted() {
    this.$getRequest("/problems/" + this.id).then(res => {
      this.problem = res.data;
    });
  }
};
</script>
