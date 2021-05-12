<template>
  <div id="app">
    <router-view />
    <NavBar v-if="isShowNav"></NavBar>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { watch, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    NavBar,
  },
  data() {
    return {};
  },
  setup(props) {
    const state = reactive({
      showMenuList: ["/", "/home", "/category", "/cart", "/user"],
      isShowNav: true,
    });

    const route = useRoute();

    watch(route, () => {
      if (state.showMenuList.includes(route.path)) {
        state.isShowNav = true;
      } else {
        state.isShowNav = false;
      }
    });

    return {...toRefs(state)}
  },
};
</script>

<style lang="less">

</style>
