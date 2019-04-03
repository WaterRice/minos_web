<template>
  <v-container>
    <v-layout wrap>
      <v-flex md7>
        <v-select :items="subjects" label="请选择课程" :rules="[rules.required]"></v-select>
      </v-flex>
      <v-flex md7>
        <v-text-field label="作业标题" v-model="homework.title" :rules="[rules.required,rules.max10]"></v-text-field>
      </v-flex>
      <v-flex md7>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="homework.to"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="homework.to"
            label="截止日期"
            :rules="[rules.required]"
          ></v-text-field>
          <v-date-picker v-model="homework.to" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(homework.to)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md7>
        <v-textarea
          label="作业内容"
          v-model="homework.descb"
          hint="编写作业内容"
          :rules="[rules.required,rules.max300]"
        ></v-textarea>
      </v-flex>
      <v-flex md7>
        <v-textarea
          label="作业要求"
          v-model="homework.repu"
          hint="编写作业要求"
          :rules="[rules.required,rules.max300]"
        ></v-textarea>
      </v-flex>
      <br>
      <br>
      <v-flex md7 style="text-align: center">
        <v-btn tile color="primary" @click="submit">提交</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    homework: {
      title: "",
      descb: "",
      repu: "",
      to: "",
      subject_id: 0
    },
    menu: false,
    subjects: ["高等数学", "抽象代数", "离散数学", "数据结构", "计算机网络"],
    rules: {
      required: v => !!v || "必填字段",
      max10: v => v.length <= 10 || "不得超过10个字符",
      max300: v => v.length <= 300 || "不得超过300个字符"
    }
  }),
  methods: {
    submit() {
      console.log(this.homework.descb);
    }
  }
};
</script>

