<template>
    <el-dialog class="selectPicture" :visible.sync="visible">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
            <!-- upload -->
            <el-tab-pane label="上传图片" name="upload" class="upload">
                <el-upload ref="upload" action="http://api.toutiaojk.com/e/extend/jkh/upload_file.php" list-type="picture-card" :multiple="true" :before-upload="uploadBefore" :on-success="onSuccess" :on-error="onError" :on-remove="onRemove" :on-preview="onPreview">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog class="picture_preview" v-model="preViewVisible" size="tiny" :modal="false">
                    <img width="100%" :src="preViewURL">
                </el-dialog>
            </el-tab-pane>
            <!-- select -->
            <el-tab-pane label="免费图片" name="select" class="select">
                <el-input class="imgInput" placeholder="请输入关键字" v-model="keyWord" @keyup.native.enter="get_picture">
                    <el-button slot="append" @click.stop="get_picture">搜索</el-button>
                </el-input>
                <div class="imgWrapper">
                    <my-loading :visible="loading"></my-loading>
                    <my-error :visible="error" :reload="get_picture"></my-error>
                    <my-nothing :visible="nothing && !loading && !error"></my-nothing>
                    <el-checkbox-group v-model="selectFileList" class="img-list">
                        <div class="img-item" v-for="(item,index) in freePictureList">
                            <el-checkbox-button :label="item.picurl"><img :src="item.picurl"></el-checkbox-button>
                        </div>
                    </el-checkbox-group>
                    <template v-if="freePictureList && freePictureList.length > 0">
                        <my-loading :visible="more_loading"></my-loading>
                        <my-error :visible="more_error" :reload="get_picture_more"></my-error>
                        <my-nothing :visible="more_nothing && !loading && !error">没有更多数据了</my-nothing>
                    </template>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- footer -->
        <div slot="footer">
            <el-button class="cancle_btn" @click.stop="slelectCancle">取 消</el-button>
            <el-button type="primary" @click="selectComplete">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'selectPicture',
    props: {
    },
    data() {
        return {
            visible: true,
            preViewVisible: false,      // 预览框toggle
            activeTab: 'upload',        // 当前选中的tab
            freePictureList: [],        // 免费图片数据
            uploadFileList: [],         // 上传的图片数组
            selectFileList: [],         // 选中的图片数组
            preViewURL: '',             // 预览图片的URL
            keyWord: '',
            page: 1,
            loading: false,
            error: false,
            nothing: false,
            more_loading: false,
            more_error: false,
            more_nothing: false,
            lock: false
        }
    },
    computed: {

    },
    watch: {
        visible(val) {
            if (!val) {
                this.$emit('close', false)
            }
        }
    },
    methods: {
        ...mapActions('writer', [
            'get_picture_data'
        ]),
        handleClick(val) {
            if (this.activeTab === 'select') {
                this.$nextTick(() => {
                    $('.imgWrapper').on('scroll', this.onScroll)
                })
            } else {
                $('.imgWrapper').off('scroll', this.onScroll)
            }
        },
        // 上传图片前检查格式、大小
        uploadBefore(file) {
            const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
            const isLt2M = file.size / 1024 / 1024 < 5
            if (!isImg) {
                this.$message.error('目前只支持 jpg / png / gif 的图片格式')
            } else if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 5MB')
            }
            return isImg && isLt2M
        },
        // 上传成功钩子
        onSuccess(response, file, fileList) {
            this.uploadFileList = fileList
        },
        // 上传失败钩子
        onError(err, file, fileList) {
            console.log('上传图片失败', err)
            this.$message.error('上传失败，请重新尝试!')
        },
        // 移除图片钩子
        onRemove(file, fileList) {
            this.uploadFileList = fileList
        },
        // 预览图片钩子
        onPreview(file) {
            this.preViewURL = file.url
            this.preViewVisible = true
        },
        // 上传完成，把图片添加进正文
        selectComplete() {
            let selectPicture = []
            let isUploadComplete = true
            if (this.activeTab === 'upload') {
                this.uploadFileList.forEach((item, index) => {
                    if (item.response) {
                        selectPicture.push(item.response.data)
                    } else {
                        isUploadComplete = false
                    }
                })
            } else if (this.activeTab === 'select') {
                selectPicture = this.selectFileList
            }
            if (!isUploadComplete) {
                this.$message.warning('部分图片没有上传成功，请重新尝试')
            }
            this.$emit('selectComplete', selectPicture)
            this.visible = false
        },
        // 清除上传的图片
        slelectCancle() {
            this.visible = false
        },
        async get_picture() {
            this.freePictureList = []
            this.nothing = false
            this.error = false
            this.more_loading = false
            this.more_nothing = false
            this.more_error = false
            this.loading = true
            let params = {
                key: this.keyWord,
                page: 1
            }
            await this.get_picture_data(params)
            .then(res => {
                console.log(res)
                if (res.data) {
                    this.freePictureList = res.data
                    this.page = 2
                } else {
                    this.this.freePictureList = []
                    this.nothing = true
                }
                this.loading = false
            })
            .catch(err => {
                console.log(err)
                this.itemJson = []
                this.loading = false
                this.error = true
            })
        },
        async get_picture_more() {
            this.more_nothing = false
            this.more_error = false
            this.more_loading = true
            let params = {
                key: this.keyWord,
                page: this.page
            }
            await this.get_picture_data(params)
            .then(res => {
                console.log(res)
                if (res.data) {
                    this.freePictureList.push(...res.data)
                    this.page++
                } else {
                    this.more_nothing = true
                }
                this.more_loading = false
                this.lock = false
            })
            .catch(err => {
                this.more_error = true
                this.more_loading = false
                this.lock = false
                console.log(err)
            })
        },
        onScroll() {
            let scrollEle = $('.imgWrapper')
            let wrapperEle = $('.img-list')
            let timeoutRef
            if (timeoutRef) {
                clearTimeout(timeoutRef)
            }
            timeoutRef = setTimeout(() => {
                let scrollEleScrollTop = scrollEle.scrollTop()
                let scrollEleHeight = scrollEle.height()
                let wrapperEleHeight = wrapperEle.height()
                let isBottom = scrollEleScrollTop + scrollEleHeight >= wrapperEleHeight
                let isInit = this.freePictureList.length > 0 && !this.more_loading && !this.more_error && !this.more_nothing && this.page >= 2
                if (isBottom && isInit && !this.lock) {
                    this.get_picture_more()
                    this.lock = true
                }
            }, 100)
        }
    }
}
</script>
<style lang='stylus'>
min_dialogHieght=580px;
max_dialogHieght=580px;
marginBottom=80px;
min_dialogBodyHeight=min_dialogHieght - marginBottom;
max_dialogBodyHeight=max_dialogHieght - marginBottom;
tabHeaderHeight=56px;
imgWrapperHeight=min_dialogBodyHeight - tabHeaderHeight - 40px - 36px;
.selectPicture {
    .el-dialog.el-dialog--small {
        min-height: min_dialogHieght;
        max-height: max_dialogHieght;
        .el-dialog__header {
            padding: 0;
            .el-dialog__headerbtn {
                float: none;
                position: absolute;
                top: 20px;
                right: 20px;
                z-index: 1;
            }
        }
        .el-dialog__body {
            padding: 0;
            min-height: min_dialogBodyHeight;
            max-height: max_dialogBodyHeight;
            margin-bottom: marginBottom;
            .el-tabs {
                min-height: min_dialogBodyHeight;
                max-height: max_dialogBodyHeight;
                .el-tabs__header {
                    padding: 0 12px;
                    .el-tabs__item {
                        height: tabHeaderHeight;
                        line-height: tabHeaderHeight;
                        font-size: 16px;
                    }
                }
                .el-tabs__content {
                    min-height: min_dialogBodyHeight - tabHeaderHeight;
                    max-height: max_dialogBodyHeight - tabHeaderHeight;
                    overflow: auto;
                }
            }
        }
    }
    .upload {
        width: 100%;
        padding: 20px 15px 0;
        .el-upload-list__item-thumbnail {
            width: auto;
            height: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            max-width: 100%;
            max-height: 100%;
            margin: auto;
            user-select: none;
        }
    }
    .select {
        min-height: inherit;
        max-height: inherit;
        .imgInput {
            padding: 20px;
        }
        .imgWrapper {
            width: 100%;
            height: imgWrapperHeight;
            padding: 0 15px;
            overflow: auto;
        }
    }
}
</style>
