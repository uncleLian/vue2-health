<template>
    <div id="count">
        <el-tabs class='tab_main' v-model='activeName'>
            <el-tab-pane label="概况" name="all">
                <!-- 搜索结果 -->
                <div class="search-view" v-loading="loading" element-loading-text="正在加载中">
                    <el-alert class="userTip" show-icon type="info" :title="useTip" > </el-alert>
                    <div id="myChart"></div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 搜索 -->
        <div class="search">
            <el-autocomplete size="small" :trigger-on-focus="false" :select-when-unmatched="true" v-model.trim="keyWord" :fetch-suggestions="searchSuggestion" placeholder="请输入内容" @select="handleSelect">
                <el-button slot="append" icon="search" @click.native.stop="searchResult(keyWord)"></el-button>
            </el-autocomplete>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'count',
    data() {
        return {
            activeName: 'all',
            keyWord: '',
            searchJson: [],
            useTip: '使用提示：1、右上角搜索绘制图表  2、单击展开节点  3、双击选取节点',
            loading: false,
            show: {
                normal: {
                        color: '#00939c',
                        label: {
                            show: true,
                            position: 'right',
                            formatter: '{b}:{c}',
                            textStyle: {
                                color: '#000',
                                fontSize: 12
                            }
                        },
                        lineStyle: {
                            color: '#ccc',
                            type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'

                        }
                    },
                emphasis: {
                    color: '#00939c',
                    label: {
                        show: false
                    },
                    borderWidth: 0
                }
            },
            hide: {
                normal: {
                    color: '#d43d3d',
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}:{c}',
                        textStyle: {
                            color: '#000',
                            fontSize: 12
                        }
                    },
                    lineStyle: {
                        color: '#ccc',
                        type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'

                    }
                },
                emphasis: {
                    color: '#00939c',
                    label: {
                        show: false
                    },
                    borderWidth: 0
                }
            }
        }
    },
    computed: {
        ...mapGetters([
            'tasks'
        ])
    },
    methods: {
        ...mapMutations([
            'set_tasks'
        ]),
        handleSelect(item) {
            // 如果已经搜索，取消搜索建议请求
            if (this.sourceObj) {
                this.sourceObj.cancel()
            }
            this.searchResult(item.value)
        },
        // 搜索建议
        searchSuggestion(keyWord, callback) {
            if (this.sourceObj) {
                this.sourceObj.cancel()
            }
            this.sourceObj = this.$http.CancelToken.source()
            this.$http.get('http://t.toutiaojk.com/e/extend/ltext/kw2.php', {
                    cancelToken: this.sourceObj.token,
                    params: { kword: keyWord }
                })
                .then(res => {
                    if (res.data.data) {
                        callback(res.data.data)
                    } else {
                        callback([])
                    }
                })
                .catch(() => {
                    callback([])
                })
        },
        // 搜索结果
        searchResult(keyWord) {
            if (this.source) {
                this.source.cancel()
            }
            this.source = this.$http.CancelToken.source()
            this.loading = true
            this.searchJson = []
            this.$http.get('http://t.toutiaojk.com/e/extend/ltext/kw.php', {
                    cancelToken: this.source.token,
                    params: { kword: keyWord }
                })
                .then(res => {
                    console.log('搜索结果', res.data)
                    if (res.data.data) {
                        let data = res.data.data
                        for (let i of data) {
                            if (i.gzd) {
                                for (let j of i.gzd) {
                                    j.name = j.gztxt
                                    j.type = 'sentences'
                                }
                                i.itemStyle = this.hide
                                i.hide = i.gzd
                            } else {
                                i.itemStyle = this.show
                            }
                            i.name = i.value
                            i.type = 'tags'
                        }
                        this.rootNode = {
                            name: keyWord,
                            children: data
                        }
                        this.drawTree()
                        this.loading = false
                    } else {
                        this.loading = false
                        this.$message.warning('搜索不到，换个词试试')
                    }
                })
                .catch((err) => {
                    if (this.$http.isCancel(err)) {
                        console.log('Request canceled', err.message)
                    } else {
                        console.log(err)
                        this.loading = false
                        this.$message.error('出错错误，请重新尝试')
                    }
                })
        },
        drawTree() {
            let myChart = echarts.init(document.getElementById('myChart'))
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove',
                    hideDelay: 0
                },
                series: [{
                    name: '节点关系',
                    type: 'tree',
                    data: [this.rootNode],
                    symbolSize: 10,
                    roam: true,
                    orient: 'horizontal',
                    rootLocation: {x: 50, y: 'center'}, // 根节点位置  {x: 100, y: 'center'}
                    nodePadding: 8,
                    layerPadding: 200,
                    hoverable: false,
                    itemStyle: this.show
                }]
            })
            myChart.on('click', (param) => {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    console.log('click', param)
                    let data = param.data
                    if (data.children && data.children.length > 0) {
                        // 隐藏
                        data.hide = data.children
                        data.children = []
                        data.itemStyle = this.hide
                        myChart.refresh()
                    } else if (data.hide && data.hide.length > 0) {
                        // 显示
                        data.children = data.hide
                        data.hide = []
                        data.itemStyle = this.show
                        myChart.refresh()
                    }
                }, 300)
            })
            myChart.on('dblclick', (param) => {
                clearTimeout(this.timer)
                console.log('dbClick', param)
                if (param.data.type === 'tags') {
                    this.tasks.tags.push(param.data.name)
                } else if (param.data.type === 'sentences') {
                    this.tasks.sentences.push(param.data.name)
                }
                this.set_tasks(this.tasks)
            })
        }
    },
    mounted() {
    }
}
</script>
<style lang='stylus'>
#count {
    position: relative;
    width: 100%;
    .search {
        position: absolute;
        top: 20px;
        right: 24px;
    }
    .userTip{
        margin-bottom: 20px;
        background: #00939c;
    }
    .search-view {
        position: relative;
        padding: 20px 24px;
        #myChart {
            width: 100%;
            height: 600px;
            border: 1px solid #e8e8e8;
        }
    }
    .echarts-tooltip{
        z-index: 1000
    }
}
</style>
