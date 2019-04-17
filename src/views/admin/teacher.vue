<template>
  <v-app>
    <v-container>
      <v-layout wrap>
        <v-flex md10>
          <v-toolbar flat color="white">
            <v-toolbar-title>所有教师</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px" persistent>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">添加教师</v-btn>
              </template>
              <v-card>
                <v-container>
                  <v-layout wrap>
                    <v-flex md10>
                      <v-text-field
                        label="教师姓名"
                        v-model="editedItem.name"
                        :rules="[rules.required,rules.max10]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md10>
                      <v-text-field
                        label="教师账号"
                        v-model="editedItem.acount"
                        :rules="[rules.required,rules.max10]"
                      ></v-text-field>
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

          <v-data-table :headers="headers" :items="teachers" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.acount }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
            <!-- <template v-slot:no-data>
              <v-btn color="primary">Reset</v-btn>
            </template>-->
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
        text: "编号",
        align: "left",
        sortable: true,
        value: "id"
      },
      { text: "姓名", value: "name" },
      { text: "账号", value: "acount" }
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      acount: ""
    },
    defaultItem: {
      id: 0,
      name: "",
      acount: ""
    },
    teachers: [
      {
        id: 0,
        name: "",
        acount: ""
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
      this.editedIndex = this.teachers.indexOf(item);
      this.$getRequest("/admin/teachers/" + id).then(res => {
        this.editedItem = res.data;
      });
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.teachers.indexOf(item);
      if (confirm("确定删除此项吗?")) {
        this.$deleteRequest("/admin/teachers/" + item.id).then(res => {
          if (res.data) {
            this.teachers.splice(index, 1);
            this.showMsg("删除成功", "teal");
          } else {
            this.showMsg("删除失败", "teal");
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
      if (this.editedIndex > -1) {
        Object.assign(this.teachers[this.editedIndex], this.editedItem);
        this.showMsg("更新成功");
      } else {
        let tmp = {
          id: 0,
          name: this.editedItem.name,
          acount: this.editedItem.acount
        };
        this.$postRequest("/admin/teachers", this.editedItem).then(res => {
          if (res.data) {
            tmp.id = res.data;
            this.teachers.push(tmp);
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
    this.$getRequest("/admin/teachers").then(res => {
      this.teachers = res.data;
    });
  }
};
</script>
