### VCS的哲学
一般的项目中，我们总是将零散的、可复用的组件放在components目录中，将组件组装成的视图放在views目录中。VCS基于此设计。若有不符，则需要多花费一些时间来做配置。

### 介绍
VCS是Vue-Component-Source的缩写，意为组件的源泉，可以源源不断地生成一个个Vue组件（.vue单文件组件）。它主要有三个核心功能：

1. 在特定路径下生成Vue单文件组件的模板
2. 在生成组件时可以将依赖的组件自动import到新生成的组件中
3. 在必要时，将组件加入到项目路由中。


### 用法
> - VCS应该在项目跟目录下运行
> - VCS可直接通过命令行传入配置参数，但是更好的选择是在当前目录下创建一个.vcsrc文件，存储vcs需要用到的配置信息

1. 最基础的用法

    vcs FirstComponent 
    > 这个命令会生成会读取.vcsrc配置文件中的component选项，找到存放component的路径（默认为src/components），文件内容为一个vue组件通常都包含的内容. 并且将FirstComponent文件所在位置加入到.vcsrc配置文件的src选项中。假设想要在comoponents/layouts/目录下生成一个TestComponents组件， 可以使用 vcs layouts/TestComponent命令。生成视图的方式与之类似，只需加一个-v参数，读取的是view选项，并且默认为src/views目录

2. 自动import依赖的组件

    vcs SecondComponent -d FirstComponent
    > 这个命令会生成一个SecondComponent.并且会在.vcsrc配置的src选项中查找属性为FirstComponent的项，如果找到，则取其值为import时的组件路径，如果没有，则递归查找.vcsrc配置文件中指明的component和view所在目录，如果目录中找到了该组件，则以找到的路径为import路径， 否则报错‘component not found’，并取消自动import步骤，此时需要用户手动添加。-d后可跟多个参数，不同的参数用空格隔开。表示依赖多个组件。依赖多个组件时如果有个别组件不存在，则只有不存在的组件需要手动引入，其余组件一切正常

3. 将组件加入到路由

    vcs user/info/detail -v -d FirstComponent SecondComponent -r /user info detail

    > 这个命令是一个最完整的vcs命令。表示在src/views/user/info目录下生成一个组件，这个组件依赖FirstComponent和SecondComponent，并且将这个组件加入到path为'/user'的路由选项的children的path为'info'的选项的children中，path为'detail'。如果是在顶级路由则直接为-r /user/:id。默认的router配置文件为src/router/index.js，若有不同则可以在.vcsrc的router选项中配置router文件的路径

### 例子
    
    vcs Hello
    vcs home -v -d Hello -r /home

生成的Hello.vue:

    <template>
        <div class="hello">
            <h3>Hello Component did works!</h3>
        </div>
    </template>

    <script>
    export default {
        name: 'hello',
        data () {
            return {

            }
        },
        methods: {
            // TODO
        }
    }
    </script>

    <style lang="scss">
        .hello {

        }
    </style>

生成的home.vue

    <template>
        <div class="home">
            <h3>Home View did works!</h3>
        </div>
    </template>

    <script>
    import Hello from 'src/components/Hello'
    export default {
        name: 'home',
        data () {
            return {

            }
        },
        methods: {
            // TODO
        },
        components: {
            Hello
        }
    }
    </script>

    <style lang="scss">
        .home {

        }
    </style>

生成的router配置文件
    import Vue from 'vue'
    import Router from 'vue-router'
    import home from '@/components/home'

    Vue.use(Router)

    export default new Router({
        routes: [
            {
                name: 'home',
                path: '/home',
                component: home
            }
        ]
    })

### License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2017-present, DoubleGe

### 最后
哈哈哈哈哈哈哈~ 项目正在赶工中...