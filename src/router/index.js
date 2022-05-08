import VueRouter from "vue-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Manage from "../pages/Manage";
// 创建路由器

const router = new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:"/home",
      component:Home
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/manage',
      component:Manage,
      
    },
  ],
  mode:"history",

})

//挂载路由导航守卫,控制页面访问权限

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  else if (to.path === '/home') return next();

  //获取token
  let tokenStr = sessionStorage.getItem('log_token')
  console.log(tokenStr);
  if (!tokenStr ) return next('/login')
  next()
})

export default router