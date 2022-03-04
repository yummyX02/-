import VueRouter from "vue-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Manage from "../pages/Manage";
// 创建路由器
export default new VueRouter({
  routes:[
    {
      path:"/",
      component:Home
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/manage',
      component:Manage,
      
    },
  ],
  mode:"history",

})