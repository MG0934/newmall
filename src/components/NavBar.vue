<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <router-link to="/home" tag="li" class="nav-list-item active">
        <i class="nbicon nblvsefenkaicankaoxianban-1"></i>
        首页
      </router-link>
      <router-link to="/category" tag="li" class="nav-list-item">
        <i class="nbicon nbfenlei"></i>分类</router-link
      >
      <router-link to="/cart" tag="li" class="nav-list-item"
        ><i class="nbicon nbgouwuche"></i>购物车</router-link
      >
      <router-link to="/user" tag="li" class="nav-list-item"
        ><i class="nbicon nblvsefenkaicankaoxianban-"></i>我的</router-link
      >
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.nav-bar {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 5px 0;
  z-index: 1000;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  .nav-list {
    width: 100%;
    .fj();
    flex-direction: row;
    padding: 0;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;
      &.router-link-active {
        color: @primary;
      }
      i {
        text-align: center;
        font-size: 22px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
