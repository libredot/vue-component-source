<template>
    <div class="ha">
        component ha works!
    </div>
</template>

<script>
import First from "src/components/first/First.vue"
import Second from "src/components/first/Second.vue"

export default {
    data () {

    },

    components: {     
         First,
         
         Second  
    }
    
}
</script>

<style lang="scss" scoped>
.ha {

}
</style>