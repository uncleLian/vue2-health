<template>
    <div id="work">
        <el-tabs class='tab_main' v-model='activeName'>
            <el-tab-pane label="我发表的" name="own"></el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'work',
    data() {
        return {
            activeName: 'own'
        }
    }
}
</script>
<style lang='stylus'>
#work {
    min-height: inherit;
}
</style>