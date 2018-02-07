<template>
    <div id="articles">
        <my-tabs class="tab_main" :json="json"></my-tabs>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'articles',
    data() {
        return {
            json: [
                {
                    label: '我发表的',
                    name: 'own'
                }
            ]
        }
    }
}
</script>
<style lang='stylus'>
#articles {
    min-height: inherit;
}
</style>