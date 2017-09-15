<template>
    <div class="loading" v-if='visible'>
        <slot><i class="el-icon-loading"></i>数据加载中...</slot>    
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
    color: #60a3f5;
    font-size: 14px;
    i {
        margin-right: 5px;
    }
}
</style>