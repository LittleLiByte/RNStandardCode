---
title: RN 开发规范
tags: React Native,规范
---
## RN项目结构规范
当我们通过 `react-native init XXXProject` 创建一个新工程后,一般是在当前项目根目录中新建一个js(或app)文件夹，用来存放js相关的代码以及资源。这时工程结构大致如下(有省略)：
```
.
├──__tests__                   			单元测试代码文件夹
├──android                  			android原生代码文件夹
├──ios									ios原生代码文件夹
├──js									React Native JS代码
├──node_modules							React Native依赖库
├── index.android.js					RN Android入口文件
├── index.ios.js						RN iOS入口文件
└──package.json							React Native依赖库配置文件
```
好的目录划分能更好的控制程序结构，让程序具有更高的可读性和可维护性。通常在React Native开发中，js文件夹中可以参考以下工程目录结构：
```
js(app)
├── component 						可复用的组件（非完整页面），该文件夹内可按业务或功能模块再细分
├── page							完整页面，该文件夹内可按业务再细分
├── config							配置项（常量、接口地址、路由、多语言化等预置数据）
├── util							工具类（非UI组件),该文件夹内可按功能模块再细分
├── image							图片		
└── root.js							统一index.android.js和index.ios.js入口
```
 ps.下面的划分方式的工程中未使用[**Redux**][1]和[**Redux-Saga**][2]，并且在对RN比较了解之前也不太建议使用。如果使用了这两个组件框架，工程目录结构也会有所不同。
 
 使用**Redux**框架的RN工程可以参考以下工程目录结构
```
js(app)
├── action 							edux中的action部分
├── component 						可复用的组件（非完整页面），该文件夹内可按业务或功能模块再细分
├── config							配置项（常量、接口地址、路由、多语言化等预置数据）
├── image							图片		
├── page							完整页面，该文件夹内可按业务再细分
├── reducer							redux中reducer部分都在这里，reducer和action不一定是一一对应的
├── store							redux中store部分都在这里
├── util							工具类（非UI组件),该文件夹内可按功能模块再细分
└── root.js							统一index.android.js和index.ios.js入口
```
以上工程目录结构仅供参考，开发时请按照实际情况灵活调整！如果有更好的组织结构也欢迎提出讨论。


## RN项目代码规范
以下代码规范基于airbnb的react代码规范。

### 文件与组件命名

  - **扩展名**: 使用`.js`作为js文件的扩展名。如果同一个文件夹下有同名而不同作用的js文件，则通过中缀（小写）进一步区分，例如：`HomeView.component.js`,`HomeView.style.js`,`HomeView.action.js`等。
  - **文件名**: 使用驼峰命名法且首字母大写，如`HomeView.js`。
  - **组件命名**: 与文件名（除中缀外）完全一致。如果组件单独放置在目录中，则目录名也一致。  
  
    ```javascript
    // bad
    import Footer from './Component/Footer/FooterView'

    // good
    import Footer from './Component/Footer/Footer'

    // good
    import Footer from './Footer'
    ```


### 组件声明
  - 使用class与extends关键字。不使用React.createClass方法。需要导出的组件直接在class关键字前使用export default。
    ```javascript
    // bad
    export default React.createClass({
    });

    // good
    export default class HomeView extends Component {
    }
    ```

### 对齐
  - 按下面的案例对齐：

    ```javascript
    // bad
    <Foo superLongParam="bar"
         anotherSuperLongParam="baz" />

    // good
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    />

    // 如果一行能摆下props，那就摆在一行
    <Foo bar="bar" />

    // 子组件照常缩进
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    >
      <Spazz />
    </Foo>
    ```

### 引号
  - 对于JSX的字符串属性使用双引号(`"`)，其他情况下使用单引号。

    ```javascript
    // bad
    <Foo bar='bar' />

    // good
    <Foo bar="bar" />

    // bad
    <Foo style={{ left: "20px" }} />

    // good
    <Foo style={{ left: '20px' }} />
    ```

