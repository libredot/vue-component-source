<template>
    <div class="{{name}}">
        component {{name}} works!
    </div>
</template>

<script>
{% for component in components %}import {{ component.name }} from "{{ component.path }}"
{% endfor %}
export default {
    {% if (components.length === 0) %}data () {

    }
    {% else %}data () {

    },

    components: {
    {% for component in components %}
        {% if !loop.last %} {{ component.name }},
        {% else %} {{ component.name }} {% endif %} {% endfor %}
    }
    {% endif %}
}
</script>

<style lang="{{ lang }}" scoped>
.{{name}} {

}
</style>