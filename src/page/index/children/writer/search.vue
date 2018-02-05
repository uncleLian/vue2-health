<template>
    <div id="search" v-loading="loading" element-loading-text="正在加载中">
        <el-tabs class='tab_main' v-model="activeView">
            
            <!-- 传统视图 -->
            <el-tab-pane class="tab_tradition" label="传统视图" name="tradition">
                <el-button class="addBtn" type="primary" icon="plus" @click="getCheckedNodes">将选中项添加到素材库</el-button>
                <el-tree ref="tree" :data="traditionJson" :props="traditionProps" :show-checkbox="true" :check-strictly="true" :highlight-current="true" :default-expanded-keys="traditionOpen" node-key="id"></el-tree>
            </el-tab-pane>

            <!-- 图形视图 -->
            <el-tab-pane class="tab_graph" label="图形视图" name="graph">
                <!-- 内容 -->
                <el-tabs type="card" v-show="graph_tabData.length > 0" closable v-model="graph_activeTab" @tab-remove="removeKeyword">
                    <el-tab-pane v-for="(item, index) in graph_tabData" :key="index" :label="item.label" :name="item.name">
                        <div class="myChart" style="width:934px; height:800px;" :id="item.name"></div>
                    </el-tab-pane>
                </el-tabs>
                <!-- 使用提示 -->
                <el-alert class="userTip" v-if="!(graph_tabData.length > 0)" show-icon type="info" title="使用提示：1、右上角搜索绘制图表  2、单击展开节点  3、双击选取节点"> </el-alert>
            </el-tab-pane>
        </el-tabs>

        <!-- 搜索框 -->
        <div class="searchInput">
            <el-autocomplete size="small" :trigger-on-focus="false" :select-when-unmatched="true" v-model.trim="keyWord" :fetch-suggestions="get_searchSuggestion" placeholder="请输入内容" @select="(item) => get_searchResult(item.value)">
                <el-button slot="append" icon="el-icon-search" @click.native.stop="get_searchResult(keyWord)"></el-button>
            </el-autocomplete>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'search',
    data() {
        return {
            activeView: 'tradition', // 选中的视图
            keyWord: '', // 搜索关键字
            loading: false,
            keywordHistory: [], // 搜索过的关键词
            searchJson: [], // 搜索数据
            traditionJson: [], // 传统视图数据
            traditionProps: {
                label: 'name',
                children: 'data',
                disabled: (data) => !data.type
            },
            traditionOpen: [], // 传统属性打开的数组
            graphJson: [], // 图形视图数据
            graph_tabData: [], // Tab选项数据
            graph_activeTab: '', // 选中的Tab
            show: {
                normal: {
                    color: '#00939c',
                    label: {
                        show: true,
                        position: 'left',
                        formatter: '{b}:{c}',
                        textStyle: {
                            color: '#00939c',
                            fontSize: 12,
                            fontWeight: 'bold'
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
            },
            normal: {
                normal: {
                    color: '#00939c',
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}:{c}',
                        textStyle: {
                            color: '#00939c',
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
        // 获取搜索词建议数据
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
        // 获取树图数据
        async get_searchResult(keyWord) {
            if (!this.isHasKeyword()) {
                if (this.source) {
                    this.source.cancel()
                }
                this.source = this.$http.CancelToken.source()
                this.loading = true
                this.graphJson = this.traditionJson = []
                this.$http.all([this.get_traditionJson(keyWord), this.get_graphJson(keyWord)])
                .then(() => {
                    this.keywordHistory.push(keyWord)   // 设置关键字历史
                })
            }
        },
        // 获取传统树图数据
        async get_traditionJson(keyWord) {
            this.$http.get('http://api.toutiaojk.com/e/extend/jkh/kw3.php', {
                    cancelToken: this.source.token,
                    params: { type: 'mkey', kword: keyWord }
                })
                .then(res => {
                    let data = res.data
                    // console.log('搜索结果', data)
                    if (data) {
                        this.traditionTree_init(data) // 图形树图初始化
                    } else {
                        this.$message.warning('搜索不到，换个词试试')
                    }
                    if (this.activeView === 'tradition') {
                        this.loading = false
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
        // 获取图形树图数据
        async get_graphJson(keyWord) {
            await this.$http.get('http://api.toutiaojk.com/e/extend/jkh/kw.php', {
                    cancelToken: this.source.token,
                    params: { type: 'mkey', kword: keyWord }
                })
                .then(res => {
                    let data = res.data
                    // console.log('搜索结果', data)
                    if (data) {
                        this.graphTree_init(data) // 传统树图初始化
                    } else {
                        this.$message.warning('搜索不到，换个词试试')
                    }
                    if (this.activeView === 'graph') {
                        this.loading = false
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
        // 判断关键词历史视图
        isHasKeyword() {
            let isHas = this.keywordHistory.findIndex(n => n === this.keyWord)
            if (isHas > -1) {
                this.$message.warning('视图已经存在')
                this.graph_activeTab = this.keyWord
                return true
            } else {
                return false
            }
        },
        // 移除关键词视图
        removeKeyword(targetName) {
            this.keywordHistory = this.keywordHistory.filter(item => item.name !== targetName)
            this.traditionJson = this.traditionJson.filter(item => item.name !== targetName)
            this.graph_tabData = this.graph_tabData.filter(item => item.name !== targetName)
            if (this.graph_activeTab === targetName) {
                this.graph_tabData.forEach((item, index) => {
                    if (item.name === targetName) {
                        let nextTab = item[index + 1] || item[index - 1]
                        if (nextTab) {
                            this.graph_activeTab = nextTab.name
                        }
                    }
                })
            }
        },
        // 根据节点类型添加数据
        setTypeDate(data) {
            if (data.type === 'tag') {
                let tag = {
                    source: this.keyWord,
                    name: data.name
                }
                this.task.tags.push(tag)
            } else if (data.type === 'sentence') {
                let sentence = {
                    source: this.keyWord,
                    name: data.name
                }
                this.task.sentences.push(sentence)
            } else if (data.type === 'article') {
                let article = {
                    source: this.keyWord,
                    name: data.name,
                    id: data.newsid
                }
                this.task.articles.push(article)
            }
            this.set_task(this.task)
        },
        // 传统树图初始化
        traditionTree_init(data) {
            this.traditionJson.push(data)
        },
        // 传统树图：获取选中节点
        getCheckedNodes() {
            let checkData = this.$refs.tree.getCheckedNodes()
            if (checkData && checkData.length > 0) {
                checkData.forEach((item, index) => {
                    this.setTypeDate(item)
                })
                this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration: 1500
                })
                this.$refs.tree.setCheckedKeys([])
            }
        },
        // 图形树图初始化
        graphTree_init(data) {
            this.graphJson = data
            // 设置节点样式
            this.setStyle(this.graphJson)
            // 添加tab选项卡
            this.graph_tabData.push({
                label: this.keyWord,
                name: this.keyWord
            })
            this.graph_activeTab = this.keyWord
            // 画树形图
            this.$nextTick(() => {
                this.drawTree(this.keyWord)
            })
        },
        // 画图形树图
        drawTree(keyWord) {
            let myChart = echarts.init(this.$el.querySelector(`#${keyWord}`))
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: (item) => {
                        if (item.data.hot) {
                            return `热度: ${item.data.hot}`
                        } else {
                            return `热度: 0`
                        }
                    }
                },
                series: [{
                    name: '节点关系',
                    type: 'tree',
                    data: [this.graphJson],
                    symbolSize: 10,
                    roam: true,
                    orient: 'horizontal',
                    rootLocation: { x: 50, y: 'center' },
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
                    },
                    z: 2
                }]
            })
            // 绑定单击事件：展开节点
            myChart.on('click', (param) => {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    // console.log('click', param)
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
            // 绑定双击事件：选择节点
            myChart.on('dblclick', (param) => {
                clearTimeout(this.timer)
                // console.log('dbClick', param)
                let data = param.data
                this.setTypeDate(data)
                this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration: 1500
                })
            })
        },
        // 设置节点样式
        setStyle(item) {
            if (item.children) {
                item.itemStyle = this.show
                item.children.forEach((item, index) => {
                    this.setStyle(item)
                })
            } else if (item.hide) {
                item.itemStyle = this.hide
                item.hide.forEach((item, index) => {
                    this.setStyle(item)
                })
            } else {
                item.itemStyle = this.normal
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
    .searchInput {
        position: absolute;
        top: 20px;
        right: 24px;
    }

    .el-tabs__nav-wrap.is-scrollable {
        padding: 0 20px;
    }
    .tab_graph {
        width: 900px;
        .el-tabs__header {
            padding: 10px 24px 0;
        }
        .myChart {
            position: relative;
            width: 100%;
            height: 800px;
        }
        .userTip {
            margin: 20px 24px;
            width: 60%;
        }
    }
    .tab_tradition {
        padding: 20px 24px;
        .addBtn {
            margin-bottom: 30px;
        }
        .el-tree-node {
            white-space: normal;
            padding-top: 5px;
            padding-bottom: 5px;
            .el-tree-node__content {
                height: auto;
                line-height: 1.7;
                .el-tree-node__expand-icon {
                    vertical-align: middle;
                }
            }
        }
        .el-tree-node__content>.el-checkbox {
            vertical-align: top;
        }
        .el-tree-node__label {
            width: 90%;
            text-indent: -4em;
            padding-left: 4em;
            vertical-align: top;
        }
    }
}
</style>
