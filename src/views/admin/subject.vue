<template>
  <v-app>
    <v-container>
      <v-layout wrap>
        <v-flex md10>
          <v-toolbar flat color="white">
            <v-toolbar-title>Subjects</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px" persistent>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
              </template>
              <v-card>
                <v-container>
                  <v-layout wrap>
                    <v-flex md10>
                      <v-text-field
                        label="课程标题"
                        v-model="editedItem.name"
                        :rules="[rules.required,rules.max10]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md10>
                      <v-select
                        :items="teachers"
                        label="请选择任课教师"
                        item-value="id"
                        item-text="name"
                        :rules="[rules.required]"
                        v-model="editItem.teacher.id"
                      ></v-select>
                    </v-flex>
                    <v-flex md10 style="text-align:center">
                      <br>
                      <br>
                      <v-btn color="blue darken-1" flat @click="close">取消</v-btn>
                      <v-btn color="blue darken-1" flat @click="save">保存</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-dialog>
          </v-toolbar>

          <v-data-table :headers="headers" :items="subjects" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.teacher.name }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary">Reset</v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar v-model="msgBar.show" :timeout="3000" top :color="msgBar.color">
      {{msgBar.msg}}
      <v-btn color="white" flat @click="show = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    msgBar: {
      color: null,
      show: false,
      msg: ""
    },
    dialog: false,
    headers: [
      {
        text: "题号",
        align: "left",
        sortable: true,
        value: "id"
      },
      { text: "名称", value: "name" },
      { text: "任课教师", value: "teacher.name" }
    ],
    teachers: [{ id: 0, name: "" }],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      teacher: {
        id: 0,
        name: ""
      }
    },
    defaultItem: {
      id: 0,
      name: "",
      teacher: {
        id: 0,
        name: ""
      }
    },
    subjects: [
      {
        id: 0,
        name: "",
        teacher: {
          id: 0,
          name: ""
        }
      }
    ],
    rules: {
      required: v => !!v || "必填字段",
      max10: v => v.length <= 10 || "不得超过10个字符",
      max300: v => v.length <= 300 || "不得超过300个字符"
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    showMsg(msg, color) {
      this.msgBar.color = color || "primary";
      this.msgBar.msg = msg || "未知错误";
      this.msgBar.show = true;
    },
    editItem(item) {
      let id = item.id;
      this.editedIndex = this.subjects.indexOf(item);
      this.$getRequest("/admin/subjects/" + id).then(res => {
        this.editedItem = res.data;
      });
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.subjects.indexOf(item);
      if (confirm("确定删除此项吗?")) {
        this.$deleteRequest("/admin/subjects/" + item.id).then(res => {
          if (res.data) {
            this.subjects.splice(index, 1);
            this.showMsg("删除成功", "teal");
          } else {
            this.showMsg("删除失败", "error");
          }
        });
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      let _this = this;
      let tmp = {
        id: this.editedItem.id,
        name: this.editedItem.name,
        teacher: {
          id: _this.editedItem.teacher.id,
          name: _this.editedItem.teacher.name
        }
      };
      if (this.editedIndex > -1) {
        Object.assign(this.subjects[this.editedIndex], tmp);
        this.showMsg("更新成功", "teal");
      } else {
        let param = {
          id: 0,
          name: this.editedItem.name,
          teacherId: this.editedIndex.teacher.id
        };
        this.$postRequest("/admin/subjects", param).then(res => {
          if (res.data) {
            param.id = res.data;
            this.subjects.push(tmp);
            this.showMsg("添加成功", "teal");
          } else {
            this.showMsg("添加失败", "error");
          }
        });
      }
      this.close();
    }
  },
  mounted() {
    this.$getRequest("/admin/subjects").then(res => {
      this.subjects = res.data;
    });
    this.$getRequest("/admin/teachers").then(res => {
      this.teachers = res.data;
    });
  }
};
</script>
