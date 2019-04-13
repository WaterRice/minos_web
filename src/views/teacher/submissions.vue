<template>
  <v-container>
    <v-layout justify-center wrap>
      <v-flex>
        <v-card>
          <v-card-title>
            <v-btn flat color="primary">导出成绩</v-btn>
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
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  data: () => ({
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
      },
      {
        submission_id: 2,
        student_id: 222016602063021,
        student_name: "倚天剑",
        time: 15557896639,
        grade: 90
      },
      {
        submission_id: 3,
        student_id: 222016602063023,
        student_name: "xxx",
        time: 15557896639,
        grade: 70
      },
      {
        submission_id: 4,
        student_id: 222016602063026,
        student_name: "jjj",
        time: 15557896639,
        grade: 65
      },
      {
        submission_id: 5,
        student_id: 222016602063028,
        student_name: "ggg",
        time: 15557896639,
        grade: 70
      }
    ],
    selectedSubmission: {
      id: 0,
      content: "lalalallallallalla",
      grade: 0
    }
  }),
  methods: {
    editItem(item) {
      this.selectedSubmission.id = item.id;
      this.selectedSubmission.grade = item.grade;
      this.editDialog = true;
    },
    update() {
      for (let tmp of this.submissions) {
        if (this.selectedSubmission.id === tmp.id) {
          tmp.grade = this.selectedSubmission.grade;
          break;
        }
      }
      this.editDialog = false;
    }
  }
};
</script>
