<template>
    <div class="error" v-if='visible' @click.stop="reload">
        <i class="el-icon-circle-cross"></i>请求错误，点击重新加载
    </div>
</template>
<script>
export default {
    props: {
        visible: Boolean,
        reload: Function
    }
}
</script>
<style scoped lang='stylus'>
.error {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #ff4949;
    cursor: pointer;
    font-size: 14px;
    i {
        margin-right: 5px;
    }
}
</style>