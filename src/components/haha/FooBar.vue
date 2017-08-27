<template>
    <div class="foo-bar">
        component foo-bar works!
    </div>
</template>

<script>
import Header from "layouts/Header"
import Tool from "src/components/common/Tool.vue"

export default {
    data () {

    },

    components: {
    
         Header,
         
         Tool  
    }
    
}
</script>

<style lang="scss" scoped>
.foo-bar {

}
</style>