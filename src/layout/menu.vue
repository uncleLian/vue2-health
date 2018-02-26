<template>
    <el-aside id="menu" width="240px">
        <el-menu class="el-menu-container" :default-active="$route.name" :default-openeds="defaultOpeneds">
            <my-menu-item :json="filterRoutes"></my-menu-item>
        </el-menu>
    </el-aside>
</template>
<script>
import { routes } from '@/router'
export default {
    name: 'my-menu',
    data() {
        return {
            filterRoutes: [],       // 过滤后的路由
            defaultOpeneds: []      // 默认打开的二级菜单
        }
    },
    methods: {
        // 过滤路由
        handleRoutes(Arr) {
            const Routes = Arr.filter(route => {
                if (route.name) {
                    if (route.hidden) {
                        return false
                    } else {
                        if (!route.open) {
                            this.defaultOpeneds.push(route.name)
                        }
                        if (route.children) {
                            route.children = this.handleRoutes(route.children)
                        }
                        return true
                    }
                } else {
                    return false
                }
            })
            return Routes
        },
        // 过滤出index路由
        handleIndexRoutes() {
            let filterRoutes = this.handleRoutes(routes)
            let indexRoutes = filterRoutes[0]
            if (indexRoutes.name === 'index' && indexRoutes.children) {
                this.filterRoutes = indexRoutes.children
            }
        }
    },
    created() {
        this.handleIndexRoutes()
    }
}
</script>
<style lang='stylus'>
menuWidth = 180px
#menu {
    position: relative;
    width: menuWidth !important;
    height: fit-content;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
    background: #fff;
    font-size: 14px;
    user-select: none;
    .el-submenu .el-menu-item{
        min-width: menuWidth;
    }
    .el-menu-item{
        &.is-active{
            color: #303133;
        }
        &:focus{
            background: #fff;
        }
        i{
            color: #909399;
        }
    }
    .router-link-active > .el-menu-item {
        background: appColor;
        color: #fff;
        i{
            color: #fff!important;
        }
    }
}
</style>
