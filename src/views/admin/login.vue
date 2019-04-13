<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">MINOS</h1>
                  <h4 class="flex my-4 primary--text">by WingsOfHope</h4>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    :rules="[rules.required,rules.min,rules.max]"
                    name="login"
                    label="账号"
                    type="text"
                    v-model="model.acount"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    :rules="[rules.required,rules.min,rules.max]"
                    name="password"
                    label="密码"
                    id="password"
                    type="password"
                    v-model="model.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  block
                  color="primary"
                  @click="login"
                  :loading="loading"
                  :disabled="loading"
                >登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar v-model="msgBar.show" :timeout="3000" top :color="msgBar.color">
      {{msgBar.msg}}
      <v-btn color="white" flat @click="show = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
const ERROR_COLOR = "red accent-1";
const SUCCESS_COLOR = "teal";
const INVALID_ACOUNT_PASSWORD = "用户名或密码不能为空!";
const SUCCESS_TIP = "欢迎登入MINOS作业管理系统";
export default {
  data: () => ({
    msgBar: {
      color: null,
      show: false,
      msg: ""
    },
    model: { acount: "", password: "", type: true },
    loading: false,
    rules: {
      required: value => !!value || "必填字段",
      min: v => v.length >= 6 || "长度不得小于6个字符",
      max: v => v.length <= 18 || "长度不得大于18个字符"
      //confirm: v => v === this.model.password || "密码不一致"
    }
  }),
  methods: {
    login() {
      //const INCORRECT_PASSWORD = '账号或密码错误!';
      if (this.validate()) {
        this.loading = true;
        const url = "/admin/token";
        const target = "/admin/subjectManagement";
        this.$postRequest(url, this.model)
          .then(res => {
            if (res.data == null) {
              this.showMsg("账号或密码错误", ERROR_COLOR);
            } else {
              console.log(res.headers.toString());
              localStorage.setItem(
                "Authorization",
                res.headers["Authorization"]
              );
              this.loading = false;
              this.showMsg(SUCCESS_TIP, SUCCESS_COLOR);
              this.$router.push(target);
            }
          })
          .catch(() => {
            this.showMsg("网络错误", ERROR_COLOR);
          });
      } else {
        this.showMsg(INVALID_ACOUNT_PASSWORD, ERROR_COLOR);
      }
    },
    validate() {
      return this.model.acount === "" || this.model.password === ""
        ? false
        : true;
    },
    showMsg(msg, color) {
      this.msgBar.color = color;
      this.msgBar.msg = msg;
      this.msgBar.show = true;
    }
  }
};
</script>

<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
  background-image: url("../../assets/300.jpg");
  background-repeat: unset;
}
</style>

