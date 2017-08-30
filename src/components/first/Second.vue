<template>
    <div class="second">
        component second works!
    </div>
</template>

<script>
import Test from "src/components/test/Test.vue"
import Header from "layouts/Header"

export default {
    data () {

    },

    components: {
    
         Test,
         
         Header  
    }
    
}
</script>

<style lang="scss" scoped>
.second {

}
</style>