# 工具类 #  

## 引用 ##  

### 设置 npm scope ###  

一般的 `npm` 或 `yarn` 会首先使用 `.mpmrc` 文件配置中的 `scope` 配置  
无 `.npmrc` 文件时使用 `npm` 配置中的 `scope` 配置  
以下配置中 有其中之一即可  

1. 设置 `npm config`  
    ```shell
    npm config set @insgeek:registry http://nexus.insgeek.cn/repository/npm-host/
    ```  
    此时 `npm config list` 中会有如下配置  
    ```shell
    @insgeek:registry = "http://nexus.insgeek.cn/repository/npm-host/"
    ```  

2. 项目中配置 `.npmrc`  
    在 `.npmrc` 文件中添加如下配置  
    ```shell
    @insgeek:registry = "http://nexus.insgeek.cn/repository/npm-host/"
    ```

### 引用 ###  

设置 `scope` 后即可引入  

1. 引入  
    项目中执行 `yarn add @insgeek/util` 引入此工具类  
  
2. 引用  
    所有函数均可以直接导出 `import { useState } from "@insgeek/util"`  

3. 按需加载  
    由于各文件写法错误暂无时限方法  

## 测试 ##  

目前项目中无测试用例 需要通过 `yarn link` 链接入业务项目进行测试

1. 执行 `yarn install` 安装依赖  
2. 执行 `yarn dev` 进行开发测试  
    此时会启动文件监视 `src` 目录中的文件 有修改时将自动重新打包  
3. 执行 `cd dist` 并执行 `yarn link` 关联库  
4. 在业务项目中执行 `yarn link @insgeek/util`  

## 打包发版 ##  

目前项目只能使用 `yarn` 命令进行打包发板 `npm` 发板时报错且原因不明  

1. 登录私有 `npm`  
    此步骤在未登录时只需执行一次  
    执行 `yarn login http://nexus.insgeek.cn/repository/npm-host/` 登录本地源  
    `npm username` 为 `insgeek` 此条为必须  
    `npm email` 为 `wei.chen@insgeek.com` 此条为必须  
  
2. 发板  
    执行 `yarn build` 打包  
    执行 `cd dist/` 切换编译目录  
    执行 `yarn publish` 此时需要输入 `wei.chen@insgeek.com` 账号密码 详情咨询大喜哥(wei.chen@insgeek.com)  
    确认发布版本后即可  

    `http://nexus.insgeek.cn/#browse/search/npm` 搜索 insgeek scope 可查看历代版本发布包    

    **`yarn publish` 必须在 `/dist` 目录下执行**  
    **发板的编译包为 `/dist` 目录下的文件不是根目录**  

## 函数目录 ##  

* camelCase
    ```javascript
    // 字符串转驼峰
    camelCase("some boy_naMe-s") // "someBoyNameS"
    ```

* copy  
    ```javascript
    // 深拷贝
    const a = { a: "a" }
    copy(a) // { a: "a" }
    const b = ["a", "b"]
    copy(b) // ["a", "b"]
    ```

* debounce  
    ```javascript
    // 防抖
    const fn = debounce(() => { ... }, 500)
    ```

* fill  
    ```javascript
    // 前填充
    fillBefore("123", " ", 5) // "  123"
    // 后填充
    fillAfter("123", " ", 5) // "123  "
    ```

* flat  
    ```javascript
    // 展开数组
    flatArray(["a", ["b"], ["c", ["d"]]]) // ["a", "b", "c", "d"]
    // 展开对象
    const origin = {
      a: "a",
      key1: { b: "b", c: "c" },
      key2: { d: "d", e: "e" }
    }
    const option = {
      "a": "a",
      "key1.b": "b",
      "key2.e": "e"
    }
    flatObject(origin, option) // { a: "a", b: "b", e: "e" }
    ```

* hook  
    ```javascript
    // ref useState => [ref, setRef]
    const [num, setNum] = useState(1) // num.value => 1
    setNum(2) // num.value => 2
    setNum(() => 3) // num.value => 3
    // bool ref useBool => [ref, setRef]
    const [bo, setBo] = useBool(true) // bo.value => true
    setBo() // bo.value => false
    setBo(true) // bo.value => true
    setBo(() => false) // bo.value => false
    // reactive useModel => [reactive, setReactive]
    const defaultUser = { name: undefined, age: undefined }
    const [user, setUser] = useModel(defaultUser) // user => { name: undefined, age: undefined }
    setUser({ age: 18 }) // user => { name: undefined, age: 18 }
    setUser(() => ({ name: jack })) // user => { name: "jack", age: 18 }
    ```

* parse  
    ```javascript
    // 转数字
    parseNumber("123.5") // 123.5
    // 转日期时间格式
    parseDate("2022.01.01") // new Date("2022.01.01")
    parseDate("2022.01.01", "yyyy-MM-dd hh:mm:ss") // "2022.01.01 00:00:00"
    // json 转
    const json = '{ "a": "a", "b": "b" }'
    parseJson(json) // { a: "a", b: "b" }
    const errorJson = "{ a: a, b: b }"
    parseJson(errorJson) // undefined
    parseJson(errorJson, { a: "b" }) // { a: "b" }
    ```

* patch  
    ```javascript
    // 检索两个对象中不同的部分
    const origin = { a: "a", b: "b" }
    const target = { b: "c", d: "d" }
    patch(origin, target) // { a: undefined, b: "c", d: "d" }
    ```

* pick  
    ```javascript
    const origin = { a: "a1", b: "b1", c: "c1" }
    const target = { a: "a2", b: "b2" }
    const targetKeys = ["a", "b"]
    // 去除传入的字段
    pickExcept(origin, target) // { c: "c1" }
    pickExcept(origin, targetKeys) // { c: "c1" }
    // 只获取传入的字段
    pick(origin, target) // { a: "a1", b: "b1" }
    pick(origin, targetKeys) // { a: "a1", b: "b1" }
    ```

* storage  
    ```javascript
    // local storage
    const user = { name: "name" }
    storage.local.set("user", user)
    storage.local.get("user") // { name: "name" }
    // session storage
    storage.session.set("user", user)
    storage.session.get("user") // { name: "name" }
    ```

* throttle  
    ```javascript
    // 截流
    const fn = throttle(() => { ... }, 500)
    ```

* trim  
    ```javascript
    // 去空格
    trim("  ab c  ") // "ab c"
    trim(["  ab c  ", "ab "]) // ["ab c", "ab"]
    trim({ a: "  ab c  ", b: "ab " }) // { a: "ab c", b: "ab" }
    ```

* type  
    ```javascript
    // nil
    isNil(undefined) // true
    isNil(null) // true
    isNil(NaN) // true
    isNil("") // false
    isNil(0) // false
    isNil({}) // false
    isNil([]) // false
    // nil empty
    isNilEmpty(undefined) // true
    isNilEmpty(null) // true
    isNilEmpty(NaN) // true
    isNilEmpty("") // true <==
    isNilEmpty(0) // false
    isNilEmpty({}) // false
    isNilEmpty([]) // false
    // nil object
    isNilObject(undefined) // true
    isNilObject(null) // true
    isNilObject(NaN) // true
    isNilObject("") // true <==
    isNilObject(0) // false
    isNilObject({}) // true <==
    isNilObject([]) // true <==
    ```

* underCase  
    ```javascript
    // 转下划线
    underCase("some BoyName-s") // "some_boy_name_s"
    ```
