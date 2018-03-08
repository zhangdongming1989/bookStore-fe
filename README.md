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
连线上：localStorage.setItem('realIp', 1) 然后开 charles 代理 api 到线上        
连本地 server  
step1.open -a Google\ Chrome --args --disable-web-security --user-data-dir ~/tmp/chrome/ 忽略跨域
step2.控制台输入 localStorage.setItem('realIp', 0)（或者把这条ls 清掉） 用线下 API 127.0.0.1:5000
 
