<template>
    <div id="count" v-loading="loading" element-loading-text="正在加载中">
        <!-- 内容 -->
        <el-tabs class='tab_main' type="card" closable v-model="activeTab"  @tab-remove="removeTab">
          <el-tab-pane v-for="(item, index) in tabData" :key="index" :label="item.label" :name="item.name" >
                <div class="myChart" :id="item.name"></div>
          </el-tab-pane>
        </el-tabs>
        <!-- 搜索框 -->
        <div class="search">
            <el-autocomplete size="small" :trigger-on-focus="false" :select-when-unmatched="true" v-model.trim="keyWord" :fetch-suggestions="searchSuggestion" placeholder="请输入内容" @select="handleSelect">
                <el-button slot="append" icon="search" @click.native.stop="searchResult(keyWord)"></el-button>
            </el-autocomplete>
        </div>
        <!-- 使用提示 -->
        <el-alert class="userTip" v-if="!(tabData.length > 0)" show-icon type="info" :title="useTip"> </el-alert>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'count',
    data() {
        return {
            activeTab: '',
            tabData: [],
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
            'tasks',
            'tabSource'
        ])
    },
    watch: {
        tabSource(val) {
            if (val) {
                let isHasTab = this.tabData.findIndex(n => n.name === val)
                if (isHasTab > -1) {
                    this.activeTab = val
                } else {
                    this.$message({
                      showClose: true,
                      message: `没有找到【${val}】选项卡，重新搜索一下吧`,
                      type: 'warning'
                    })
                }
            }
        }
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
            let isExistTab = this.tabData.findIndex(n => n.name === keyWord)
            if (isExistTab > -1) {
                this.activeTab = keyWord
            } else {
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
                        this.addTab(keyWord)
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
            }
        },
        drawTree(keyWord) {
            let myChart = echarts.init(this.$el.querySelector(`#${keyWord}`))
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
                    rootLocation: { x: 50, y: 'center' }, // 根节点位置  {x: 100, y: 'center'}
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
                    let tag = {
                        source: keyWord,
                        data: param.data.name
                    }
                    this.tasks.tags.push(tag)
                } else if (param.data.type === 'sentences') {
                    let sentence = {
                        source: keyWord,
                        data: param.data.name
                    }
                    this.tasks.sentences.push(sentence)
                }
                this.set_tasks(this.tasks)
            })
        },
        addTab(keyWord) {
            this.tabData.push({
                label: keyWord,
                name: keyWord
            })
            this.activeTab = keyWord
            this.$nextTick(() => {
                this.drawTree(keyWord)
            })
        },
        removeTab(targetName) {
            let tabs = this.tabData
            let activeName = this.activeTab
            if (activeName === targetName) {
              tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                  let nextTab = tabs[index + 1] || tabs[index - 1]
                  if (nextTab) {
                    activeName = nextTab.name
                  }
                }
              })
            }
            this.activeTab = activeName
            this.tabData = tabs.filter(tab => tab.name !== targetName)
          }
    }
}
</script>
<style lang='stylus'>
#count {
    position: relative;
    width: 100%;
    .myChart {
        width: 100%;
        height: 600px;
    }
    .search {
        position: absolute;
        top: 20px;
        right: 24px;
    }
    .userTip {
        position: absolute;
        top: 15px;
        left: 24px;
        width: 60%;
        background: #00939c;
    }
    .echarts-tooltip {
        z-index: 1000
    }
    .el-tabs__nav-wrap.is-scrollable{
        padding: 0 20px;
    }
    .tab_main > .el-tabs__header{
        padding-right: 270px;
    }
}
</style>
