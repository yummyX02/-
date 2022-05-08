<template>
  <el-container>
    <el-aside width="200px">
      <el-image :src="src" id="img"></el-image>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 5px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="getData">学生信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <manage-header></manage-header>
      </el-header>
      <div class="welcome" v-if="showWelcome">
        <h2 class="welcome-language">
          Welcome to the background of student management system by SIPC
        </h2>
      </div>
      <el-main v-if="isShow">
        <div class="msg" v-show="ctr">
          <div class="search">
            <el-input
              placeholder="请输入关键词"
              v-model="search"
              clearable
              @clear="getData"
            >
            </el-input>
            <el-button @click="serch" icon="el-icon-search"> </el-button>
          </div>
          <el-table :data="tableData" height="600" border style="width: 100%">
            <el-table-column prop="num" label="序号" type="index" width="180">
              <template slot-scope="scope">
                <!-- <span>{{(page - 1) * pageSize + scope.$index + 1}}</span> -->
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="stdId" label="学号" width="180">
            </el-table-column>
            <el-table-column prop="stdName" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="major" label="专业" width="180">
            </el-table-column>
            <el-table-column prop="classNum" label="班级" width="180">
            </el-table-column>
            <el-table-column prop="stdQQ" label="QQ" width="180">
            </el-table-column>
            <el-table-column prop="stdPhone" label="电话号码" width="180">
            </el-table-column>
            <el-table-column
              prop="firstWill.organization"
              label="第一志愿"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="firstWill.branch" label="部门" width="180">
            </el-table-column>
            <el-table-column prop="firstWill.reason" label="理由" width="180">
            </el-table-column>
            <el-table-column
              prop="secondWill.organization"
              label="第二志愿"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="secondWill.branch" label="部门" width="180">
            </el-table-column>
            <el-table-column prop="secondWill.reason" label="理由" width="180">
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="update(scope.row)"
                  >修改</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 原来 -->
          <!-- <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
            </el-pagination> -->
          <!-- 更改 -->
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
          <!-- Form -->
          <el-dialog title="修改学生信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">


              <el-form-item label="学号" :label-width="formLabelWidth">
                <el-input v-model.number="form.ruleForm.stdId"
                  placeholder="请输入学号"
                  suffix-icon="el-icon-user-solid" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input placeholder="请输入姓名"
                  suffix-icon="el-icon-edit"
                  v-model.trim="form.ruleForm.stdName" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="QQ号" :label-width="formLabelWidth">
                <el-input placeholder="请输入QQ号"
                  suffix-icon="el-icon-sunny"
                  v-model.number="form.ruleForm.stdQQ" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="电话号" :label-width="formLabelWidth">
                <el-input placeholder="请输入电话号码"
                  suffix-icon="el-icon-phone"
                  v-model.number="form.ruleForm.stdPhone" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="专业与班级" :label-width="formLabelWidth">
                <el-cascader
                  v-model="form.classNum"
                  placeholder="请选择"
                  class="sss"
                  :options="majorData"
                  :props="{ expandTrigger: 'hover' }"
                  filterable
                ></el-cascader>
              </el-form-item>

              <el-form-item label="第一志愿" :label-width="formLabelWidth">
                <el-cascader
                  v-model="form.firstWill"
                  placeholder="请选择"
                  class="sss"
                  :options="orginazationData"
                  :props="{ expandTrigger: 'hover' }"
                  filterable
                ></el-cascader>
              </el-form-item>

              <el-form-item label="第二志愿" :label-width="formLabelWidth">
                <el-cascader
                  v-model="form.secondWill"
                  placeholder="请选择"
                  class="sss"
                  :options="orginazationData"
                  :props="{ expandTrigger: 'hover' }"
                  filterable
                ></el-cascader>
              </el-form-item>
              <el-form-item label="是否调剂" :label-width="formLabelWidth">
                <el-switch
                  v-model="form.ruleForm.isDispensing"
                  class="www"
                ></el-switch>
              </el-form-item>
              <!-- <div class="input"> -->
                <!-- <el-input
                  v-model.number="form.ruleForm.stdId"
                  placeholder="请输入学号"
                  suffix-icon="el-icon-user-solid"
                >
                </el-input> -->
              <!-- </div> -->
              <!-- <div class="input"> -->
                <!-- <el-input
                  placeholder="请输入姓名"
                  suffix-icon="el-icon-edit"
                  v-model.trim="form.ruleForm.stdName"
                >
                </el-input> -->
              <!-- </div> -->
              <!-- <div class="input"> -->
                <!-- <el-input
                  placeholder="请输入QQ号"
                  suffix-icon="el-icon-sunny"
                  v-model.number="form.ruleForm.stdQQ"
                >
                </el-input> -->
              <!-- </div> -->
              <!-- <div class="input"> -->
                <!-- <el-input
                  placeholder="请输入电话号码"
                  suffix-icon="el-icon-phone"
                  v-model.number="form.ruleForm.stdPhone"
                >
                </el-input> -->
              <!-- </div> -->
              <!-- <h4>专业与班级</h4> -->
              <!-- <div class="input"> -->
                <!-- <el-select v-model="ruleForm.class" placeholder="请选择" class="sss">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select> -->
                <!-- <el-cascader
                  v-model="form.classNum"
                  placeholder="请选择"
                  class="sss"
                  :options="majorData"
                  :props="{ expandTrigger: 'hover' }"
                  filterable
                ></el-cascader> -->
              <!-- </div> -->
              <!-- <h4>第一志愿</h4> -->
              <!-- <div class="input"> -->
                <!-- <el-cascader
                  v-model="form.firstWill"
                  placeholder="请选择"
                  class="sss"
                  :options="orginazationData"
                  :props="{ expandTrigger: 'hover' }"
                  filterable
                ></el-cascader> -->
              <!-- </div> -->
              <!-- <div class="input"> -->
                <!-- <el-input
                  type="textarea"
                  v-model="form.ruleForm.firstWill.reason"
                  placeholder="请输入加入此组织的理由"
                ></el-input> -->
              <!-- </div> -->
              <!-- <h4>第二志愿</h4> -->
              <!-- <div class="input"> -->
                <!-- <el-cascader
                  v-model="form.secondWill"
                  placeholder="请选择"
                  class="sss"
                  :options="orginazationData"
                  :props="{ expandTrigger: 'hover' }"
                  filterable
                ></el-cascader> -->
              <!-- </div> -->
              <!-- <div class="input"> -->
                <!-- <el-input
                  type="textarea"
                  v-model="form.ruleForm.secondWill.reason"
                  placeholder="请输入加入此组织的理由"
                ></el-input> -->
              <!-- </div> -->
              <!-- <h4>是否调剂</h4> -->
              <!-- <div class="input"> -->
                <!-- <el-switch
                  v-model="form.ruleForm.isDispensing"
                  class="www"
                ></el-switch> -->
              <!-- </div> -->
              
              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submit"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ManageHeader from "../components/ManageHeader.vue";

