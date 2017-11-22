<template>
    <div id="sidebar">
        <transition name="toggleSide">
            <!-- 任务 -->
            <div class="container" v-show="taskVisible" v-loading="loading" element-loading-text="正在保存中">
                <el-form ref="form" :model="form" label-width="70px">
                    <!-- 任务 -->
                    <el-form-item label="任务">
                        <el-select v-model="taskSelect" clearable filterable placeholder="请选择" @change="taskSet" @clear="taskReset">
                            <el-option v-for="(item,index) in taskList" :key="index" :label="item.title" :value="item.id"> </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 标题 -->
                    <el-form-item label="标题">
                        <el-input v-model.trim="form.title"></el-input>
                    </el-form-item>
                    <!-- 描述 -->
                    <el-form-item label="描述">
                        <el-input v-model.trim="form.describe"></el-input>
                    </el-form-item>
                    <!-- 关键词 -->
                    <el-form-item label="关键词" class="tags">
                        <el-tooltip effect="light" :enterable="false" :content="`来源：${item.source}`" placement="top" v-for="(item,index) in tasks.tags" :key="index">
                            <el-tag type="primary" :closable="true" :close-transition="true" @close="handleClose('tag',item)" @dblclick.stop.native="pickUp(item)">{{item.data}}</el-tag>
                        </el-tooltip>
                        <el-input class="input-new-tag" v-if="tagInput" v-model.trim="tagInputVal" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm('tag')" @blur="handleInputConfirm('tag')">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput('tag')">+ 新建标签</el-button>
                    </el-form-item>
                    <!-- 句子 -->
                    <el-form-item label="句子" class="sentences">
                        <el-tooltip effect="light" :enterable="false" :content="`来源：${item.source}`" placement="top" v-for="(item,index) in tasks.sentences" :key="index">
                            <el-tag class="wrap" type="primary" :closable="true" :close-transition="true" @close="handleClose('sentence',item)"@dblclick.stop.native="pickUp(item)">{{item.data}}</el-tag>
                        </el-tooltip>
                         <el-input v-if="sentenceInput" v-model.trim="sentenceInputVal" ref="saveSentenceInput" size="mini" @keyup.enter.native="handleInputConfirm('sentence')" @blur="handleInputConfirm('sentence')">
                        </el-input>
                        <el-button v-else size="small" @click="showInput('sentence')">+ 新建句子</el-button>
                    </el-form-item>
                    <!-- 文章 -->
                    <el-form-item label="文章" class="articles">
                        <router-link :to="{name: 'index'}" v-for="(item,index) in tasks.articles" :key="index">
                            <el-tooltip effect="light" :enterable="false" :content="`来源：${item.source}`" placement="top" >
                                <el-tag class="wrap" type="primary" :closable="true" :close-transition="true" @close="handleClose('article',item)">{{item.data}}</el-tag>
                            </el-tooltip>
                        </router-link>
                         <el-input v-if="articleInput" v-model.trim="articleInputVal" ref="saveArticleInput" size="mini" @keyup.enter.native="handleInputConfirm('article')" @blur="handleInputConfirm('article')">
                        </el-input>
                        <el-button v-else size="small" @click="showInput('article')">+ 新建文章</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click.stop="post_task('edit')" v-if="taskSelect">保存</el-button>
                        <el-button type="primary" @click.stop="post_task('new')" v-else>新建</el-button>
                        <el-button @click.stop="taskReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </transition>
        <!-- tasks开关 -->
        <el-button class="visibleBtn" type="primary" :icon="taskVisible? 'd-arrow-right' : 'd-arrow-left'"  @click="taskVisible = !taskVisible"></el-button>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            taskList: [],
            taskSelect: '',
            form: {
                title: '',
                describe: ''
            },
            tagInputVal: '',
            tagInput: false,
            sentenceInputVal: '',
            sentenceInput: false,
            articleInputVal: '',
            articleInput: false,
            taskVisible: false,
            loading: false
        }
    },
    computed: {
        ...mapGetters([
            'tasks'
        ])
    },
    watch: {
        taskVisible(val) {
            // 任务框为true获取task列表数据
            if (val) {
                this.get_taskList()
            }
        }
    },
    methods: {
        ...mapMutations([
            'set_tasks',
            'set_selected'
        ]),
        ...mapActions([
            'get_task_data',
            'post_task_data'
        ]),
        // 获取task列表数据
        get_taskList() {
            this.get_task_data()
            .then(res => {
                console.log(res)
                if (res) {
                    this.taskList = res.data
                }
            })
        },
        // 提交task数据
        post_task(type) {
            if (this.form.title) {
                this.loading = true
                let params = {
                    type: type,
                    title: this.form.title,
                    describe: this.form.describe,
                    kword: this.tasks.tags,
                    gzword: this.tasks.sentences,
                    ctword: this.tasks.articles
                }
                if (type === 'edit' && this.taskSelect) {
                    params.id = this.taskSelect
                }
                this.post_task_data(params)
                .then(res => {
                    console.log(res)
                    if (res.data) {
                        this.$message.success('操作成功')
                        if (type === 'new') {
                            this.taskList.unshift(res.data)
                            this.taskSelect = res.data.id
                        } else if (type === 'edit') {
                            let index = this.taskList.findIndex(n => n.id === res.data.id)
                            this.taskList[index] = res.data
                        }
                    } else {
                        this.$message.error('操作失败，请重新尝试')
                    }
                    this.loading = false
                })
                .catch(err => {
                    console.log(err)
                    this.loading = false
                    this.$message.error('操作失败，请重新尝试')
                })
            } else {
                this.$message.error('标题不能为空')
            }
        },
        // 设置task数据
        taskSet(val) {
            let index = this.taskList.findIndex(n => n.id === this.taskSelect)
            if (index > -1) {
                let taskItem = this.taskList[index]
                this.form.title = taskItem.title
                if (taskItem.describe) {
                    this.form.describe = taskItem.describe
                } else {
                    this.form.describe = ''
                }
                if (taskItem.kword) {
                    this.tasks.tags = taskItem.kword
                } else {
                    this.tasks.tags = []
                }
                if (taskItem.gzword) {
                    this.tasks.sentences = taskItem.gzword
                } else {
                    this.tasks.sentences = []
                }
                if (taskItem.ctword) {
                    this.tasks.articles = taskItem.ctword
                } else {
                    this.tasks.articles = []
                }
                this.set_tasks(this.tasks)
            }
        },
        // 重置task数据
        taskReset() {
            this.form.title = ''
            this.form.describe = ''
            this.tasks.tags = []
            this.tasks.sentences = []
            this.tasks.articles = []
            this.set_tasks(this.tasks)
            this.taskSelect = ''
        },
        // 删除标签
        handleClose(type, item) {
            if (type === 'tag') {
                this.tasks.tags.splice(this.tasks.tags.indexOf(item), 1)
            } else if (type === 'sentence') {
                this.tasks.sentences.splice(this.tasks.sentences.indexOf(item), 1)
            } else if (type === 'article') {
                this.tasks.articles.splice(this.tasks.articles.indexOf(item), 1)
            }
            this.set_tasks(this.tasks)
        },
        // 展示input框
        showInput(type) {
            if (type === 'tag') {
                this.tagInput = true
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus()
                })
            } else if (type === 'sentence') {
                this.sentenceInput = true
                this.$nextTick(_ => {
                    this.$refs.saveSentenceInput.$refs.input.focus()
                })
            } else if (type === 'article') {
                this.articleInput = true
                this.$nextTick(_ => {
                    this.$refs.saveArticleInput.$refs.input.focus()
                })
            }
        },
        // 新增标签
        handleInputConfirm(type) {
            if (type === 'tag') {
                let tagInputVal = this.tagInputVal
                if (tagInputVal) {
                    let tag = {
                        source: '新建',
                        data: tagInputVal
                    }
                    this.tasks.tags.push(tag)
                }
                this.tagInput = false
                this.tagInputVal = ''
            } else if (type === 'sentence') {
                let sentenceInputVal = this.sentenceInputVal
                if (sentenceInputVal) {
                    let sentence = {
                        source: '新建',
                        data: sentenceInputVal
                    }
                    this.tasks.sentences.push(sentence)
                }
                this.sentenceInput = false
                this.sentenceInputVal = ''
            } else if (type === 'article') {
                let articleInputVal = this.articleInputVal
                if (articleInputVal) {
                    let article = {
                        source: '新建',
                        data: articleInputVal
                    }
                    this.tasks.articles.push(article)
                }
                this.articleInput = false
                this.articleInputVal = ''
            }
            this.set_tasks(this.tasks)
        },
        // 双击标签，设置选中的标签值
        pickUp(item) {
            if (this.$route.name === 'publish') {
                this.set_selected(item.data)
            }
        }
    }
}
</script>
<style lang='stylus'>
#sidebar {
    position: fixed;
    width: 400px;
    top: 145px;
    right: 20px;
    color: #505050;
    z-index: 999;
    .visibleBtn{
        position: absolute;
        top: 0;
        right: 0;
        transform: translateY(-100%);
        transition: all .3s ease;
    }
    .container{
        padding: 20px 20px 10px 5px;
        margin-top: 5px;
        max-height: 600px;
        background: #fff;
        border: 1px solid #e8e8e8;
        overflow: auto;
        transition: all .3s ease-out;
        .el-tag{
            cursor: pointer;
        }
        .tags{
            .el-tag{
                margin-right: 5px;
            }
        }
        .sentences{
            .el-tag{
               margin-bottom: 5px;
            }
        }
        .articles{
            .el-tag{
                margin-bottom: 5px;
            }
        }
        .el-tag.wrap{
            display: block;
            width: fit-content;
            height: auto;
            white-space: normal;
            word-wrap: break-word;
            word-break: break-all;
        }
    }
}
.toggleSide-enter,.toggleSide-leave-active{
    transform: translate3d(100%, 0, 0);
}
.toggleSide-enter-active，.toggleSide-leave{
    transform: translate3d(0, 0, 0);
}
</style>
