<template>
    <div id="count">
        <div id="myChart1" class="myChart"></div>
        <div id="myChart2" class="myChart"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    name: 'count',
    methods: {
        drawLine() {
            let myChart = echarts.init(document.getElementById('myChart1'))
            myChart.setOption({
                title: { text: '柱状图' },
                tooltip: {},
                legend: {
                    data: ['销量', '运输成本', '利润']
                },
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        barWidth: '20%',
                        itemStyle: {
                            normal: {
                                color: '#91c7ae'
                            }
                        },
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '运输成本',
                        type: 'bar',
                        barWidth: '20%',
                        data: [25, 88, 231, 33, 44, 153]
                    },
                    {
                        name: '利润',
                        type: 'bar',
                        barWidth: '20%',
                        itemStyle: {
                            normal: {
                                color: '#d48265'
                            }
                        },
                        data: [50, 188, 344, 100, 100, 188]
                    }
                ]
            })
        },
         drawPie() {
            let myChart = echarts.init(document.getElementById('myChart2'))
             myChart.setOption({
                title: {
                    text: '饼图'
                },
                tooltip: {},
                legend: {
                    data: ['视频广告', '联盟广告', '邮件营销', '直接访问', '搜索引擎'],
                    left: 'left',
                    top: 'middle',
                    orient: 'vertical'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        roseType: 'angle',
                        radius: '55%',
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: [
                            {value: 235, name: '视频广告'},
                            {value: 274, name: '联盟广告'},
                            {value: 310, name: '邮件营销'},
                            {value: 335, name: '直接访问'},
                            {value: 400, name: '搜索引擎'}
                        ]
                    }
                ]
            })
        }
    },
    mounted() {
        this.drawLine()
        this.drawPie()
    }
}
</script>
<style lang='stylus'>
#count {
    padding: 20px 24px;
    .myChart{
        width: 100%;
        height: 480px;
    }
}
</style>
