<template>
  <el-container style="height: 100%">
    <el-header>
      <manage-header></manage-header>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <div class="nav">
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#505f82" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title" @click="change">管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item @click="getData" index="1">学生信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <manage-nav></manage-nav>
        <div class="msg" v-show="ctr">
            <div class="search">
              <el-input
                  placeholder="请输入关键词"
                  v-model="input2">
            </el-input>
            <el-button
              icon="el-icon-search">
            </el-button>
            </div>
            <el-table
              :data="tableData"
              height="700"
              border
              style="width: 100%">
              <el-table-column
                prop="num"
                label="序号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="stdId"
                label="学号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="stdName"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="major"
                label="专业"
                width="180">
              </el-table-column>
              <el-table-column
                prop="classNum"
                label="班级"
                width="180">
              </el-table-column>
              <el-table-column
                prop="stdQQ"
                label="QQ"
                width="180">
              </el-table-column>
              <el-table-column
                prop="stdPhone"
                label="电话号码"
                width="180">
              </el-table-column>
              <el-table-column
                prop="firstWill.organization"
                label="第一志愿"
                width="180">
              </el-table-column>
              <el-table-column
                prop="firstWill.branch"
                label="部门"
                width="180">
              </el-table-column>
              <el-table-column
                prop="firstWill.reason"
                label="理由"
                width="180">
              </el-table-column>
              <el-table-column
                prop="secondWill.organization"
                label="第二志愿"
                width="180">
              </el-table-column>      
              <el-table-column
                prop="secondWill.branch"
                label="部门"
                width="180">
              </el-table-column>
              <el-table-column
                prop="secondWill.reason"
                label="理由"
                width="180">
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import ManageAside from '../components/ManageAside.vue' 
import ManageHeader from '../components/ManageHeader.vue'
// import StudentMassage from '../components/StudentMassage.vue'
import ManageNav from '../components/ManageNav.vue'

export default {
  name:'Manage',
  data() {
    return{
      input2:'',
      tableData: [

      ],
      isCollapse: false,
      ctr:false,
      num:1
    }
  },
  components:{
    ManageHeader,
    ManageNav
  },
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      change() {
        this.ctr = false;
      },
      getData() {
        console.log('@@');
        this.ctr = !this.ctr;
         this.$axios.post('http://47.94.90.140:8000/getAllStuInfo?page=1&pageSize=5',{
          token:sessionStorage.getItem('log_token'),
          page:'',
          pageSize:'10'
        }).then(res=>{
          console.log(res);
          console.log(res.data);
          this.tableData = res.data.data.students
        }).catch(error=>{
          console.log(error);
        })
      }
  }
}
 
</script>

<style scoped>
.el-header {
    background-color: #333;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    padding-top: 0;
  }
  .el-aside {
    background-color: #505f82;
    color: #ffffff;
    text-align: center;
    line-height: 200px;
  } 
  
   .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .msg{
    background-color: #ffffff;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .search{
    display: flex;
    flex-direction: row;
  }
  .el-input{
    width: 300px;
  }
  .el-button{
    margin-top: 60px;
    widows: 30px;
    height: 40px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .nav{
  height: 100vh;
  background-color: #505f82;

  }
</style>