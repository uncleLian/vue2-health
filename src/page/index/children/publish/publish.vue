<template>
  <div id='publish'>
    <div class="write">
      <!-- title -->
      <div class="title">
        <input type='text' placeholder="标题(5-30字)" v-model="title">
        <div class="title_count"><span :class="{'error': title.length > 30}">{{title.length}}</span> / 30</div>
      </div>
      <!-- content -->
      <div class="body">
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption">
          <div id="toolbar" slot="toolbar">
            <div class="ql-formats">
              <button class="ql-header" value="1" title="H1标题"></button>
              <button class="ql-bold" title="加粗"></button>
              <button class="ql-blockquote" title="引用"></button>
              <button class="ql-list" value='ordered' title="有序列表"></button>
              <button class="ql-list" value="bullet" title="无序列表"></button>
            </div>
            <div class='ql-formats'>
              <button class="picLib_btn" title="插入图片" @click.stop="picLibrary = true"></button>
              <button class="ql-link" title="文章链接"></button>
              <button class="ql-video" title="插入视频"></button>
            </div>
            <div class="ql-formats">
              <button class="ql-clean" title="清除格式"></button>
              <button class="undo" title="撤销" @click.stop="editor.history.undo()"></button>
              <button class="redo" title="重做" @click.stop="editor.history.redo()"></button>
            </div>
          </div>
        </quill-editor>
      </div>
    </div>
    <!-- 图片库 -->
    <el-dialog class="picLibrary" title="图片库" :visible.sync="picLibrary">
      <el-upload class="upload" action="https://jsonplaceholder.typicode.com/posts/" drag multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
    <!-- edit -->
    <div class="edit">
      <div class="cover edit-cell">
        <div class="edit-label">封面</div>
        <div class="edit-input">
          <div class="select_radio">
            <el-radio-group v-model="cover_mode">
              <el-radio label="one">单图</el-radio>
              <el-radio label="three">三图</el-radio>
            </el-radio-group>
          </div>
          <div class="upload_pic">
            <el-upload action="http://api.toutiaojk.com/e/extend/jkh/upload_file.php" list-type="picture-card" :multiple="true" :before-upload="handleFormat" :on-preview="handlePreview" :on-success="handleSuccess" :on-error="handleError">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl">
            </el-dialog>
          </div>
          <div class="cover_tip">优质的封面有利于推荐，请使用清晰度较高的图片，避免使用GIF、带大量文字的图片。</div>
        </div>
      </div>
      <div class="label edit-cell">
        <div class="edit-label">标签</div>
        <div class="edit-input">
          <el-radio-group v-model="classid">
            <el-radio-button label="2">女性</el-radio-button>
            <el-radio-button label="3">育儿</el-radio-button>
            <el-radio-button label="4">中医</el-radio-button>
            <el-radio-button label="5">本地</el-radio-button>
            <el-radio-button label="6">政策</el-radio-button>
            <el-radio-button label="7">产业</el-radio-button>
            <el-radio-button label="8">旅游</el-radio-button>
            <el-radio-button label="20">其他</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- control -->
    <div class="control">
      <el-button class='publish_btn' type='danger' size='large' @click.stop="verify">发表</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      title: '',
      content: '',
      imgArr: [],
      classid: '',
      cover_mode: 'one',
      picLibrary: false,
      dialogVisible: false,
      dialogImageUrl: '',
      editorOption: {
        modules: {
          toolbar: '#toolbar',
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          }
        }
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    ...mapActions('publish', [
      'post_article_data'
    ]),
    handleFormat(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImg) {
        this.$message.error('上传图片只能是 jpg / png / gif 格式!')
      } else if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isImg && isLt2M
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file, fileList) {
      this.imgArr = fileList
    },
    handleError(err, file, fileList) {
      console.log(err)
      this.$message.error('上传失败，请重新尝试!')
    },
    publish() {
      let params = {
        'type': 'new',
        'title': this.title,
        'newstext': this.content,
        'titlepic': this.imgArr[0].response.data,
        'classid': this.classid,
        'state': 3
      }
      if (this.cover_mode === 'three') {
        params.titlepic2 = this.imgArr[1].response.data
        params.titlepic3 = this.imgArr[2].response.data
      }
      this.post_article_data(params)
        .then(res => {
          if (res.code === 1 && res.data) {
            this.$message.success('发表成功!')
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('出现错误，请重新发表!')
        })
    },
    verify() {
      if (this.title && this.title.length > 4 && this.content && this.imgArr.length > 0 && this.classid) {
        console.log(this.imgArr)
        this.$confirm('确定发表文章？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.publish()
        })
      } else if (!this.title) {
        this.$message.error('标题不能为空')
      } else if (this.title && this.title.length < 5) {
        this.$message.error('标题长度不能低于5个字')
      } else if (this.title && this.title.length > 30) {
        this.$message.error('标题长度不能超过30个字')
      } else if (!this.content) {
        this.$message.error('正文不能为空')
      } else if (!this.imgArr.length > 0) {
        this.$message.error('封面图片不能为空')
      } else if (!this.classid) {
        this.$message.error('标签不能为空')
      }
    }
  }
}

</script>
<style lang='stylus'>
#publish {
  padding: 20px 24px;
.write {
    position: relative;
    border: 1px solid #e9e9e9;
    margin-bottom: 50px;
    .title {
      position: relative;
      width: 100%;
      height: 58px;
      line-height: 58px;
      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        color: #595959;
        font-size: 20px;
        padding-left: 20px;
        padding-right: 80px;
      }
      .title_count {
        position: absolute;
        width: 80px;
        height: 100%;
        top: 0;
        right: 0;
        color: #595959;
        font-size: 16px;
        padding: 0 10px;
        text-align: right;
        .error {
          color: #ff4949;
        }
      }
    }
    .body {
      width: 100%;
      .quill-editor {
        min-height: 600px;
        .ql-toolbar.ql-snow {
          border: none;
          background: #eee;
        }
        .ql-toolbar {
          border-bottom: 1px solid #e9e9e9 !important;
        }
        .ql-container {
          font-size: 16px;
          color: #5D5D5D;
          border: none;
        }
        .ql-formats {
          padding-right: 20px;
          border-right: 1px solid #D8D8D8;
          button {
            width: 30px;
            height: 26px;
          }
        }
        h1 {
          position: relative;
          font-size: 18px;
          line-height: 24px;
          font-weight: 700;
          padding-left: 12px;
          &:after {
            content: "";
            width: 4px;
            height: 18px;
            background: #f85959;
            top: 3px;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
  .picLibrary{
    .upload{
        width: 100%;
    }
  }
  .edit {
    margin-bottom: 30px;
    .edit-cell {
      width: 100%;
      margin-bottom: 30px;
    }
    .edit-label {
      float: left;
      width: 122px;
      font-size: 16px;
    }
    .edit-input {
      margin-left: 122px;
      font-size: 14px;
      color: #999;
    }
    .el-radio {
      color: #999;
    }
    .el-radio__label {
      padding-left: 10px;
    }
    .cover {
      .select_radio {
        margin-bottom: 16px;
      }
      .cover_tip {
        padding-top: 10px;
      }
    }
  }
  .control {
    padding-left: 122px;
    margin-bottom: 30px;
  }
}

</style>
<style>
#publish .undo {
  background: url(~@/assets/icon/laststep.png)no-repeat center center;
}

#publish .undo.nothing {
  opacity: 0.3;
}

#publish .redo {
  background: url(~@/assets/icon/nextstep.png)no-repeat center center;
}

#publish .redo.nothing {
  opacity: 0.3;
}

</style>
