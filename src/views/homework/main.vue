<template>
  <v-app>
    <home-toolbar></home-toolbar>
    <v-container>
      <v-layout justify-center>
        <v-flex>
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat>常规作业</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="按学科名搜索或任教老师搜索..."
                @keyup.enter="search"
                v-model="kw"
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm3 v-for="(item,index) of selectedHomeworks" :key="item.id">
                  <v-hover>
                    <v-card
                      slot-scope="{ hover }"
                      class="homework-card"
                      :class="`elevation-${hover ? 10 : 2}`"
                    >
                      <v-img :src="imgUrls[index%5]" height="150px"></v-img>
                      <v-card-title primary-title>
                        <div>
                          <router-link
                            :to="'/homework/' + item.id"
                            style="text-decoration-line: none"
                          >
                            <div
                              class="headline primary--text"
                              v-text="item.title.length > 6 ? item.title.substring(0,6) + '...' : item.title"
                            ></div>
                          </router-link>
                          <span
                            class="grey--text"
                            v-text="new Date(item.end).toISOString().substring(0,10)"
                          ></span>
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <div v-if="item.end > new Date().valueOf()">
                          <v-btn flat small fab color="pink" :to="'/homework/' + item.id">go</v-btn>
                        </div>
                        <div v-else>
                          <v-btn flat disabled>已过期</v-btn>
                        </div>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                      <v-slide-y-transition>
                        <v-card-text v-show="item.show" class="grey--text">{{item.notice}}</v-card-text>
                      </v-slide-y-transition>
                    </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
              <div class="text-xs-center">
                <v-pagination v-model="page" :length="length" circle></v-pagination>
              </div>
            </v-container>
          </v-card>
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
      kw: "",
      page: 1,
      homeworks: [],
      imgUrls: [
        "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      ]
    };
  },
  computed: {
    length() {
      return Math.floor((this.homeworks.length - 1) / 8) + 1;
    },
    selectedHomeworks() {
      return this.homeworks.slice(
        (this.page - 1) * 8,
        Math.min(this.page * 8, this.homeworks.length)
      );
    }
  },
  methods: {
    search() {}
  },
  mounted() {
    this.$getRequest("/homeworks")
      .then(res => {
        this.homeworks = res.data;
      })
      .catch(() => {});
  }
};
</script>

<style scoped>
.homework-card {
  margin-left: 30px;
  margin-bottom: 30px;
}
</style>

