<template>
    <div id="material">
        <el-tabs class='tab_main' v-model='activeName'>
            <el-tab-pane label="图片管理" name="pic"></el-tab-pane>
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
#material {
    
}
</style>