### 空格
  - 在自闭合的标签中包含一个空格。
    ```javascript
    // bad
    <Foo/>

    // very bad
    <Foo                 />

    // bad
    <Foo
     />

    // good
    <Foo />
    ```

### state/props
  - 对于多个单词组成的pros，使用驼峰命名法。不使用下划线或连接线。
    ```javascript
    // bad
    <Foo
      UserName="hello"
      phone_number={12345678}
    />

    // good
    <Foo
      userName="hello"
      phoneNumber={12345678}
    />
    ```
  - 读取state和props时，使用const与解构，必要时可使用let。不使用var。
    ```javascript
    // bad
    var userName = this.props.userName;
    let checked = this.state.checked;

    // good
    const { userName, age, sex } = this.props;
    const { checked } = this.state;
    ```  
    
### 括号
  - 当JSX标签超过一行时，使用括号包裹。
    ```javascript
    /// bad
    render() {
      return <MyComponent className="long body" foo="bar">
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent className="long body" foo="bar">
          <MyChild />
        </MyComponent>
      );
    }

    // good, when single line
    render() {
      const body = <div>hello</div>;
      return <MyComponent>{body}</MyComponent>;
    }
    ```

### 标签
  - 对于没有子组件的JSX标签，始终自闭合。
    ```javascript
    // bad
    <Foo className="stuff"></Foo>

    // good
    <Foo className="stuff" />
    ```

  - 如果组件有多行属性，则另起一行进行自闭合。
    ```javascript
    // bad
    <Foo
      bar="bar"
      baz="baz" />

    // good
    <Foo
      bar="bar"
      baz="baz"
    />
    ```

### 方法
  - 为方法命名时，不使用下划线开头（哪怕是想用作私有方法）。
    ```javascript
    // bad
    React.createClass({
      _onClickSubmit() {
        // do stuff
      }

      // other stuff
    });

    // good
    class extends React.Component {
      onClickSubmit() {
        // do stuff
      }

      // other stuff
    });
    ```

### 组件代码编写顺序

 - PropType声明 
 - 默认属性
 - 静态方法 
 - 构造函数(包含state)
 - 组件生命周期方法
 - 对外提供的公有方法
 - 私有方法，包括点击回调或者事件回调等等
 - 子组件的 render 方法 
 - 本组件的render方法

**示例：**

``` javascript
//ExampleComponent.js
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

export default class MyComponent extends Component {
    //PropType声明
    static propTypes = {
        sampleProp: PropTypes.bool.isRequired,
        data: PropTypes.object,
        fetchData: PropTypes.func
    };

    //默认属性
    static defaultProps = {
        sampleProp: true,
    };

    //如果需要定义static方法，放在这里
    static staticMethod() {
    }

    //constructor方法
    constructor(props) {
        super(props);
        this.state = {
            sampleState: this.props.sampleProp
        }
    }

    //生命周期方法（按需添加）
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps() { }
    shouldComponentUpdate() { }
    componentWillUpdate() {  }
    componentDidUpdate() { }
    componentWillUnmount() { }

    //准备公开给外部调用的方法
    publicMethod() {
    }

    //点击事件回调
    exampleOnPress = () => {
        console.log('exampleOnPress');
    };

    //子组件render方法
    renderSubComponent = () => {
        return <Text style={styles.exampleText}>This is the sample component</Text>
    };

    //本组件render方法
    render() {
        if (this.state.sampleState) {
            return (
                <TouchableOpacity onPress={this.exampleOnPress}>
                    <View style={styles.container}>
                        {this.renderSubComponent()}
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    exampleText: {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
```
**几点说明：**

 - 本代码规范并不能涵盖全部情况，如有需要可自行修改，规范是死的，人是活的，并且规范也并不是唯一的，但大家按照同一个规范来开发，代码可读性和可维护性自然会比较高。
 - 关于私有方法名前需不需要添加下划线“_”并没有规定，可加可不加，只是约定俗成的，并且js中没有“私有变量”这种东西。不过选择加了最好就保持一致的代码风格，不要两者皆有。

