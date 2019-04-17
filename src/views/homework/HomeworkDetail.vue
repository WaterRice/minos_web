<template>
  <v-app>
    <home-toolbar></home-toolbar>
    <v-container>
      <v-layout warp justify-center>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">作业内容</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">作业要求</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">提交作业</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-5" color="lighten-1" width="887" height="300">
                <div v-text="homework.descb"></div>
              </v-card>

              <v-btn color="primary" @click="e1 = 2">下一步</v-btn>

              <v-btn flat>上一页</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-5" color="lighten-1" width="887" height="300">
                <div v-html="homework.repu"></div>
              </v-card>

              <v-btn color="primary" @click="e1 = 3">下一步</v-btn>

              <v-btn flat @click="e1 = 1">上一页</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-5" color="lighten-1">
                <div id="app">
                  <vue-editor v-model="content"></vue-editor>
                </div>
              </v-card>

              <!-- <v-btn
            color="primary"
            @click="e1 = 1"
          >
            提交
              </v-btn>-->
              <v-btn
                :loading="loading3"
                :disabled="loading3"
                color="blue-grey"
                class="white--text"
                @click="upload"
              >
                提交
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>

              <v-btn flat @click="e1 = 2">上一页</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-layout>
    </v-container>
    <v-snackbar v-model="msgBar.show" :timeout="3000" top :color="msgBar.color">
      {{msgBar.msg}}
      <v-btn color="white" flat @click="show = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import HomeToolbar from "@/components/HomeToolbar.vue";
import { VueEditor } from "vue2-editor";
export default {
  props: ["id"],
  components: {
    HomeToolbar,
    VueEditor
  },
  data: () => ({
    msgBar: {
      show: false,
      color: null,
      msg: ""
    },
    e1: 0,
    loading3: false,
    content: "",
    homework: {
      descb: "",
      repu: ""
    }
  }),
  methods: {
    upload() {
      this.loading3 = true;
      let _this = this;
      let param = {
        homeworkId: parseInt(_this.id),
        content: _this.content
      };
      this.$postRequest("/student/submissions", param)
        .then(res => {
          if (res.data == true) this.showMsg("作业上传成功", "teal");
          else this.showMsg("作业上传失败", "error");
          this.loading3 = false;
        })
        .catch(() => {
          this.loading3 = false;
        });
    },
    showMsg(msg, color) {
      this.msgBar.color = color;
      this.msgBar.msg = msg;
      this.msgBar.show = true;
    }
  },
  mounted() {
    this.$getRequest("/homeworks/" + this.id).then(res => {
      this.homework = res.data;
    });
  }
};
</script>

