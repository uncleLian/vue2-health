<template>
    <div class="loading" v-if='visible'>
        <i class="el-icon-loading"></i>数据加载中...
    </div>
</template>
<script>
export default {
    props: {
        visible: Boolean
    }
}
</script>
<style scoped lang='stylus'>
.loading {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #20a0ff;
    font-size: 14px;
    i {
        margin-right: 5px;
    }
}
</style>