export default {
  data() {
    return {
      //展示区域
      isCollapse: false,
      isShow: false,
      showWelcome: true,
      //查询框
      search: "",
      filData: [],
      input_new: [],
      tableData: [],
      ctr: false,
      num: 1,
      src: "https://s3.bmp.ovh/imgs/2022/05/08/3797ae02f5606044.png",
      // 分页部分
      currentPage: 1, //默认打开第一页数据
      pageSize: 5, //默认显示5条数据
      total: 0,
      //判断对话框是否打开
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 重新收集
      form:{
        classNum:[],
        firstWill:[],
        secondWill:[],
        ruleForm:{
          stdId:'',
          stdName:'',
          stdQQ:'',
          stdPhone:'',
          major:'',
          classNum:'',
          firstWill: { //第⼀志愿 必填 
            organization: '', //组织名 必填 
            branch: '', //下属部⻔ 必填 
            reason: '', //加⼊该组织的原因
          },
          secondWill: { //第⼆志愿 
            organization: '', //组织名 
            branch: '', //下属部⻔ 
            reason: '', //加⼊该组织的原因 
          },
          isDispensing:true,
      },
      },
      //表单信息
      majorData: [{
        value: "计算机科学与技术",
        label: "计算机科学与技术",
        children: [{
            value: "一班",
            label: "一班"
          },
          {
            value: "二班",
            label: "二班"
          },
          {
            value: "三班",
            label: "三班"
          },
          {
            value: "四班",
            label: "四班"
          }
        ]
      },
      {
        value: "信息安全",
        label: "信息安全",
        children: [{
            value: "一班",
            label: "一班"
          },
          {
            value: "二班",
            label: "二班"
          },
          {
            value: "三班",
            label: "三班"
          },
          {
            value: "四班",
            label: "四班"
          }
        ]
      },
      {
        value: "物联网",
        label: "物联网",
        children: [{
            value: "一班",
            label: "一班"
          },
          {
            value: "二班",
            label: "二班"
          }
        ]
      },
      {
        value: "数据科学与大数据技术",
        label: "数据科学与大数据技术",
        children: [{
            value: "一班",
            label: "一班"
          },
          {
            value: "二班",
            label: "二班"
          }
        ]
      },
      {
        value: "计算机科学与技术(中外合作)",
        label: "计算机科学与技术(中外合作)",
        children: [{
            value: "一班",
            label: "一班"
          },
          {
            value: "二班",
            label: "二班"
          },
          {
            value: "三班",
            label: "三班"
          },
          {
            value: "四班",
            label: "四班"
          },
          {
            value: "五班",
            label: "五班"
          },
          {
            value: "六班",
            label: "六班"
          }
        ]
      }
    ],
      orginazationData: [{
        "value": "科技协会",
        "label": "科技协会",
        "children": [{
          "value": "科技协会",
          "label": "科技协会"
        }]
      },
      {
        "value": "团委",
        "label": "团委",
        "children": [{
            "value": "组织部",
            "label": "组织部"
          },
          {
            "value": "宣传部",
            "label": "宣传部"
          },
          {
            "value": "心协",
            "label": "心协"
          },
          {
            "value": "青协",
            "label": "青协"
          }
        ]
      },
      {
        "value": "学生会",
        "label": "学生会",
        "children": [{
            "value": "办公室",
            "label": "办公室"
          },
          {
            "value": "学习部",
            "label": "学习部"
          },
          {
            "value": "宣传部",
            "label": "宣传部"
          },
          {
            "value": "文艺部",
            "label": "文艺部"
          },
          {
            "value": "体育部",
            "label": "体育部"
          },
          {
            "value": "外联部",
            "label": "外联部"
          },
          {
            "value": "自管会",
            "label": "自管会"
          }
        ]
      },
      {
        "value": "勤工助学中心",
        "label": "勤工助学中心",
        "children": [{
            "value": "管理部",
            "label": "管理部"
          },
          {
            "value": "活动部",
            "label": "活动部"
          },
          {
            "value": "助贷部",
            "label": "助贷部"
          },
          {
            "value": "外联部",
            "label": "外联部"
          }
        ]
      },
      {
        "value": "新闻中心",
        "label": "新闻中心",
        "children": [{
            "value": "摄影协会",
            "label": "摄影协会"
          },
          {
            "value": "新媒体部",
            "label": "新媒体部"
          },
          {
            "value": "记者团",
            "label": "记者团"
          }
        ]
      }
    ] 
    }
  },
  watch: {
    search() {
      console.log("我被改啦~");
    },
  },
  methods: {
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
      console.log("@@");
      this.ctr = true;
      this.isShow = true;
      this.showWelcome = false;
      // myPage = sessionStorage.getItem('page');
      // myPageSize = sessionStorage.getItem('pageSize')
      this.$axios({
        method: "POST",
        baseURL: "http://47.94.90.140:8000/",
        url: "getAllStuInfo",
        headers: {
          "content-type": "application/json",
        },
        data: { token: sessionStorage.getItem("log_token") },
        params: {
          page: this.currentPage,
          pageSize: this.pageSize,
          // keyword : this.input2,
        },
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.total = res.data.data.total;
          this.tableData = res.data.data.students;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //信息查询方法
    serch() {
      console.log(this.search);
      // this.getData;
      this.$axios({
        method: "POST",
        baseURL: "http://47.94.90.140:8000/",
        url: "getStuInfo",
        // headers:{
        //   "content-type" :"application/json"
        // },
        data: {
          token: sessionStorage.getItem("log_token"),
          keyWord: this.search,
        },
        params: {
          // token:sessionStorage.getItem('log_token'),
          // keyWord : this.search,
          page: this.currentPage,
          pageSize: this.pageSize,
        },
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          // this.input_new = res.data.data.students
          this.total = res.data.data.total;
          this.tableData = res.data.data.students;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 分页部分
    // 选择每页显示和当前页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      console.log(this.pageSize);
      // sessionStorage.setItem('pageSize',this.pageSize);
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      console.log(this.currentPage);
      // sessionStorage.setItem('page',this.currentPage);
      this.getData();
    },
    //用户信息修改
    update(row) {
      console.log(row);
      //点击打开修改信息框
      this.dialogFormVisible = true;
    },
    //提交修改后的信息
    submit() {
      // 提交表单信息
      this.form.ruleForm.firstWill.organization = this.form.firstWill[0],
        this.form.ruleForm.firstWill.branch = this.form.firstWill[1],
        this.form.ruleForm.secondWill.branch = this.form.secondWill[1],
        this.form.ruleForm.secondWill.organization = this.form.secondWill[0],
        this.form.ruleForm.classNum = this.form.classNum[1],
        this.form.ruleForm.major = this.form.classNum[0]
        this.$axios.post('http://47.94.90.140:8000/post',
          this.form.ruleForm
          ,{
            headers:{
              'content-type': 'application/json;charset=UTF-8'
            }
          }
        ).then(res=>{
          console.log(res.data)
          alert("修改成功~");
          this.dialogFormVisible = false
          
        }).catch(error=>{
          console.log(error);
          alert(error.data.message);
        })
    }
  },
  components: {
    ManageHeader,
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: ; */
}
.el-radio-group {
  margin-top: 0;
  margin-bottom: 0;
}
/* 布局 */
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
  height: 1000%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* origin */
.search {
  display: flex;
  flex-direction: row;
}
.el-input {
  width: 300px;
}
.el-button {
  margin-top: 60px;
  widows: 30px;
  height: 40px;
}
.el-image {
  height: 128px;
}
body,
#app,
.el-container {
  height: 100%;
  width: 100%;
}
.el-main,
.el-container.is-vertical {
  width: 100%;
  height: 100%;
}
/* 欢迎文字效果 */
.welcome {
  background: #ffffff; /*设置页面背景颜色*/
  text-align: center; /*设置文字居中*/
}
.welcome-language {
  color: #6277d3; /*设置文字颜色*/
  font-size: 64px; /*设置字体大小*/
  font-weight: bolder; /*设置字体粗细*/
  line-height: 135px;
  -webkit-animation: welcome-language 2s infinite; /*设置动画*/
}
@-webkit-keyframes welcome-language {
  /*创建动画*/
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
/* 修改框样式处理 */
/* .el-input {
  margin-top: 5px;
  margin-bottom: 5px;
} */
</style>

