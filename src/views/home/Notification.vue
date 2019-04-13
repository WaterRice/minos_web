<template>
  <v-app>
    <v-container>
      <v-layout wrap row>
        <v-flex md8>
          <v-card flat>
            <v-list three-line>
              <template v-for="(item, index) in items">
                <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                <v-list-tile v-else :key="item.title" avatar>
                  <v-list-tile-avatar>
                    <img :src="item.avatar">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex md3>
          <v-container>
            <v-layout wrap>
              <v-flex md12>
                <v-card flat>
                  <v-img src="https://picsum.photos/500/300?image=20" aspect-ratio="1.75"></v-img>
                  <v-card-title primary-title>
                    <div>
                      <h4 class="mb-0">Leetcode杯算法竞赛又开始啦</h4>
                      <div>带上你的小伙伴,与群雄一决雌雄!奖品多多,快上车...</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange">分享</v-btn>
                    <v-btn flat color="orange" href="/competition">前往</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <br>
              <br>
              <v-flex>
                <v-card flat>
                  <v-img src="https://picsum.photos/500/300?image=25" aspect-ratio="1.75"></v-img>
                  <v-card-title primary-title>
                    <div>
                      <h4 class="mb-0">Leetcode杯算法竞赛又开始啦</h4>
                      <div>带上你的小伙伴,与群雄一决雌雄!奖品多多,快上车...</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange">分享</v-btn>
                    <v-btn flat color="orange" href="/competition">前往</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex>
                <v-card flat>
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" aspect-ratio="1.75"></v-img>
                  <v-card-title primary-title>
                    <div>
                      <h4 class="mb-0">Leetcode杯算法竞赛又开始啦</h4>
                      <div>带上你的小伙伴,与群雄一决雌雄!奖品多多,快上车...</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange">分享</v-btn>
                    <v-btn flat color="orange" href="/competition">前往</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
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
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "publish poster",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
  }),
  mounted() {
    //this.$getRequest("/notification/latestNews").then(res => {});
  }
};
</script>

