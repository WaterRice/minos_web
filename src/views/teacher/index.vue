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
              <td class="primary--text">{{ props.item.homework_id}}</td>
              <td
                class="text-xs-left primary--text"
                v-text="props.item.title.length > 5 ? props.item.title.substring(0,5) + '...' : props.item.title"
              ></td>
              <td class="primary--text text-xs-left">{{ props.item.subject}}</td>
              <td
                class="text-xs-left primary--text"
                v-text="new Date(props.item.from).toISOString().substring(0, 10)"
              ></td>
              <td
                class="text-xs-left primary--text"
                v-text="new Date(props.item.to).toISOString().substring(0, 10)"
              ></td>
              <td
                class="text-xs-left primary--text"
                v-text="props.item.to >= new Date().valueOf() ? '进行中' : '已停止'"
              ></td>
              <td class="text-xs-left primary--text">{{ props.item.submissions }}</td>
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
                :return-value.sync="selectedSub.to"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="selectedSub.to"
                  label="截止日期"
                  prepend-icon="event"
                ></v-text-field>
                <v-date-picker v-model="selectedSub.to" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(selectedSub.to)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <!-- <v-flex md7>
              <v-text-field v-model="selectedSub.descb" label="作业描述" prepend-icon="help"></v-text-field>
            </v-flex>
            <v-flex md7>
              <v-text-field v-model="selectedSub.repu" label="作业要求" prepend-icon="mdi-mouse"></v-text-field>
            </v-flex>-->
            <v-flex md7 style="text-align: center">
              <v-btn color="primary darken-1" flat @click="editDialog = false">取消</v-btn>
              <v-btn color="primary darken-1" flat @click="update">更新</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      editDialog: false,
      search: "",
      headers: [
        {
          text: "作业ID",
          align: "left",
          sortable: true,
          value: "homework_id"
        },
        { text: "作业标题", value: "title" },
        { text: "所属学科", value: "subject" },
        { text: "发布时间", value: "from" },
        { text: "截止时间", value: "to" },
        { text: "当前状态", value: "to" },
        { text: "提交数量", value: "submissions" }
      ],
      homeworks: [
        {
          homework_id: 10001,
          title: "第一次作业",
          subject: "高等数学",
          from: 1544201374340,
          to: 1554207656107,
          submissions: 38
        },
        {
          homework_id: 10011,
          title: "第二次作业",
          subject: "线性代数",
          from: 1544201371340,
          to: 1564207656107,
          submissions: 10
        },
        {
          homework_id: 10003,
          title: "第三次作业----非常快乐版",
          subject: "抽象代数",
          from: 1544201374340,
          to: 1554207656107,
          submissions: 38
        },
        {
          homework_id: 10006,
          title: "第四次作业",
          subject: "计算几何",
          from: 1544201372340,
          to: 1554219656107,
          submissions: 28
        }
      ],
      selectedSub: {
        homework_id: 0,
        title: "",
        to: ""
      }
    };
  },
  computed: {},
  methods: {
    editItem(item) {
      this.selectedSub.homework_id = item.homework_id;
      this.selectedSub.title = item.title;
      this.selectedSub.to = new Date(item.to).toISOString().substring(0, 10);
      this.editDialog = true;
    },
    update() {
      for (let homework of this.homeworks) {
        if (homework.homework_id === this.selectedSub.homework_id) {
          homework.title = this.selectedSub.title;
          homework.to = this.selectedSub.to;
          break;
        }
      }
      this.editDialog = false;
    }
  }
};
</script>

