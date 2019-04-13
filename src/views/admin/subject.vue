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
                      <v-text-field
                        label="任课教师姓名"
                        v-model="editedItem.teacher.name"
                        :rules="[rules.required,rules.max10]"
                      ></v-text-field>
                    </v-flex>
                    <!-- <v-flex md10>
                      <v-textarea
                        label="问题描述"
                        v-model="editedItem.descb"
                        hint="编写问题描述"
                        :rules="[rules.required,rules.max300]"
                      ></v-textarea>
                    </v-flex>
                    <v-flex md10>
                      <v-textarea
                        label="问题输入样例"
                        v-model="editedItem.input"
                        hint="编写输入样例"
                        :rules="[rules.required,rules.max300]"
                      ></v-textarea>
                    </v-flex>
                    <v-flex md10>
                      <v-textarea
                        label="问题输出样例"
                        v-model="editedItem.output"
                        hint="编写输出样例"
                        :rules="[rules.required,rules.max300]"
                      ></v-textarea>
                    </v-flex>-->
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
  </v-app>
</template>

<script>
export default {
  data: () => ({
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
    editItem(item) {
      let id = item.id;
      this.editedIndex = this.subjects.indexOf(item);
      console.log(id);
      this.editedItem = {
        id: id,
        name: "抽象代数",
        teacher: {
          id: 0,
          name: "zzz"
        }
      };
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.subjects.indexOf(item);
      confirm("确定删除此项吗?") && this.subjects.splice(index, 1);
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
      } else {
        this.subjects.push(tmp);
      }
      this.close();
    }
  },
  mounted() {
    this.subjects = [
      {
        id: 1,
        name: "啊哈哈",
        teacher: {
          id: 1,
          name: "zzzz"
        }
      },
      {
        id: 2,
        name: "嗯哼哼",
        teacher: {
          id: 1,
          name: "qqqq"
        }
      }
    ];
  }
};
</script>
