# fn-vue-shopping

> fn-vue-shopping vue rebuild,  一个基于vue重写的飞牛网（大润发网上电子商城） 电商B2C 站点。


├── README.md
├── build              // 构建服务和webpack配置
├── deploy           // 基于 hexo-git 的一键发布到 github pages 服务
├── config            // 项目不同环境的配置
├── dist                // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 各种组件
│   ├── config          		//项目公共配置
│   ├── services         	//项目调用api 封装
│   ├── utils          // 全局的一些工具类
│   ├── views          // 各种页面
│   ├── store           // vuex状态管理器
│   ├──router.js        // 全局的 路由配置
│   ├── app.js           //入口文件
│   ├── main.vue       //vue全局的容器组件
│   ├── index.js       //elemeui  的引入

*备注* 引入饿了么UI的 源码，便于修改成自己需要的业务需求， 其实这样做不太好，不利于开源项目的开展。这是本人做的一个练习的小项目。也是为了方便学习element-ui的源码. 如果有什么不妥的地方，请联系本人删除。  **推荐使用 npm install element-ui -S**，  进行安装并使用 element-ui。


>email：zhongqiang1839@163.com


项目截图：

	首页：
![enter image description here](https://zhongqiang1839.github.io/static/img/index.png)




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
