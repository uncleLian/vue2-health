<template>
    <div id="material">
        <my-tabs class="tab_main" :json="json"></my-tabs>
        <my-view></my-view>
    </div>
</template>
<script>
export default {
    name: 'material',
    data() {
        return {
            json: [
                {
                    label: '图片收藏',
                    name: 'pic'
                }
            ]
        }
    }
}
</script>
<style lang='stylus'>
#material {
    
}
</style>