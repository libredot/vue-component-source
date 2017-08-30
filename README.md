### VCS的哲学
一般的项目中，我们总是将零散的、可复用的组件放在components目录中，将组件组装成的视图放在views目录中。

### 介绍

VCS是Vue-Component-Source的缩写，意为组件的源泉，可以源源不断地生成一个个Vue组件（.vue单文件组件）。它主要有三个核心功能：

    1. 在特定路径下生成一个基本的Vue单文件组件(-n 参数, layouts/Header表示在src/components/layouts目录下生成一个Header.vue文件)
    2. 在生成组件时可以将依赖的组件自动import到新生成的组件中(-d 参数, 多个依赖用逗号隔开, 只能是已经存在的组件)
    3. 在必要时,将生成的组件import到路由配置文件中(-r 参数, 目前只是简单地import文件而不能自动生成对应的route配置,因为各人写route配置的时候差别过大,正在解决中)


### 用法

> - VCS **必须**在项目跟目录下运行, *配置中用到的一切路径都是相对于根目录下的路径*,例如,componentsDir的目录路径为src/components, 也就是说,必须在项目根目录下的src/components目录下.若要更改此参数也应以此为对照. viewsDir/routerPath与之相同

> - VCS可直接通过命令行传入配置参数，但是更好的选择是在项目根目录下创建一个.vcsrc.js文件，存储vcs需要用到的配置信息, 类似于.babelrc/webpack.config.js等

1. 最基础的用法

    `vcs -n FirstComponent `
    > 这个命令会生成会读取.vcsrc配置文件中的component选项，找到存放component的路径（默认为src/components），文件内容为一个vue组件通常都包含的内容. 并且将FirstComponent文件所在位置加入到.vcsrc配置文件的src选项中。假设想要在comoponents/layouts/目录下生成一个TestComponents组件， 可以使用 vcs layouts/TestComponent命令。生成视图的方式与之类似，只需加一个-v参数，读取的是view选项，并且默认为src/views目录

2. 自动import依赖的组件

    `vcs SecondComponent -d FirstComponent`
    > 这个命令会生成一个SecondComponent. 并且会在componentsDir和viewsDir制定的目录下递归查找同名的组件,若存在多个同名的组件,会有一个选择其中一个组件的步骤,只需按键盘上下键选中后回车即可.

3. 将组件加入到路由

    `vcs user/info/detail -v -d FirstComponent SecondComponent -r`

    > 这个命令是一个最完整的vcs命令。表示在src/views/user/info目录下生成一个视图组件，这个组件依赖FirstComponent和SecondComponent, 并且会在route配置文件合适的位置新添加一行
    `import detail from 'src/vews/user/info/detail.vue'`

### 例子

```
vcs -n Hello
vcs -n home -v -d Hello -r
```

生成的Hello.vue:

```
<template>
    <div class="hello">
        Component Hello works!
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
```

生成的home.vue

```
<template>
    <div class="home">
        Component home works!
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
```

生成的router配置文件

```
    import Vue from 'vue'
    import Router from 'vue-router'
    import home from '@/components/home'

    Vue.use(Router)

    ...
```

### License
[MIT](http://opensource.org/licenses/MIT)

### 最后
项目尚未完成，如果您对文档中描述的特性有兴趣想要做第一批的使用者，或是也有一些有意思的想法想要交流，欢迎加入QQ群：166540148。要是使用中出现什么问题欢迎@我，看到就会在第一时间解答。此群保留至VCS能成熟使用。