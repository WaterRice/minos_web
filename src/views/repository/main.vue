<template>
  <v-app>
    <home-toolbar/>
    <v-container>
      <v-layout wrap>
        <v-flex md7>
          <v-card flat>
            <v-container>
              <v-layout justify-center>
                <v-text-field
                  append-icon="search"
                  label="按ID或题目查询"
                  @keyup.enter="search"
                  v-model="id"
                ></v-text-field>
              </v-layout>
            </v-container>
            <v-list>
              <v-list-tile v-for="(problem, index) of selectedProblems" :key="problem.id">
                <v-list-tile-content>
                  <v-btn
                    flat
                    :to="'/problem/' + problem.id"
                    :color="COLOR[index%12]"
                  >{{problem.id}}.{{problem.title}}</v-btn>
                </v-list-tile-content>
                <v-list-tile-action v-for="i of problem.complex" :key="i">
                  <v-icon :color="COLOR[index%12]">star</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <br>
              <v-divider></v-divider>
            </v-list>
            <br>
            <br>
            <v-container>
              <v-layout justify-center>
                <v-pagination v-model="page" :length="length" circle></v-pagination>
              </v-layout>
            </v-container>
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
import HomeToolbar from "@/components/HomeToolbar.vue";

export default {
  components: {
    HomeToolbar
  },
  data() {
    return {
      id: "",
      page: 1,
      problems: [],
      COLOR: [
        "red lighten-2",
        "yellow lighten-2",
        "purple lighten-2",
        "indigo lighten-2",
        "light-blue lighten-2",
        "teal lighten-2",
        "green lighten-2",
        "lime lighten-2",
        "deep-orange lighten-2",
        "pink lighten-2",
        "blue lighten-2",
        "cyan lighten-2"
      ]
    };
  },
  computed: {
    length() {
      return Math.floor((this.problems.length - 1) / 25) + 1;
    },
    selectedProblems() {
      return this.problems.slice(
        (this.page - 1) * 20,
        Math.min(this.page * 20, this.problems.length)
      );
    }
  },
  methods: {
    search() {
      console.log(parseInt(this.id));
    }
  },
  mounted() {
    this.$getRequest("/problems").then(res => {
      this.problems = res.data;
    });
  }
};
</script>
