# yyl-admin-template

YYL快速后台启动模板,继承了vue-element-admin，集成团队需要的基本后台功能。

## Build Setup
```bash
# Clone project
git clone https://github.com/yuyuel/yyl-admin-template.git

# Install dependencies
npm install

# 切换淘宝源
npm install --registry=https://registry.npm.taobao.org

# Serve with hot reload at localhost:9528
npm run dev

# Build for production with minification
npm run build

# 生成bundle
npm run build --report
```

## 相关集成

### v-charts

基于 Vue2.0 和 echarts 封装的 v-charts 图表组件,

[文档连接](https://v-charts.js.org/#/)

### ElementUI库

基础UI库

[文档连接](https://element.eleme.cn/#/zh-CN)

### vue-element-admin

继承自vue-element-admin中的vue-admin-template，关于框架功能查看文档。

[文档连接](https://panjiachen.github.io/vue-element-admin-site/zh/)

### svg-icon

在阿里巴巴矢量图库，下载svg格式icon。导入src/icons/svg,即可使用，使用方式`<svg-icon icon-class="xxx" />`

[阿里巴巴矢量图库](https://www.iconfont.cn/)

### plopfile

通过运行`npm run new `来新建component或者view.创建基本模板。可进行进一步的配置。

[plopfile](https://github.com/amwmedia/plop)
