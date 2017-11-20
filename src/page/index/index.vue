<template>
    <div id="index">
        <my-header></my-header>
        <div id="layout">
            <my-menu></my-menu>
            <div id="page">
                <keep-alive include="count">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <my-footer></my-footer>
        <my-sidebar></my-sidebar>
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
    #layout {
        position: relative;
        width: 1138px;
        min-width: 1138px;
        margin: 36px auto 0;
        font-size: 0;
    }
    #page {
        position: relative;
        display: inline-block;
        width: 934px;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
        min-height: inherit;
        margin-left: 24px;
        font-size: 14px;
        vertical-align: top;
        background: #fff;
    }
}
</style>