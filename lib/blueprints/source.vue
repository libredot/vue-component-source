<template>
    <div class="{{name}}">
        component {{name}} works!
    </div>
</template>

<script>
{% for component in components %}import {{ component.name }} from "{{ component.path }}"
{% endfor %}
export default {
    name: '{{name}}',
    data () {
        return {

        }
    },

    methods: {
        // TODO
    },

    components: {     {% for component in components %}
        {% if !loop.last %}{{ component.name }},{% else %}{{ component.name }}{% endif %}{% endfor %}
    }
}
</script>

<style lang="{{ lang }}" scoped>
.{{name}} {

}
</style>