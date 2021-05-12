<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScorll from "better-scroll";
import { onMounted, toRefs, watch, ref, reactive } from "vue";
export default {
  setup(props, { emit }) {
    const wrapper = ref(null);
    const state = reactive({
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1,
      },
      click: {
        type: Number,
        default: 1,
      },
      // 是否开启横向滚动
      scrollX: {
        type: Boolean,
        default: false,
      },
      // 是否派发滚动事件
      listenScroll: {
        type: Boolean,
        default: false,
      }, // 列表的数据
      scrollData: {
        type: Array,
        default: null,
      },
      // 是否派发滚动到底部的事件，用于上拉加载
      pullup: {
        type: Boolean,
        default: false,
      },
      // 是否派发顶部下拉的事件，用于下拉刷新
      pulldown: {
        type: Boolean,
        default: false,
      },
      // 是否派发列表滚动开始的事件
      beforeScroll: {
        type: Boolean,
        default: false,
      }, // 当数据更新后，刷新scroll的延时
      refreshDelay: {
        type: Number,
        default: 20,
      },
      scroll: null,
    });
    onMounted(() => {
      setTimeout(() => {}, 20);
    });

    // 初始化滚动组件，拿不到 this.$refs.wrapper 代码不往下走
    function initScroll() {
      if (!wrapper) {
        return;
      }
      // better-scroll 初始化， 传入配置项参数
      state.scroll = new BScorll(wrapper, {
        probeType: state.probeType,
        click: state.click,
        scrollX: state.scrollX,
      });
      // 是否派发滚动事件
      if (state.listenScroll) {
        state.scroll.on("scroll", (position) => {
          emit("scroll", position);
        });
      }
      if (state.pullup) {
        state.scroll.on("scrollEnd", () => {
          // 滚动到底部
          if (state.scroll.y <= state.scroll.maxScrollY + 50) {
            // 派发滚动到底部的事件
            emit("scrollToEnd");
          }
        });
      }
      if (state.pulldown) {
        state.scroll.on("touchend", (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            // 下拉刷新
            emit("pulldown");
          }
        });
      }
      if (state.beforeScroll) {
        state.scroll.on("beforeScrollStart", () => {
          // 列表滚动前触发
          emit("beforeScroll");
        });
      }
    }

    function disable() {
      // 代理 better-scroll 的 disable 方法
      state.scroll && state.scroll.disable();
    }

    function enable() {
      // 代理 better-scroll 的 enable 方法
      state.scroll && state.scroll.enable();
    }
    function refresh() {
      // 代理 better-scroll 的 refresh 方法
      state.scroll && state.scroll.refresh();
    }
    function scrollTo() {
      // 代理 better-scroll 的 scrollTo 方法
      state.scroll && state.scroll.scrollTo.apply(state.scroll, arguments);
    }
    function scrollToElement() {
      // 代理 better-scroll 的 scrollToElement 方法
      state.scroll &&
        state.scroll.scrollToElement.apply(state.scroll, arguments);
    }

    watch(
      () => state.refreshDelay,
      () => {
        setTimeout(() => {
          refresh();
        }, state.refreshDelay);
      }
    );

    return { ...toRefs(state), wrapper };
  },
};
</script>

<style lang="less" scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
