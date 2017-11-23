<template>
    <div id="search" v-loading="loading" element-loading-text="正在加载中">
        <!-- 内容 -->
        <el-tabs class='tab_main' type="card" closable v-model="activeTab"  @tab-remove="removeTab">
          <el-tab-pane v-for="(item, index) in tabData" :key="index" :label="item.label" :name="item.name" >
                <div class="myChart" :id="item.name"></div>
          </el-tab-pane>
        </el-tabs>
        <!-- 搜索框 -->
        <div class="searchInput">
            <el-autocomplete size="small" :trigger-on-focus="false" :select-when-unmatched="true" v-model.trim="keyWord" :fetch-suggestions="get_searchSuggestion" placeholder="请输入内容" @select="handleSelect">
                <el-button slot="append" icon="search" @click.native.stop="get_searchResult(keyWord)"></el-button>
            </el-autocomplete>
        </div>
        <!-- 使用提示 -->
        <el-alert class="userTip" v-if="!(tabData.length > 0)" show-icon type="info" :title="useTip"> </el-alert>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'search',
    data() {
        return {
            activeTab: '',
            tabData: [],
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
                        type: 'curve'
                    }
                },
                emphasis: {
                    color: '#d43d3d',
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
                        type: 'curve'
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
        ...mapGetters('writer', [
            'task'
        ])
    },
    methods: {
        ...mapMutations('writer', [
            'set_task'
        ]),
        handleSelect(item) {
            this.get_searchResult(item.value)
        },
        // 搜索建议
        get_searchSuggestion(keyWord, searchCallBack) {
            if (this.sourceObj) {
                this.sourceObj.cancel()
            }
            this.sourceObj = this.$http.CancelToken.source()
            this.$http.get('http://api.toutiaojk.com/e/extend/jkh/kw2.php', {
                cancelToken: this.sourceObj.token,
                params: { type: 'kkey', kword: keyWord }
            })
            .then(res => {
                if (res.data.data) {
                    searchCallBack(res.data.data)
                } else {
                    searchCallBack([])
                }
            })
            .catch(() => {
                searchCallBack([])
            })
        },
        // 搜索结果
        get_searchResult(keyWord) {
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
                this.$http.get('http://api.toutiaojk.com/e/extend/jkh/kw.php', {
                    cancelToken: this.source.token,
                    params: { type: 'mkey', kword: keyWord }
                })
                .then(res => {
                    console.log('搜索结果', res.data)
                    if (res.data.children) {
                        let data = res.data
                        this.setStyle(data)
                        this.searchJson = data
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
                series: [{
                    name: '节点关系',
                    type: 'tree',
                    data: [this.searchJson],
                    symbolSize: 10,
                    roam: true,
                    orient: 'horizontal',
                    rootLocation: { x: 50, y: 'center' }, // 根节点位置  {x: 100, y: 'center'}
                    nodePadding: 8,
                    layerPadding: 200,
                    hoverable: false,
                    itemStyle: {
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
                    }
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
                if (param.data.type === 'tag') {
                    let tag = {
                        source: keyWord,
                        name: param.data.name
                    }
                    this.task.tags.push(tag)
                } else if (param.data.type === 'sentence') {
                    let sentence = {
                        source: keyWord,
                        name: param.data.name
                    }
                    this.task.sentences.push(sentence)
                } else if (param.data.type === 'article') {
                    let article = {
                        source: keyWord,
                        name: param.data.name,
                        id: param.data.newsid
                    }
                    this.task.articles.push(article)
                }
                this.set_task(this.task)
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
        },
        setArr(arr) {
            for (var i = 0; i < arr.length; i++) {
                this.setStyle(arr[i])
            }
        },
        setStyle(item) {
            if (item.children) {
                item.itemStyle = this.show
                this.setArr(item.children)
            } else if (item.hide) {
                item.itemStyle = this.hide
                this.setArr(item.hide)
            } else {
                item.itemStyle = this.show
            }
        }
    }
}
</script>
<style lang='stylus'>
#search {
    position: relative;
    width: 100%;
    min-height: inherit;
    .myChart {
        width: 100%;
        height: 600px;
    }
    .searchInput {
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
    .el-tabs__nav-wrap.is-scrollable{
        padding: 0 20px;
    }
    .tab_main > .el-tabs__header{
        padding-right: 270px;
    }
}
</style>
