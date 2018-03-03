## bookstore - fe
使用 create-react-app 构建
## 技术栈
react + redux + typescript + antd
## 开发
以 yarn 为例

安装依赖
```shell
yarn install
```
启动 dev 环境

```shell
yarn start
```

关于API proxy
方法1：可以charles 代理 api 到线上
方法2：
1.open -a Google\ Chrome --args --disable-web-security --user-data-dir ~/tmp/chrome/ 忽略跨域
2.控制台输入 localStorage.setItem('realIp', true) 强制改写 api host 
 
