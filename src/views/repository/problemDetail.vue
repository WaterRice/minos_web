<template>
  <v-app>
    <home-toolbar></home-toolbar>
    <v-container>
      <v-layout wrap justify-center>
        <v-flex>
          <v-card tile flat>
            <v-card-title class="primary--text" primary-title>题目描述:</v-card-title>
            <v-flex md9>
              <v-card-text v-html="problem.content"></v-card-text>
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
              <v-layout justify-center>
                <v-btn color="pink" class="white--text" @click="submit">提交</v-btn>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
    problem: {
      id: 1001,
      title: "a+b",
      content: "计算a+b的值",
      input: "7 8",
      output: "15"
    },
    code: "",
    items: ["Java", "C++", "C", "Python", "Go"]
  }),
  methods: {
    submit() {
      console.log(this.code);
    }
  }
};
</script>
