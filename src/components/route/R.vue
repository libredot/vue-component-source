<template>
    <div class="r">
        component r works!
    </div>
</template>

<script>
import First from "src/components/first/First.vue"
import Second from "src/components/first/Second.vue"
import Test from "src/components/test/Test.vue"

export default {
    data () {

    },

    components: {     
        First,
        Second,
        Test
    }
    
}
</script>

<style lang="scss" scoped>
.r {

}
</style>