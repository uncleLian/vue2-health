<template>
    <div id="count">
        <el-tabs class='tab_main' v-model='activeName'>
            <el-tab-pane label="概况" name="all"></el-tab-pane>
        </el-tabs>
        <router-view></router-view>
        <div id="allCount">
            <div id="myChart">
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'all'
        }
    },
    methods: {
        drawLine() {
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption({
                title: {
                    text: '在Vue中使用echarts',
                    subtext: '我是副标题'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            })
        }
    },
    mounted() {
        this.drawLine()
    }
}
</script>
<style lang='stylus'>
#count {
    
}
#allCount{
    padding: 20px 24px;
    #myChart{
        width: 100%;
        height: 480px;
    }
}
</style>