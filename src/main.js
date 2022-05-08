import Vue from 'vue'
import App from './App.vue'

// 引入路由
import VueRouter from 'vue-router';

// 按需引入ElementUI
import {Input,Select,Option,Switch,Button, Cascader,Container, Main, Form, FormItem,Image, Header, Aside, Menu, Submenu, MenuItemGroup, MenuItem, BreadcrumbItem,Breadcrumb, Table, Pagination, TableColumn, RadioGroup, RadioButton, Dialog} from 'element-ui';

// 引入路由器
import router from './router';

Vue.config.productionTip = false

// 引入axios
import axios from 'axios';

// 按需引入ui
Vue.component(Input.name,Input);
Vue.component(Cascader.name,Cascader);
Vue.component(Option.name,Option);
Vue.component(Switch.name,Switch);
Vue.component(Button.name,Button);
Vue.component(Select.name,Select);
Vue.component(Container.name,Container);
Vue.component(Main.name,Main);
Vue.component(Form.name,Form);
Vue.component(FormItem.name,FormItem);
Vue.component(Image.name,Image);
Vue.component(Header.name,Header);
Vue.component(Aside.name,Aside);
Vue.component(Menu.name,Menu);
Vue.component(Submenu.name,Submenu);
Vue.component(MenuItemGroup.name,MenuItemGroup);
Vue.component(MenuItem.name,MenuItem);
Vue.component(BreadcrumbItem.name,BreadcrumbItem);
Vue.component(Breadcrumb.name,Breadcrumb);
Vue.component(Table.name,Table);
Vue.component(Pagination.name,Pagination);
Vue.component(TableColumn.name,TableColumn);
Vue.component(RadioGroup.name,RadioGroup);
Vue.component(RadioButton.name,RadioButton);
Vue.component(Dialog.name,Dialog);
Vue.component(Form.name,Form);


// 使用路由
Vue.use(VueRouter);
// 使用axios
Vue.prototype.$axios = axios;


new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
// http request 拦截器
axios.interceptors.request.use(
  config => {
    var token = sessionStorage.getItem('token');
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      token =sessionStorage.getItem('token')+':';
      config.headers.Authorization = `Basic ${new Buffer(token).toString('base64')}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });