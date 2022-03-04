<template>
  <div class="choose">
    <h2>天津理工大学计算机科学与工程学院</h2>
    <h2>学生组织报名系统</h2>
    <h4>个人信息</h4>
    <div class="input">
    <el-input 
      v-model.number="ruleForm.stdId" 
      placeholder="请输入学号" 
      suffix-icon="el-icon-user-solid">
      </el-input>
    </div>
    <div class="input">
    <el-input
      placeholder="请输入姓名"
      suffix-icon="el-icon-edit"
      v-model.trim="ruleForm.stdName">
    </el-input>
    </div>
    <div class="input">
      <el-input
      placeholder="请输入QQ号"
      suffix-icon="el-icon-sunny"
      v-model.number="ruleForm.stdQQ">
    </el-input>
    </div>
    <div class="input">
      <el-input
      placeholder="请输入电话号码"
      suffix-icon="el-icon-phone"
      v-model.number="ruleForm.stdPhone">
    </el-input>
    </div>
    <h4>专业与班级</h4>
    <div class="input">
      <!-- <el-select v-model="ruleForm.class" placeholder="请选择" class="sss">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select> -->
      <el-cascader  
        v-model="classNum" 
        placeholder="请选择" 
        class="sss"
        :options="majorData"
        :props="{ expandTrigger: 'hover' }"
        filterable></el-cascader>
    </div>
    <h4>第一志愿</h4>
    <div class="input">
      <el-cascader  
        v-model="firstWill" 
        placeholder="请选择" 
        class="sss"
        :options="orginazationData"
        :props="{ expandTrigger: 'hover' }"
        filterable></el-cascader>
    </div>
    <div class="input">
      <el-input type="textarea" v-model="ruleForm.firstWill.reason" placeholder="请输入加入此组织的理由"></el-input>
    </div>
    <h4>第二志愿</h4>
    <div class="input">
      <el-cascader  
      v-model="secondWill" 
      placeholder="请选择" 
      class="sss"
      :options="orginazationData"
      :props="{ expandTrigger: 'hover' }"
      filterable></el-cascader>
    </div>
    <div class="input">
      <el-input type="textarea" v-model="ruleForm.secondWill.reason" placeholder="请输入加入此组织的理由"></el-input>
    </div>
    <h4>是否调剂</h4>
    <div class="input">
      <el-switch v-model="ruleForm.isDispensing" class="www"></el-switch>
    </div>
    <div class="button">
      <el-button type="success" @click="submitForm" plain class="btn">报名</el-button>
    </div>
    <div class="button">
      <el-button type="warning" @click="goLogin" plain class="btn">后台登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:"Home",
  data() {
    return{
      // 处理组件的默认行为
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
      rules:{
        classNum:[
          { required:true,  message: '请选择班级专业', trigger: 'change'}
        ],
        firstWill:[
          { required:true,  message: '请选择第一志愿', trigger: 'change'}
        ],
        secondWill:[
          { required:true,  message: '请选择第二志愿', trigger: 'change'}
        ],
        'ruleForm.reason': [
            { required: true, message: '请填写加入理由', trigger: 'blur' }
        ],
        'ruleForm.reason': [
            { required: true, message: '请填写加入理由', trigger: 'blur' }
        ],
       
      } ,
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
  methods:{
    goLogin() {
      this.$router.push({
        path:'/login',
      })
    },
    submitForm() {
        this.ruleForm.firstWill.organization = this.firstWill[0],
        this.ruleForm.firstWill.branch = this.firstWill[1],
        this.ruleForm.secondWill.branch = this.secondWill[1],
        this.ruleForm.secondWill.organization = this.secondWill[0],
        this.ruleForm.classNum = this.classNum[1],
        this.ruleForm.major = this.classNum[0]
        this.$axios.post('http://47.94.90.140:8000/post',
          this.ruleForm
          ,{
            headers:{
              'content-type': 'application/json;charset=UTF-8'
            }
          }
        ).then(res=>{
          console.log(res.data);
          alert(res.data.message);
        }).catch(error=>{
          console.log(error);
          alert(error.data.message);
        })
      
  }
}
}
</script>


<style scoped>
.choose{
  width: 400px;
  height: 500px;
  display: flex;
  /* justify-content: center;  */
  align-items: center;
  vertical-align: middle;
  flex-direction: column;
  margin: auto; 
}
.input{
  width: 100%;
  margin-top: 10px;
  display: flex;
}
.sss{
  width: 100%;
}
.www{
  margin: 0 auto;
}
.button{
  margin-top: 15px;
}
.btn{
  width: 300px;
}
h2{
  margin: 0 auto;
} 
h4{
  margin: 0 auto;
  margin-top: 20px;
} 
</style>