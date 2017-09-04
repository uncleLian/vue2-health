<template>
    <div id="menu">
        <el-menu :default-active="activeName" :router="true" :default-openeds="['manage']"> 
            <!-- home -->
            <el-menu-item index="/index/home"><i class="el-icon-message"></i>主页</el-menu-item>
            <el-submenu index="manage">
                <template slot="title"><i class="el-icon-message"></i>管理</template>
                <!-- article -->
                <el-menu-item index="/index/article">内容管理</el-menu-item>
                <el-menu-item index="/index/comment">评论管理</el-menu-item>
                <el-menu-item index="/index/material">素材管理</el-menu-item>
            </el-submenu>
            <!-- count -->
            <el-menu-item index="/index/count"><i class="el-icon-menu"></i>统计</el-menu-item>
            <!-- setting -->
            <el-menu-item index="/index/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
            <el-menu-item index="/index/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
            <el-menu-item index="/index/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
            <el-menu-item index="/index/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
            <el-menu-item index="/index/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
            <el-menu-item index="/index/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
            <el-menu-item index="/index/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'home'
        }
    },
    computed: {
        menuActive() {
            let activeRoute = this.$route.path
            let routerArr = [
                '/index/home',
                '/index/article',
                '/index/comment',
                '/index/material'
            ]
            for (var i = 0; i < routerArr.length; i++) {
                if (activeRoute.includes(routerArr[i])) {
                    return routerArr[i]
                }
            }
        }
    },
    watch: {
        $route(val) {
            this.activeName = this.menuActive
        }
    },
    created() {
        this.activeName = this.menuActive
    }
}
</script>
<style lang='stylus'>
#menu {
    position: relative;
    display: inline-block;
    width: 180px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
    min-height: inherit;
    background: #fff;
    font-size: 14px;
    .el-menu {
        background: #fff;
    }
    .el-submenu .el-menu-item {
        padding: 0 45px !important;
        min-width: 180px;
    }
    .el-submenu .el-menu {
        background: #fff !important;
    }
}
</style>