## 代码风格控制-ESLint
ESLint是一个QA工具，用来避免低级错误和统一代码的风格。在`.eslintrc.js`配置后，就可以检查代码风格是否统一。
在p`ackage.json`文件中`devDependencies`的添加以下依赖：

``` json
 	"babel-eslint": "^7.2.3",
    "eslint": "^4.3.0",
    "eslint-config-airbnb": "^15.1.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^5.1.1",
    "eslint-plugin-react": "^7.1.0",
    "eslint-plugin-react-native": "^3.0.1",
```

然后在scripts节点下添加以下脚本项：

``` avrasm
  "lint": "eslint  js"
```
ps. **js**为JS代码存放的文件夹
然后运行`npm run lint`命令即可检查代码规范。


## RN项目svn可忽略文件说明
在RN开发中不需要提交svn文件请参考`.gitignore`文件内容,一般来说，编译生成的文件（例如build目录），通过配置或脚本运行生成的文件（例如node_modules目录）是不需要提交svn的。

## RN项目脚本简单使用
在**package.json**文件中，我们可以在**scripts**节点配置我们需要使用的命令，只要配置好就可以省去我们每次执行时都要敲命令的麻烦。脚本配置为**key-value**形式，key为脚本名可随意指定，一般简短且见名知意最好，这里展示几个常用的脚本，如有需要可以直接复制到项目中使用。

``` json
	"scripts": {
		"start": "node node_modules/react-native/local-cli/cli.js start",
		"run-android": "node node_modules/react-native/local-cli/cli.js run-android",
		"run-ios": "node node_modules/react-native/local-cli/cli.js run-ios",
		"bundle-android": "node node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/",
		"bundle-ios": "node node_modules/react-native/local-cli/cli.js bundle --entry-file index.ios.js --bundle-output ./ios/main.jsbundle --platform ios --assets-dest ./ios --dev false",
		"test": "jest"
	},
```
**说明**：

 - **start**：启动React Native服务
 - **run-android**：运行React Native Android端。如果需要指定设备，请在后面追加参数“**--deviceId <设备ID字符串>**”。其中设备id可以通过命令`adb devices`查看。如果有多个设备连接并且不指定设备ID，则将会在所有连接设备运行。
 -  **run-ios**：运行React Native iOS端。如果需要指定设备，请在后面追加参数“**--simulator <设备型号>**”，其中设备型号可以iPhone 6，iPhone 7 Plus等等
 -  **bundle-android**：打包React Native Android离线包，这里有个前提是需要在Android工程中的`/app/src/main`目录下新建一个`assets`文件夹，用来存放离线包。可根据实际情况修改打包参数
 -  **bundle-ios**：打包React Native iOS离线包，可根据实际情况修改打包参数，特别是离线包存放路径
脚本运行方式：在项目根目录下运行 `npm run <脚本名>`。

如果使用的IDE是WebStorm，还可以直接配置脚本运行。以**bundle-android**为例，选择`Edit Configurations...`，然后在新弹出窗口左上角点击"+"按钮并选择npm一项。

![enter description here][3]

![enter description here][4]

![enter description here][5]
修改Name并在Scrtpts一项中选择`bundle-android`,然后点击**Apply**保存关掉弹窗。此时在Webstorm右上角就会出现一个`bundle-android`可运行项，运行该项即可打包出Android离线包。

![enter description here][6]

## 网络请求简单封装

  [1]: https://github.com/reactjs/redux
  [2]: https://github.com/yelouafi/redux-saga/
  [3]: http://om2bpqram.bkt.clouddn.com/1501055013489.jpg
  [4]: http://om2bpqram.bkt.clouddn.com/1501055286521.jpg
  [5]: http://om2bpqram.bkt.clouddn.com/1501056088823.jpg
  [6]: http://om2bpqram.bkt.clouddn.com/1501055763509.jpg
