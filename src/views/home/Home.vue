<template>
  <v-app>
    <home-toolbar/>
    <notification class="clear"/>
    <home-footer class="clear"></home-footer>
  </v-app>
</template>

<script>
import HomeToolbar from "@/components/HomeToolbar.vue";
import Notification from "./Notification.vue";
import HomeFooter from "@/components/HomeFooter.vue";
export default {
  components: {
    HomeToolbar,
    Notification,
    HomeFooter
  }
};
</script>
