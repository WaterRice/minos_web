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
                <v-flex xs12 sm3 v-for="item of selectedHomeworks" :key="item.hid">
                  <v-hover>
                    <v-card
                      slot-scope="{ hover }"
                      class="homework-card"
                      :class="`elevation-${hover ? 10 : 2}`"
                    >
                      <v-img :src="item.imgUrl" height="150px"></v-img>
                      <v-card-title primary-title>
                        <div>
                          <router-link
                            :to="'/home/homework/' + item.hid"
                            style="text-decoration-line: none"
                          >
                            <div class="headline primary--text">{{item.title}}</div>
                          </router-link>
                          <span
                            class="grey--text"
                            v-text="new Date(item.pubTime).toISOString().substring(0,10)"
                          ></span>
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <div v-if="item.disabled">
                          <v-btn flat small fab color="pink" :to="'/home/homework/' + item.hid">go</v-btn>
                          <v-btn flat small fab color="pink" @click="plan(item.title)">plan</v-btn>
                        </div>
                        <div v-else>
                          <v-btn flat disabled>已过期</v-btn>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="item.show = !item.show">
                          <v-icon>{{ item.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        </v-btn>
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
      homeworks: [
        {
          hid: 1,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
          title: "数据结构",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 2,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          title: "数学分析",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 3,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          title: "计算机网络",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 4,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          title: "操作系统",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 5,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          title: "数理统计",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 6,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          title: "算法设计",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 7,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
          title: "抽象代数",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 8,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          title: "组合数学",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 11,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
          title: "数据结构2",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 12,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          title: "数学分析2",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 13,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          title: "计算机网络2",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 14,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          title: "操作系统2",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 15,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          title: "数理统计2",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 16,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          title: "算法设计2",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 17,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
          title: "抽象代数2",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        },
        {
          hid: 18,
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          title: "组合数学2",
          pubTime: new Date().toISOString().substring(0, 10),
          notice:
            "奉天承运,皇帝诏曰: 请同学们尽快交上数据结构作业,截至时间是12月23日.过期的一概拒收,成绩按照零分处置.钦此!",
          show: false
        }
      ]
    };
  },
  computed: {
    length() {
      return Math.floor((this.homeworks.length - 1) / 8) + 1;
      // return 4;
    },
    selectedHomeworks() {
      return this.homeworks.slice(
        (this.page - 1) * 8,
        Math.min(this.page * 8, this.homeworks.length)
      );
    }
  },
  methods: {
    search() {
      console.log(this.kw);
    }
  }
};
</script>

<style scoped>
.homework-card {
  margin-left: 30px;
  margin-bottom: 30px;
}
</style>

