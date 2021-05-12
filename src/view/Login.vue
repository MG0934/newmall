<template>
    <div class="login">
    <img class="logo" src="https://youdaoyun-1251403676.cos.ap-beijing.myqcloud.com/mlogo.png" alt="" />
    <div v-if="type == 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <div class="link-register" @click="toggle('register')">进行注册</div>
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username1"
          name="username1"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <div class="link-login" @click="toggle('login')">进行登录</div>
          <van-button round block type="primary" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { Toast } from "vant";
import { login,register } from "../service/user";
import md5 from "js-md5";
import {getLocal,setLocal} from '../utils/utils'
export default {
  setup() {
    const state = reactive({
      type: "login",
      username: "",
      password: "",
      username1: "",
      password1: "",
    });

    function toggle(value) {
      state.type = value;
    }

    async function onSubmit(values) {
      if (state.type === "login") {
        console.log(values)
        const result = await login({
          loginName: values.username,
          passwordMd5: md5(values.password),
        });

        console.log(result);
        setLocal('token',result.data);
        Toast.success("登录成功");
        window.location.href = "/"
      } else {
        const { data } = register({
          loginName: values.username1,
          password: values.password1,
        });

        console.log(data);
        Toast.success("注册成功");
        state.type = "login";
      }
    }

    return { ...toRefs(state), toggle, onSubmit };
  },
};
</script>

<style lang="less" scoped>
.loginAndRegister {
  font-size: 14px;
  margin-bottom: 20px;
  color: #1989fa;
  display: inline-block;
}

.login {
  .logo {
    width: 120px;
    height: 120px;
    display: block;
    margin: 80px auto 0px;
  }
  .login-body {
    padding: 0 20px;
  }

  .login {
    .link-register {
      .loginAndRegister();
    }
  }
  .register {
    .link-login {
      .loginAndRegister();
    }
  }
}
</style>
