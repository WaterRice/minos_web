<template>
  <v-container>
    <v-layout wrap>
      <v-flex md7>
        <v-select
          :items="subjects"
          label="请选择课程"
          item-value="id"
          item-text="name"
          :rules="[rules.required]"
          v-model="homework.subjectId"
        ></v-select>
      </v-flex>
      <v-flex md7>
        <v-text-field label="作业标题" v-model="homework.title" :rules="[rules.required,rules.max10]"></v-text-field>
      </v-flex>
      <v-flex md7>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="homework.end"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="homework.end"
            label="截止日期"
            :rules="[rules.required]"
          ></v-text-field>
          <v-date-picker v-model="homework.end" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(homework.end)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md7>
        <v-textarea
          label="作业内容"
          v-model="homework.descb"
          hint="编写作业内容"
          :rules="[rules.required,rules.max300]"
        ></v-textarea>
      </v-flex>
      <v-flex md7>
        <v-textarea
          label="作业要求"
          v-model="homework.repu"
          hint="编写作业要求"
          :rules="[rules.required,rules.max300]"
        ></v-textarea>
      </v-flex>
      <br>
      <br>
      <v-flex md7 style="text-align: center">
        <v-btn tile color="primary" @click="submit">提交</v-btn>
      </v-flex>
      <v-snackbar v-model="msgBar.show" :timeout="3000" top :color="msgBar.color">
        {{msgBar.msg}}
        <v-btn color="white" flat @click="show = false">关闭</v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    msgBar: {
      color: null,
      show: false,
      msg: ""
    },
    homework: {
      title: "",
      descb: "",
      repu: "",
      end: "",
      subjectId: 0
    },
    menu: false,
    subjects: [],
    rules: {
      required: v => !!v || "必填字段",
      max10: v => v.length <= 10 || "不得超过10个字符",
      max300: v => v.length <= 300 || "不得超过300个字符"
    }
  }),
  methods: {
    showMsg(msg, color) {
      this.msgBar.color = color || "primary";
      this.msgBar.msg = msg || "未知错误";
      this.msgBar.show = true;
    },
    submit() {
      let h = {
        title: this.homework.title,
        descb: this.homework.descb,
        repu: this.homework.repu,
        end: new Date(this.homework.end).valueOf(),
        subjectId: this.homework.subjectId
      };
      this.$postRequest("/teacher/homeworks", h).then(res => {
        if (res.data) {
          this.showMsg("发布成功", "teal");
        } else {
          this.showMsg("发布失败", "error");
        }
      });
    }
  },
  mounted() {
    this.$getRequest("/teacher/subjects").then(res => {
      this.subjects = res.data;
    });
  }
};
</script>

