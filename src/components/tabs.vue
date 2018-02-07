<template>
    <el-tabs class='tabs' v-model='activeName'>
        <el-tab-pane v-for="(item,index) in json" :label="item.label" :name="item.name" :key="index"></el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    name: 'tabs',
    props: {
        json: Array
    },
    data() {
        return {
            activeName: this.$route.name
        }
    },
    watch: {
        activeName(val) {
            this.$router.push({ name: val })
        }
    }
}
</script>
<style lang='stylus'>
.tabs {}
</style>
