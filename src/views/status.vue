<template>
  <v-app>
    <home-toolbar/>
    <v-container>
      <v-layout justify-center wrap>
        <v-flex>
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="按问题ID搜索"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="codeSubmissions" :search="search">
              <template slot="items" slot-scope="props">
                <td class="primary--text">{{ props.item.id}}</td>
                <td
                  class="text-xs-left"
                  :class="props.item.status === 0 ? 'teal--text' : 'error--text'"
                  v-text="props.item.student_name.length > 5 ? props.item.student.name.substring(0,5) + '...' : props.item.student_name"
                ></td>
                <td :class="props.item.status === 0 ? 'teal--text' : 'error--text'">Java</td>
                <td
                  class="text-xs-left"
                  :class="props.item.status === 0 ? 'teal--text' : 'error--text'"
                  v-text="new Date(props.item.time).toLocaleString()"
                ></td>
                <td
                  class="text-xs-left"
                  :class="props.item.status === 0 ? 'teal--text' : 'error--text'"
                  v-text="props.item.status === 0 ? 'Accepted' : 'Wrong Answer'"
                ></td>
              </template>
              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="warning"
              >没有找到 "{{ search }}" 这个题目的相关提交</v-alert>
            </v-data-table>
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
  data: () => ({
    search: "",
    headers: [
      {
        text: "问题ID",
        align: "left",
        sortable: true,
        value: "id"
      },
      { text: "学生姓名", value: "student.name" },
      { text: "使用语言", value: "" },
      { text: "提交时间", value: "time" },
      { text: "评测情况", value: "grade" }
    ],
    codeSubmissions: [
      {
        id: 1,
        problemId: 1001,
        student: {
          id: 0,
          name: ""
        },
        language: "Java",
        time: 1556377846,
        status: 0
      },
      {
        codeSubmissions_id: 3,
        problem_id: 1001,
        student_name: "屠龙刀",
        language: "Java",
        time: 1566377846,
        status: 1
      },
      {
        codeSubmissions_id: 5,
        problem_id: 1001,
        student_name: "屠龙刀",
        language: "Java",
        time: 1556377846,
        status: 0
      },
      {
        codeSubmissions_id: 2,
        problem_id: 1001,
        student_name: "屠龙刀",
        language: "Java",
        time: 1556377846,
        status: 1
      },
      {
        codeSubmissions_id: 4,
        problem_id: 1001,
        student_name: "屠龙刀",
        language: "Java",
        time: 1556377846,
        status: 0
      }
    ]
  })
};
</script>

