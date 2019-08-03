<template>
  <div class="login-wrap">
    <el-form label-position="top"
    label-width="80px"
    :model="formdata"
    class="login-wrap-form">
    <h2>用户登录</h2>
      <el-form-item label="名称">
        <el-input type="text" v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input type="password" v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button
      @click.prevent = "handleLogin()"
      class="login-wrap-form-btn" type="primary" plain >登录</el-button>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      formdata: {
        uesrname: '',
        password: ''
      }
    }
  },
  methods:{
    handleLogin(){
      this.axios.post('login',this.formdata).then((res)=>{
        console.log(res);
        this.$router.push({name:'home'})
      })
      // this.axios.get('login').then((res)=>{
      //   console.log(res)
      // })
    }
  }
}
</script>

<style lang="scss">
.login-wrap{
  height: 100%;
  background-color: #324152;
  display:flex;
  justify-content: center;
  align-items: center;
  &-form{
    width: 400px;
    background: #ffffff;
    border-radius: 5px;
    padding:30px; 
    &-btn{
      width:100%;
    }
  }
}
</style>
