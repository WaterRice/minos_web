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
                  <h4 class="flex my-4 primary--text">成为MINOS一员</h4>
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
                  <v-text-field
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required,rules.min,rules.max]"
                    :type="show2 ? 'text' : 'password'"
                    name="confirm"
                    label="确认密码"
                    v-model="cpassword"
                    @click:append="show2 = !show2"
                  ></v-text-field>
                  <v-text-field
                    append-icon="email"
                    :rules="[rules.required,rules.min,rules.max]"
                    name="email"
                    label="邮箱"
                    type="text"
                    v-model="model.email"
                  ></v-text-field>
                  <!-- <v-switch v-model="model.type" :label="name"></v-switch> -->
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
                >注册</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar v-model="msgBar.show" :timeout="3600" top :color="msgBar.color">
      {{msgBar.msg}}
      <v-btn color="white" flat @click="msgBar.show = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
const ERROR_COLOR = "red accent-1";
const INVALID_INPUT = "必填字段不能为空!";
const SUCCESS_COLOR = "teal";
const SUCCESS_TIP = "感谢注册,欢迎成为MINOS的一员:)";

export default {
  data: () => ({
    msgBar: {
      show: false,
      color: null,
      msg: ""
    },
    show2: false,
    cpassword: "",
    model: { acount: "", password: "", email: "" },
    loading: false,
    rules: {
      required: value => !!value || "必填字段",
      min: v => v.length >= 6 || "长度不得小于6个字符",
      max: v => v.length <= 18 || "长度不得大于18个字符"
      //confirm: v => v === this.model.password || "密码不一致"
    }
  }),
  computed: {
    name() {
      return this.model.type ? "学生" : "教师";
    }
  },
  methods: {
    login() {
      //const INCORRECT_PASSWORD = '账号或密码错误!';
      if (this.Validate()) {
        this.loading = true;
        this.$postRequest("/student/tokens", this.model).then(res => {
          if (!res.data.status) {
            this.showMsg("账号或密码错误", ERROR_COLOR);
            this.loading = false;
          } else {
            this.loading = false;
            localStorage.setItem("Authorization", res.headers["Authorization"]);
            this.showMsg(SUCCESS_TIP, SUCCESS_COLOR);
            this.$router.push("/home");
          }
          
        });
      } else {
        this.showMsg(INVALID_INPUT, ERROR_COLOR);
      }
    },
    Validate() {
      return this.model.acount === "" ||
        this.model.password === "" ||
        this.model.email === ""
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
  background-image: url("https://picsum.photos/500/300?image=20");
  background-repeat: unset;
}
</style>

