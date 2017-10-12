<template>
    <div id="setting">
        <el-tabs class='tab_main' v-model='activeName'>
            <el-tab-pane label="没有选项" name="pic"></el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'pic'
        }
    }
}
</script>
<style lang='stylus'>
#setting {
    
}
</style>