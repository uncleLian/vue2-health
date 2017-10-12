<template>
    <div id="footer">
        <div class="footer_wrap">
            <a href="" title="">关于健康头条</a>
            <span>|</span>
            <a href="" title="">用户协议</a>
            <span>|</span>
            <a href="" title="">运营规范</a>
            <span>|</span>
            <a href="" title="">侵权投诉</a>
            <span>|</span>
            <a href="" title="">联系我们</a>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang='stylus'>
#footer {
    position: relative;
    width: 100%;
    height: 140px;
    .footer_wrap {
        position: absolute;
        width: 100%;
        bottom: 10px;
        font-size: 0;
        text-align: center;
        color: #999;
        line-height: 32px;
        a {
            color: inherit;
            font-size: 14px;
            margin: 0 12px
        }
        span {
            color: inherit;
            font-size: 14px;
        }
    }
}
</style>