<template>
  <div id="newestCom">
      <div class="comment_info">与读者（特别是与粉丝）互动有助于提升「头条号指数」中的「关注度」。可以对优质评论进行推荐，被推荐的评论将突出展示，每篇文章可推荐一条评论。</div>
      <div class="comment_container">
          <comment-list></comment-list>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  watch: {},
  mounted() {}
}

</script>
<style scoped lang='stylus'>
#newestCom {
  padding: 20px 24px;
  color: #222;
  .comment_info{
    color: #999;
    font-size: 14px;
    margin-bottom: 12px;
  }
  .comment_container{
    border: 1px solid #e8e8e8;
  }
}

</style>
