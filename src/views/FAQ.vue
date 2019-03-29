<template>
  <v-app>
    <home-toolbar></home-toolbar>
    <v-container>
      <v-layout justify-center>
        <v-flex>
          <v-timeline>
            <v-timeline-item color="red lighten-2" large>
              <template v-slot:opposite>
                <span>可以选用其他的编程语言吗?</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">目前可用语言</v-card-title>
                <v-card-text>由于技术实力原因,目前仅支持JAVA语言,后续慢慢增加对其他主流语言的支持,(MINOS小组表示已菜哭</v-card-text>
              </v-card>
            </v-timeline-item>
            <v-timeline-item color="red lighten-2" large>
              <template v-slot:opposite>
                <span>后台JDK版本是多少?</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">后端JDK环境</v-card-title>
                <v-card-text>当前是oracle jdk-8u12,这意味着你只可以写不高于这个版本的java程序</v-card-text>
              </v-card>
            </v-timeline-item>
            <v-timeline-item color="red lighten-2" large>
              <template v-slot:opposite>
                <span>我该怎么组织java代码呢?</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">代码模板</v-card-title>
                <v-card-text>
                  <code class="java">
                    import ... //导入你需要的包
                    public void main(String[] args) {
                    Scanner scanner = new Scanner(System.in);
                    // do something
                    }
                  </code>
                </v-card-text>
              </v-card>
            </v-timeline-item>
            <v-timeline-item color="red lighten-2" large>
              <template v-slot:opposite>
                <span>发现bug怎么办?</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">bug提交</v-card-title>
                <v-card-text>
                  作者: 2534543027@qq.com,或者在
                  <a src>这里</a>提issue.
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import HomeToolbar from "@/components/HomeToolbar.vue";
export default {
  components: {
    HomeToolbar
  },
  data: () => ({
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
  })
};
</script>

