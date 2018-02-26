<template>
    <div id="index">
        <el-container id="verContainer" direction="vertical">
            <my-header></my-header>
            <el-container id="horContainer" direction="horizontal">
                <my-menu></my-menu>
                <my-page></my-page>
            </el-container>
            <my-footer></my-footer>
        </el-container>
    </div>
</template>
<script>
export default {
    name: 'index',
    mounted() {
        $(function() {
            $('#page').css({ 'min-height': $('#menu').height() })
        })
    }
}
</script>
<style lang='stylus'>
#index {
    position: relative;
    width: 100%;
    background: #f4f5f6;
    #horContainer {
        position: relative;
        width: 1138px;
        min-width: 1138px;
        margin: 36px auto 0;
        font-size: 0;
        .pageView {
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
    }
}
</style>