<template>
    <div id="sidebar">
        <transition name="toggleSide">
            <!-- 任务 -->
            <div class="container" v-show="taskVisible" v-loading="loading" element-loading-text="正在保存中">
                <el-form class="form" ref="form" :model="form" label-width="70px">
                    <!-- 任务 -->
                    <el-form-item label="素材">
                        <el-select v-model="taskSelect" clearable filterable placeholder="请选择" @change="load_task" @clear="reset_task">
                            <el-option v-for="(item,index) in taskList" :key="index" :label="item.title" :value="item.id"> 
                                <span style="float: left; vertical-align: middle;">{{ item.title }}</span>
                                <span @click.stop="delete_task(item)" class="el-icon-delete" style="float: right; vertical-align: middle;"></span>
                            </el-option>
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
                        <el-tooltip effect="light" :enterable="false" :content="`来源：${item.source}`" placement="top" v-for="(item,index) in task.tags" :key="index">
                            <el-tag type="primary" :closable="true" :close-transition="true" @close.stop.prevent="handleClose('tag',item)" @dblclick.stop.native="pickUp(item)">{{item.name}}</el-tag>
                        </el-tooltip>
                        <el-input class="input-new-tag" v-if="tagInput" v-model.trim="tagInputVal" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm('tag')" @blur="handleInputConfirm('tag')">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput('tag')">+ 新建标签</el-button>
                    </el-form-item>
                    <!-- 句子 -->
                    <el-form-item label="句子" class="sentences">
                        <el-tooltip effect="light" :enterable="false" :content="`来源：${item.source}`" placement="top" v-for="(item,index) in task.sentences" :key="index">
                            <el-tag class="wrap" type="primary" :closable="true" :close-transition="true" @close.stop.prevent="handleClose('sentence',item)"@dblclick.stop.native="pickUp(item)">{{item.name}}</el-tag>
                        </el-tooltip>
                         <el-input v-if="sentenceInput" v-model.trim="sentenceInputVal" ref="saveSentenceInput" size="mini" @keyup.enter.native="handleInputConfirm('sentence')" @blur="handleInputConfirm('sentence')">
                        </el-input>
                        <el-button v-else size="small" @click="showInput('sentence')">+ 新建句子</el-button>
                    </el-form-item>
                    <!-- 文章 -->
                    <el-form-item label="文章" class="articles" v-if="task.articles.length > 0">
                        <router-link target="_blank" v-for="(item,index) in task.articles" :key="index" :to="`/preview_article?id=${item.id}`">
                            <el-tooltip effect="light" :enterable="false" :content="`来源：${item.source}`" placement="top" >
                                <el-tag class="wrap" type="primary" :closable="true" :close-transition="true" @close.stop.prevent="handleClose('article',item)">{{item.name}}</el-tag>
                            </el-tooltip>
                        </router-link>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click.stop="post_task('edit')" v-if="taskSelect">保存</el-button>
                        <el-button type="primary" @click.stop="post_task('new')" v-else>新建</el-button>
                        <el-button @click.stop="reset_task">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </transition>
        <!-- tasks开关 -->
        <el-button class="visibleBtn" type="primary" :icon="taskVisible? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"  @click="taskVisible = !taskVisible"></el-button>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            taskList: [],           // 任务列表
            taskSelect: '',         // 选中的任务
            form: {
                title: '',          // 标题
                describe: ''        // 描述
            },
            tagInputVal: '',        // 标签的input内容
            tagInput: false,        // 标签的input开关
            sentenceInputVal: '',   // 句子的input内容
            sentenceInput: false,   // 句子的input内容
            taskVisible: false,     // 任务框开关
            loading: false          // 加载提示
        }
    },
    computed: {
        ...mapGetters('writer', [
            'task'
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
        ...mapMutations('writer', [
            'set_task',
            'set_selected'
        ]),
        ...mapActions('writer', [
            'get_task_data',
            'post_task_data'
        ]),
        // 获取task列表数据
        get_taskList() {
            this.get_task_data()
            .then(res => {
                console.log(res)
                if (res && res.data) {
                    this.taskList = res.data
                } else {
                    this.taskList = []
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
                    kword: this.task.tags,
                    gzword: this.task.sentences,
                    ctword: this.task.articles
                }
                if (type === 'edit' && this.taskSelect) {
                    params.id = this.taskSelect
                }
                this.post_task_data(params)
                .then(res => {
                    console.log(res)
                    if (res.data) {
                        if (type === 'new') {
                            this.taskList.unshift(res.data)
                            this.taskSelect = res.data.id
                        } else if (type === 'edit') {
                            let index = this.taskList.findIndex(n => n.id === res.data.id)
                            this.taskList[index] = res.data
                        }
                        this.$message.success('操作成功')
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
        // 记载task数据
        load_task(val) {
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
                    this.task.tags = taskItem.kword
                } else {
                    this.task.tags = []
                }
                if (taskItem.gzword) {
                    this.task.sentences = taskItem.gzword
                } else {
                    this.task.sentences = []
                }
                if (taskItem.ctword) {
                    this.task.articles = taskItem.ctword
                } else {
                    this.task.articles = []
                }
                this.set_task(this.task)
            }
        },
        // 重置task数据
        reset_task() {
            this.form.title = ''
            this.form.describe = ''
            this.task.tags = []
            this.task.sentences = []
            this.task.articles = []
            this.taskSelect = ''
            this.set_task(this.task)
        },
        // 删除任务
        delete_task(item) {
            console.log('delete', item)
            this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                this.loading = true
                let params = {
                    type: 'del',
                    id: item.id
                }
                this.post_task_data(params)
                .then(res => {
                    let index = this.taskList.findIndex(n => n.id === item.id)
                    this.taskList.splice(index, 1)
                    if (this.taskSelect === item.id) {
                        this.taskSelect = ''
                        this.reset_task()
                    }
                    this.loading = false
                    this.$message.success('删除成功')
                })
                .catch(() => {
                    this.loading = false
                    this.$message.error('删除失败')
                })
            })
        },
        // 删除标签
        handleClose(type, item) {
            if (type === 'tag') {
                this.task.tags.splice(this.task.tags.indexOf(item), 1)
            } else if (type === 'sentence') {
                this.task.sentences.splice(this.task.sentences.indexOf(item), 1)
            } else if (type === 'article') {
                this.task.articles.splice(this.task.articles.indexOf(item), 1)
            }
            this.set_task(this.task)
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
            }
        },
        // 新增标签
        handleInputConfirm(type) {
            if (type === 'tag') {
                let tagInputVal = this.tagInputVal
                if (tagInputVal) {
                    let tag = {
                        source: '新建',
                        name: tagInputVal
                    }
                    this.task.tags.push(tag)
                }
                this.tagInput = false
                this.tagInputVal = ''
            } else if (type === 'sentence') {
                let sentenceInputVal = this.sentenceInputVal
                if (sentenceInputVal) {
                    let sentence = {
                        source: '新建',
                        name: sentenceInputVal
                    }
                    this.task.sentences.push(sentence)
                }
                this.sentenceInput = false
                this.sentenceInputVal = ''
            }
            this.set_task(this.task)
        },
        // 双击标签，设置选中的标签值
        pickUp(item) {
            if (this.$route.name === 'publish') {
                this.set_selected(item.name)
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
        font-size: 16px;
        padding: 10px 15px;
    }
    .container{
        padding: 20px 20px 10px 5px;
        margin-top: 28px;
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
