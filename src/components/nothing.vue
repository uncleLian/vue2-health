<template>
    <div class="nothing" v-if='visible'>
        <slot>没有符合条件的文章</slot>
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
.nothing {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #999;
    font-size: 14px;
    margin: 15px 0;
}
</style>