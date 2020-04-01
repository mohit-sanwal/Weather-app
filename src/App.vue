<template>
  <div id="app">
    <keep-alive><router-view /></keep-alive>
  </div>
</template>

<script>
import "./assets/js/script";

export default {
    // watch: {
    // },
    data() {
        return {
        };
    },
    activated() {
    },
    deactivated() {
    },
    created() {
    },
    mounted() {
        // this.$store.dispatch("loggedIn");
    },
    updated() {
    },
    methods: {
    },
    computed: {
    },
    components: {
    },
};
</script>
