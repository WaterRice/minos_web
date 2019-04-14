<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="按ID搜索"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="homeworks" :search="search">
            <template slot="items" slot-scope="props">
              <td class="primary--text">
                <router-link :to="'/teacher/submissions/' + props.item.id">{{ props.item.id}}</router-link>
              </td>
              <td
                class="text-xs-left primary--text"
                v-text="props.item.title.length > 5 ? props.item.title.substring(0,5) + '...' : props.item.title"
              ></td>
              <td class="primary--text text-xs-left">{{ props.item.subject.name}}</td>
              <td
                class="text-xs-left primary--text"
                v-text="new Date(props.item.start).toISOString().substring(0, 10)"
              ></td>
              <td
                class="text-xs-left primary--text"
                v-text="new Date(props.item.end).toISOString().substring(0, 10)"
              ></td>
              <td
                class="text-xs-left primary--text"
                v-text="props.item.end >= new Date().valueOf() ? '进行中' : '已停止'"
              ></td>
              <td class="text-xs-left primary--text">{{ props.item.sum }}</td>
              <v-icon small color="primary" class="mr-2" @click="editItem(props.item)">edit</v-icon>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="error"
              icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="editDialog" persistent max-width="666">
      <v-card>
        <v-container>
          <v-layout justify-center wrap>
            <v-flex md7 style="text-align: center">
              <v-btn flat tile style="font-size: 16px;" color="primary">修改作业信息</v-btn>
            </v-flex>
            <v-flex md7>
              <v-text-field v-model="selectedSub.title" prepend-icon="info" label="作业标题"></v-text-field>
            </v-flex>
            <v-flex md7>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                :return-value.sync="selectedSub.end"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="selectedSub.end"
                  label="截止日期"
                  prepend-icon="event"
                ></v-text-field>
                <v-date-picker v-model="selectedSub.end" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(selectedSub.end)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex md7 style="text-align: center">
              <v-btn color="primary darken-1" flat @click="editDialog = false">取消</v-btn>
              <v-btn color="primary darken-1" flat @click="update">更新</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="msgBar.show" :timeout="3000" top :color="msgBar.color">
      {{msgBar.msg}}
      <v-btn color="white" flat @click="show = false">关闭</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      msgBar: {
        color: null,
        show: false,
        msg: ""
      },
      menu: false,
      editDialog: false,
      search: "",
      headers: [
        {
          text: "作业ID",
          align: "left",
          sortable: true,
          value: "id"
        },
        { text: "作业标题", value: "title" },
        { text: "所属学科", value: "subject.name" },
        { text: "发布时间", value: "start" },
        { text: "截止时间", value: "end" },
        { text: "当前状态", value: "end" },
        { text: "提交数量", value: "sum" }
      ],
      homeworks: [
        {
          id: 0,
          title: "",
          subject: {
            id: 0,
            name: ""
          },
          start: 0,
          end: 0,
          sum: 20
        }
      ],
      selectedSub: {
        id: 0,
        title: "",
        end: ""
      }
    };
  },
  computed: {},
  methods: {
    showMsg(msg, color) {
      this.msgBar.color = color || "primary";
      this.msgBar.msg = msg || "未知错误";
      this.msgBar.show = true;
    },
    editItem(item) {
      this.selectedSub.id = item.id;
      this.selectedSub.title = item.title;
      this.selectedSub.end = new Date(item.end).toISOString().substring(0, 10);
      this.editDialog = true;
    },
    update() {
      for (let homework of this.homeworks) {
        if (homework.id === this.selectedSub.id) {
          homework.title = this.selectedSub.title;
          homework.end = this.selectedSub.end;
          break;
        }
      }
      this.editDialog = false;
      this.showMsg("更新成功", "teal");
    }
  },
  mounted() {
    this.$getRequest("/teacher/publishedHomeworks").then(res => {
      this.homeworks = res.data;
    });
  }
};
</script>

