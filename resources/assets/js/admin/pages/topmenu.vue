<template>
  <el-menu class="topmenu" theme="dark" default-active="/" mode="horizontal" :router="true">
    <span class="logo">WILLSHOP</span>

    <div id="right-part">
      <router-link to="/profile">
        <img :src="user.avatar" alt="" class="avatar"/>
      </router-link>
      <el-dropdown id="dropdown-menu">
        <span class="el-dropdown-link nickname" v-text="user.name"></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push('/profile')">用户信息</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
  import userConfig from '../config';
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'user'
      ])
    },

    methods: {
      logout () {
        window.localStorage.removeItem(userConfig.authTokenKey);

        this.$router.replace('/login');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../sass/admin_variables";

  .topmenu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: $zindex-topmenu;
    background-color: #263142;
  }

  .logo {
    display: block;
    overflow: hidden;
    float: left;
    width: 115px;
    color: #ffeb3b;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 20px;
  }

  #right-part {
    .avatar {
      display: block;
      float: right;
      width: 40px;
      height: 40px;
      background: red;
      border-radius: 50%;
      margin: 10px 10px 0 20px;
      outline: none;
    }

    #dropdown-menu {
      float: right;
      color: white;
      font-size: 1.1rem;
      margin-top: 20px;
    }
  }
</style>
