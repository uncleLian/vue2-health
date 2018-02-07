<template>
    <div id="setting">
        <my-tabs class="tab_main" :json="json"></my-tabs>
        <my-view></my-view>
    </div>
</template>
<script>
export default {
    name: 'setting',
    data() {
        return {
            json: [
            {
                label: '没有选项',
                name: 'home'
            }
            ]
        }
    }
}
</script>
<style lang='stylus'>
#setting {
    
}
</style>