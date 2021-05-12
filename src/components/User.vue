<template>
  <div class="user">
    <SimpleHeader :title="title" />
    <div class="user-info">
      <div class="info">
        <img
          src="https://youdaoyun-1251403676.cos.ap-beijing.myqcloud.com/user-graduate.png"
          class="img"
        />
        <div class="user-desc">
          <span>昵称：{{ nickName }}</span>
          <span>登录名：{{ loginName }}</span>
          <span class="name">个性签名：{{ introduceSign }}</span>
        </div>
      </div>
      <ul class="user-list">
        <li><span>我的订单</span> <van-icon name="arrow" /></li>
        <li><span>账号管理</span><van-icon name="arrow" /></li>
        <li><span>地址管理</span><van-icon name="arrow" /></li>
        <li><span>关于我们</span><van-icon name="arrow" /></li>
      </ul>
      <van-button round block color="#269090" native-type="submit" @click="loginOut">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getLocal, removeLocal } from "../utils/utils";
import SimpleHeader from "../components/SimpleHeader.vue";
import { getUserInfo } from "../service/user";

export default {
  name: "User",
  components: {
    SimpleHeader,
  },
  setup(props) {
    const state = reactive({
      title: "我的",
      user: null,
      nickName: "",
      loginName: "",
      introduceSign: "",
    });
    checkLoginStatus(state);
    return { ...toRefs(state), quit,loginOut };
  },
};

const checkLoginStatus = function (state) {
  const router = useRouter();

  onBeforeMount(() => {
    let token = getLocal("token");
    if (!token) {
      router.push({
        name: "login",
      });
    }
  });
  onMounted(async () => {
    //获取用户信息
    const { data } = await getUserInfo();
    console.log(data);
    state.user = data;
    state.nickName = data.nickName;
    state.loginName = data.loginName;
    state.introduceSign = data.introduceSign;
    console.log(data);
  });
};

const quit = function () {
  removeLocal("token");
  window.location.href = "/";
};

const loginOut = function(){
  removeLocal('token');
  window.location.href = '/'
}

</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.user {
  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, @primary, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 50px;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();
      .img {
        .wh(60px,60px);
        border-radius: 50%;
        margin-top: 4px;
      }

      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
    }
    .user-list {
      width: 100%;
      margin: 30px 0px;
      li {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        font-size: 18px;
        color: #ccc;
      }
    }
  }
}
</style>
