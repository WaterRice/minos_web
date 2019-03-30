<template>
  <v-toolbar>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>MINOS</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat href="/home" color="indigo">首页</v-btn>
      <v-btn flat href="/homework" color="indigo">作业</v-btn>
      <v-btn flat href="/repository" color="indigo">题库</v-btn>
      <v-btn flat href="/competition" color="indigo">竞赛</v-btn>
      <v-btn flat href="/community" color="indigo">社区</v-btn>
      <v-btn flat href="/FAQ" color="indigo">FAQ</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-menu :nudge-width="100">
      <template v-slot:activator="{ on }">
        <v-toolbar-title v-on="on">
          <v-btn icon>
            <v-icon>person</v-icon>
          </v-btn>
        </v-toolbar-title>
      </template>
      <v-list>
        <v-list-tile v-for="item in menus" :key="item.name">
          <!-- <v-list-tile-title @click="go(item.link)">{{item.name}}</v-list-tile-title> -->
          <v-btn flat :href="item.link">{{item.name}}</v-btn>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    menus: [
      { name: "登录", link: "/login" },
      { name: "注册", link: "/register" }
      //{name: '个人资料', link: '/'}
      //{name: '退出', link: ''}
    ]
  }),
  methods: {}
};
</script>
