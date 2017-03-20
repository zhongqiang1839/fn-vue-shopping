import Vue from 'vue';
import VueRouter from 'vue-router';

const listVue = resolve => require(['./views/list'], resolve);

const welcomeVue = resolve => require(['./views/welcome'], resolve);

const indexVue = resolve => require(['./views/index'], resolve);

const itemVue = resolve => require(['./views/item'], resolve);

const orderVue = resolve => require(['./views/order'], resolve);

const cartVue = resolve => require(['./views/cart'], resolve);

const userCenterVue = resolve => require(['./views/userCenter'], resolve);

const addressVue = require('./views/city');


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path:'*',
            name: 'indexPage',
            component: indexVue,
            meta: {
              title:"飞牛网首页"
            }
        },
        {
            path: '/index/',
            name: 'indexPage',
            component: indexVue,
            meta: {
                reqiuresToken:true,
                title:"飞牛网首页"
            }
        },
        {
            path: '/address/',
            name: 'address',
            component: addressVue,
            meta: {
                reqiuresToken:true,
                title:"地址选择"
            }
        },
        {
            path: '/login/',
            name: 'indexPage',
            component: require("./views/login.vue"),
            meta: {
                reqiuresToken:true,
                title:"登录"
            }
        },
        {
            path: '/item/',
            name: 'itemPage',
            component: itemVue,
            meta: {
                reqiuresToken:true,
                title:"商品详情页"
            }
        },
        {
            path: '/cart/',
            name: 'cartPage',
            component: cartVue,
            // this field can be used by requireAuth
            meta: {
                reqiuresToken:true,
                requiresLogin: true,
                title:"购物车页"
            }
        },
        {
            path: '/userCenter/',
            name: 'userCenterPage',
            component: userCenterVue,
            meta: {
                reqiuresToken:true,
                title:"用户中心页"
            }
        },
        {
            path: '/search/',
            name: 'searchPage',
            component: listVue,
            meta: {
                reqiuresToken:true,
                title:"搜索页"
            }
        },
        {
          path: '/order/',
          name: 'order',
          component: orderVue
        },
        {
            path: '/list/',
            name: 'listKeyCate',
            component: listVue
        },
        {
            path: '/category/:cate',
            name: 'categoryKw',
            component: listVue,
            meta: {
                reqiuresToken:true,
                title:"分类页"
            }
        }
    ]
})


/**
 * Before a route is resolved we check for
 * the token if the route is marked as
 * requireAuth.token
 */
router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.reqiuresToken)) {
        document.title = to.meta.title || document.title; //设置页面标题,
        //must have token, get token only
        $.getToken(()=> {
            if (to.matched.some(record => record.meta.requiresLogin)) {
                // this route requires auth, check if logged in
                // if not, redirect to login page.
                if (to.matched.some(record => record.meta.requiresLogin) && $.cookie.getH5("isLogin") !== 1){
                    next({
                        path: '/login',
                        query: { redirect: to.fullPath }
                    })
                } else {
                    next()
                }
            } else {
                next() //must be next()
            }
        },() => {
            $.toast("token获取失败");
        })
    } else {
        next() //must be next()
    }
})

export default router
