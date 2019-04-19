<template>
  <v-app>
    <v-container>
      <v-layout wrap row>
        <v-flex md8>
          <v-card flat>
            <v-list three-line>
              <v-subheader>TODAY</v-subheader>
              <template v-for="(item, index) in items">
                <v-divider :key="index" inset></v-divider>

                <v-list-tile :key="item.title" avatar>
                  <v-list-tile-avatar>
                    <img
                      src="https://static.leetcode-cn.com/cn-legacy-assets/images/LeetCode_Cup.png"
                    >
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title
                      v-text="item.title + ' --- ' + new Date(item.time).toLocaleString()"
                    ></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.content"></v-list-tile-sub-title>
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
      {
        id: 0,
        title: "",
        content: "",
        time: 0
      }
    ]
  }),
  mounted() {
    this.$getRequest("/notification/latestNews").then(res => {
      this.items = res.data;
    });
  }
};
</script>

