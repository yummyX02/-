<template>
  <div class="tip">
    <div class="img">
      <!-- <el-image :src="src" id="img"></el-image> -->
      <h5>学生组织报名管理</h5>
      
    </div>
  </div>
</template>

<script>
export default {
  name:'ManagerHeader',
  data() {
    return{
    src:'https://s4.ax1x.com/2022/03/02/b1X66x.jpg'

    }
  }
}
</script>

<style scoped>

/* .img{
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  margin-left: 0;
  align-content: space-around;
} */
/* .user{
  float: right;
} */
h5{
  color: aliceblue;
  margin-left: 20px;
}
</style>