<template>
import { setTimeout } from 'timers';
import { timeout } from 'q';
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
                    name="login"
                    label="账号"
                    type="text"
                    v-model="model.acount"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="密码"
                    id="password"
                    type="password"
                    v-model="model.password"
                  ></v-text-field>
                  <v-switch v-model="model.type" :label="name"></v-switch>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar v-model="msg" :timeout="2000" top color="pink">
      {{msg}}
      <v-btn color="pink" flat @click="successBar = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    msg: '',
    model: { acount: "", password: "", type: true },
    loading: false
  }),
  computed: {
    name() {
      return this.model.type ? "学生" : "教师";
    }
  },
  methods: {
    login() {
      if(this.validate()) {
        setTimeout(() => this.loading = true, 2000);
      }
    },
    validate() {
      if(this.model.acount === '' && this.model.password === '') {
        return false;
      }
      return true;
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
  background-image: url("../assets/300.jpg");
  background-repeat: unset;
}
</style>

