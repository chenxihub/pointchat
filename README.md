## PointChat



```json
{
  "name": "pointchat",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "express": "^4.16.3",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-scripts": "1.1.1",
    "redux": "^3.7.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```


### WebStorm
 

## 安装依赖的第三方工具
```sh
npm install  express --save
```
```sh
npm install -g nodemon
```
```sh
brew install mongodb
```
```sh
npm install mongoose --save
```
```diff
  "scripts": {
+   "precommit": "lint-staged",
    "start": "react-scripts start",
    "build": "react-scripts build",
```


