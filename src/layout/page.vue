<template>
	<el-main id="page">
        <transition name="el-fade-in-linear" mode="out-in">
            <my-view></my-view>
        </transition>
    </el-main>
</template>
<script>
export default {
    name: 'page'
}
</script>
<style lang='stylus'>
#page {
    position: relative;
    width: 934px;
    height: fit-content;
    min-height: 100%;
    background: #fff;
    overflow: inherit;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
    margin-left: 24px;
    font-size: 14px;
    padding: 0;
}
</style>
