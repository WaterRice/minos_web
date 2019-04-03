<template>
  <v-app id="inspire">
    <div class="text-xs-center">
      <v-dialog v-model="dialog2" width="300">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>确认登出吗?</v-card-title>
          <v-card-text class="primary--text">感谢使用,祝您生活愉快!</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink" flat @click="out">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="item in items">
          <v-list-tile :key="item.text" :to="'/teacher' + item.link" append>
            <v-list-tile-action>
              <v-icon color="primary">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="primary--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="primary">arrow_back</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="dialog2 = true">
            <v-list-tile-title class="primary--text">系统登出</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="indigo darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">MINOS</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view @plan="handlePlan"/>
      </v-container>
    </v-content>
    <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="600px">
      <v-container style="max-width: 600px;background-color: #fff">
        <v-text-field v-model="task" label="What are you working on?" solo @keydown.enter="create">
          <v-fade-transition slot="append">
            <v-icon v-if="task" @click="create">add_circle</v-icon>
          </v-fade-transition>
        </v-text-field>
        <h2 class="display-1 info--text pl-3">
          今日任务:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
          </v-fade-transition>
        </h2>
        <v-divider class="mt-3"></v-divider>
        <v-layout my-1 align-center>
          <strong class="mx-3 error--text text--darken-3">未完成: {{ remainingTasks }}</strong>
          <v-divider vertical></v-divider>
          <strong class="mx-3 primary--text">已完成: {{ completedTasks }}</strong>
          <v-spacer></v-spacer>
          <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
        </v-layout>
        <v-divider class="mb-3"></v-divider>
        <v-card v-if="tasks.length > 0">
          <v-slide-y-transition class="py-0" group>
            <template v-for="(task, i) in tasks">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
              <v-list-tile :key="`${i}-${task.text}`">
                <v-list-tile-action>
                  <v-checkbox v-model="task.done" color="info darken-3">
                    <div
                      slot="label"
                      :class="task.done && 'grey--text' || 'text--primary'"
                      class="ml-3"
                      v-text="task.text"
                    ></div>
                  </v-checkbox>
                </v-list-tile-action>
                <v-spacer></v-spacer>
                <v-scroll-x-transition>
                  <v-icon v-if="task.done" color="success">check</v-icon>
                </v-scroll-x-transition>
              </v-list-tile>
            </template>
          </v-slide-y-transition>
        </v-card>
      </v-container>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dialog2: false,
    dialog: false,
    drawer: null,
    items: [
      { icon: "home", text: "首页面板", link: "" },
      { icon: "history", text: "发布作业", link: "/publish" },
      { icon: "settings", text: "系统设置", link: "/settings" },
      { icon: "help", text: "FAQ", link: "/help" }
    ],
    tasks: [
      {
        done: false,
        text: "批改数据结构作业"
      },
      {
        done: false,
        text: "布置一些作业"
      }
    ],
    task: null
  }),
  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    }
  },
  methods: {
    dosomething() {},
    handlePlan() {
      this.dialog = true;
    },
    out() {
      this.dialog2 = false;
      this.$router.push("/login");
    },
    create() {
      this.tasks.push({
        done: false,
        text: this.task
      });

      this.task = null;
    }
  },
  props: {
    source: String
  }
};
</script>