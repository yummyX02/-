<template>
  <div class="login">
    <el-container>
      <el-main id="box">
        <div class="demo-image__placeholder">
          <div class="block">
            <span class="demonstration">Welcome</span>
            <el-image :src="src" class="img"></el-image>
          </div>
        </div>
        <el-form>
          <el-input 
            class="inp"
            v-model.number="ruleForm.username" 
            placeholder="请输入账号" 
            suffix-icon="el-icon-user-solid">
          </el-input>
          <el-input 
            show-password
            class="inp"
            v-model.number="ruleForm.password" 
            placeholder="请输入密码" 
            suffix-icon="el-icon-s-opportunity">
          </el-input>
          <el-form-item class="btn">
            <el-button type="warning" @click="goMnage" plain >登陆</el-button>
            <el-button type="success" @click="resetForm('ruleForm')" >重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div> 
</template>

<script>
export default {
  name:'Login',
  data() {
    return{
      ruleForm:{
        username:'',
        password:'',
      },
      src:'https://s4.ax1x.com/2022/03/02/b1X66x.jpg'
    }
  },
  methods:{
    resetForm(formName) {
      this[formName] = {};
    
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      });
    
     },
    goMnage() {
      this.$axios.post('http://47.94.90.140:8000/login' , 
        this.ruleForm
      ).then(res=>{
        // this.$router.push('/manage');
        // console.log(res);
        // console.log(res.data);
        
        console.log(res.data.code);
        console.log(res.data.data.token);
        if(res.data.code === '0000'){   
          alert("登陆成功，恭喜你揭开后台神秘的面纱...");
          this.$router.push('/manage');
          sessionStorage.setItem('log_token', res.data.data.token);
        }
        else if(res.data.code === '1000'){
          alert("登陆失败，请检查用户密码是否有误~");
          console.log(error);
        }
        
      })
      .catch(function(error){
        alert("登陆失败，请检查用户密码是否有误~");
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
/* #box{
  margin: 0 auto;
}
.login{
  display: flex;
  margin: 0 auto;
  width: 400px;
  height: auto;
    background-color: #f4f5f9;  
    margin: 150px  auto 0 auto; 
    border-radius: 10%;
  border: 1 solid #ffffff;

}
.btn{
  margin-top: 20px;
}
.inp{
  margin-top: 10px;
  margin-bottom: 30px;
}
.block{
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: auto;
  height: auto; 
}
.img{
  width: 100px;
  height: 70px;
  margin-top: 20px;
  margin-bottom: 60px;
} */
.login{
  display: flex;
  margin: 0 auto;
  width: 400px;
  height: auto;
    background-color: #f4f5f9;  
    margin: 150px  auto 0 auto; 
    border-radius: 10%;
  border: 1 solid #ffffff;

}
.btn{
  margin-top: 20px;
}
.inp{
  margin-top: 10px;
  margin-bottom: 30px;
}
.block{
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: auto;
  height: auto; 
}
.img{
  width: 100px;
  height: 70px;
  margin-top: 20px;
  margin-bottom: 60px;
}
</style>
