<template>
  <v-container>
    <v-layout justify-center wrap>
      <v-flex>
        <v-card>
          <v-card-title>
            <v-btn flat color="primary" :href="'/teacher/grades/' + id">导出成绩</v-btn>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="按ID搜索"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="submissions" :search="search">
            <template slot="items" slot-scope="props">
              <td class="primary--text">{{ props.item.student.id}}</td>
              <td
                class="text-xs-left primary--text"
                v-text="props.item.student.name.length > 5 ? props.item.student.name.substring(0,5) + '...' : props.item.student.name"
              ></td>
              <td
                class="text-xs-left primary--text"
                v-text="new Date(props.item.time).toISOString().substring(0, 10)"
              ></td>
              <td class="primary--text text-xs-left">{{ props.item.grade}}</td>
              <v-icon small color="primary" class="mr-2" @click="editItem(props.item)">edit</v-icon>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="error"
              icon="warning"
            >没有找到 "{{ search }}" 这个同学的作业</v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="editDialog" persistent max-width="888">
      <v-card>
        <v-card-title class="headline">评分</v-card-title>
        <v-card-text v-html="selectedSubmission.content"></v-card-text>
        <v-card-actions>
          <v-text-field v-model="selectedSubmission.grade" label="分数"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click="editDialog = false">取消</v-btn>
          <v-btn color="primary darken-1" flat @click="update">提交</v-btn>
        </v-card-actions>
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
  props: ["id"],
  data: () => ({
    msgBar: {
      color: null,
      show: false,
      msg: ""
    },
    editDialog: false,
    search: "",
    headers: [
      {
        text: "学生ID",
        align: "left",
        sortable: true,
        value: "student.id"
      },
      { text: "学生姓名", value: "student.name" },
      { text: "提交时间", value: "time" },
      { text: "所评成绩", value: "grade" }
    ],
    submissions: [
      {
        id: 1,
        student: {
          id: 10002,
          name: "赵敏"
        },
        time: 15557896639,
        grade: 100
      }
    ],
    selectedSubmission: {
      id: 0,
      student: {
        id: 0,
        name: ""
      },
      time: 0,
      grade: 0,
      content: ""
    }
  }),
  methods: {
    showMsg(msg, color) {
      this.msgBar.color = color || "primary";
      this.msgBar.msg = msg || "未知错误";
      this.msgBar.show = true;
    },
    editItem(item) {
      this.selectedSubmission.id = item.id;
      this.selectedSubmission.grade = item.grade;
      this.selectedSubmission.time = item.time;
      this.selectedSubmission.student.id = item.student.id;
      this.selectedSubmission.student.name = item.student.name;
      this.$getRequest("/teacher/submissions/" + item.id).then(res => {
        this.selectedSubmission.content = res.data.content;
        this.editDialog = true;
      });
    },
    update() {
      let _this = this;
      this.$putRequest("/teacher/submissions/" + this.selectedSubmission.id, {
        grade: parseInt(_this.selectedSubmission.grade)
      }).then(res => {
        if (res.data) {
          for (let tmp of this.submissions) {
            if (this.selectedSubmission.id === tmp.id) {
              tmp.grade = this.selectedSubmission.grade;
              break;
            }
          }
          this.editDialog = false;
          this.showMsg("评分成功", "teal");
        } else {
          this.editDialog = false;
          this.showMsg("评分失败", "teal");
        }
      });
    }
  },
  mounted() {
    let id = parseInt(this.id);
    this.$getRequest("/teacher/submissions", { hid: id }).then(res => {
      this.submissions = res.data;
    });
  }
};
</script>
