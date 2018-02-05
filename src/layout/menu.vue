<template>
    <div id="menu">
        <el-menu :default-active="activeName" :router="true" :default-openeds="['writer','manage']"> 
            <!-- home -->
            <el-menu-item index="/index/home"><i class="el-icon-fa-home el-icon-fa-lg"></i>主页</el-menu-item>

            <!-- writer -->
            <el-submenu index="writer">
                <template slot="title"><i class="el-icon-fa-pencil el-icon-fa-lg"></i>写作</template>
                <el-menu-item index="/index/search">素材搜索</el-menu-item>
                <el-menu-item index="/index/publish">发表作品</el-menu-item>
                <el-menu-item index="/index/article">我的作品</el-menu-item>
            </el-submenu>

            <!-- manage -->
            <el-submenu index="manage">
                <template slot="title"><i class="el-icon-fa-cube el-icon-fa-lg"></i>管理</template>
                <el-menu-item index="/index/comment">评论管理</el-menu-item>
                <el-menu-item index="/index/material">素材管理</el-menu-item>
            </el-submenu>

            <!-- count -->
            <el-menu-item index="/index/count"><i class="el-icon-fa-bar-chart el-icon-fa-lg"></i>统计</el-menu-item>

            <!-- setting -->
            <el-menu-item index="/index/setting"><i class="el-icon-fa-cog el-icon-fa-lg"></i>设置</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: '/index/home'
        }
    },
    computed: {
        menuActive() {
            let activeRoute = this.$route.path
            let routerArr = [
                '/index/home',
                '/index/search',
                '/index/publish',
                '/index/article',
                '/index/comment',
                '/index/material',
                '/index/count',
                '/index/setting'
            ]
            for (var i = 0; i < routerArr.length; i++) {
                if (activeRoute.includes(routerArr[i])) {
                    return routerArr[i]
                }
            }
            return ''
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
menuWidth = 180px
#menu {
    position: relative;
    display: inline-block;
    width: menuWidth;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
    min-height: inherit;
    background: #fff;
    font-size: 14px;
    user-select: none;
    .el-submenu .el-menu-item{
        min-width: menuWidth;
    }
    .el-menu-item.is-active{
        background: appColor;
        color: #fff;
        i{
            color: #fff!important;
        }
    }
}
</style>