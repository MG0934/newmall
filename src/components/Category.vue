<template>
  <div class="category">
    <header class="category-header wrap">
      <i class="nbicon nbfanhui"></i>
      <div class="header-search">
        <i class="nbicon nbSearch"></i>
        <router-link
          tag="span"
          class="search-title"
          to="./product-list?from=category"
          >全场50元起步</router-link
        >
      </div>
      <i class="nbicon nbmore"></i>
    </header>
  </div>
  <div class="search-wrap" ref="searchWrap">
    <ListScroll :scroll-data="categoryData" class="nav-side-wrapper">
      <ul class="nav-side">
        <li
          v-for="item in categoryData"
          :key="item.categoryId"
          v-text="item.categoryName"
          :class="{ active: currentIndex == item.categoryId }"
          @click="selectMenu(item.categoryId)"
        ></li>
      </ul>
    </ListScroll>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref } from "vue";
import ListScroll from "../components/ListScroll.vue";
import { getCategory } from "../service/good";

export default {
  name: "Category",
  components: {
    ListScroll,
  },
  setup(props) {
    const state = reactive({
      categoryData: [],
      currentIndex: 15,
    });

    const searchWrap = ref(null);

    function selectMenu(index) {
      this.currentIndex = index;
    }

    function setWrapHeight() {
      // 设置视口高度
      let $screenHeight = document.documentElement.clientHeight;
      console.log(searchWrap);
      searchWrap.value.style.height = $screenHeight - 100 + "px";
    }

    onMounted(async () => {
      setWrapHeight();
      const { data } = await getCategory();
      state.categoryData = data;
      console.log(data);
    });

    return { ...toRefs(state), searchWrap };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.category {
  .category-header {
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    .fj();
    .wh(95%,50px);
    line-height: 50px;
    box-sizing: border-box;
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .icon-left {
      font-size: 25px;
      font-weight: bold;
    }
    .header-search {
      display: flex;
      width: 80%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      border-radius: 20px;
      .nbSearch {
        padding: 0 10px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
      }
    }
  }
  .search-wrap {
    .fj();
    width: 100%;
    margin-top: 50px;
    background: #f8f8f8;
    border-top: 1px solid #999;
    .nav-side-wrapper {
      width: 28%;
      height: 100%;
      overflow: hidden;
      .nav-side {
        width: 100%;
        .boxSizing();
        background: #f8f8f8;
        li {
          width: 100%;
          height: 56px;
          text-align: center;
          line-height: 56px;
          font-size: 14px;
          &.active {
            color: @primary;
            background: #fff;
          }
        }
      }
    }
    .search-content {
      width: 72%;
      height: 100%;
      padding: 0 10px;
      background: #fff;
      .boxSizing();
      .swiper-container {
        width: 100%;
        .swiper-slide {
          width: 100%;
          .category-main-img {
            width: 100%;
          }
          .category-list {
            display: flex;
            flex-wrap: wrap;
            flex-shrink: 0;
            width: 100%;
            .catogory-title {
              width: 100%;
              font-size: 17px;
              font-weight: 500;
              padding: 20px 0;
            }
            .product-item {
              width: 33.3333%;
              margin-bottom: 10px;
              text-align: center;
              font-size: 15px;
              .product-img {
                .wh(30px, 30px);
              }
            }
          }
        }
      }
    }
  }
}
</style>
