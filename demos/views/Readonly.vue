<template>
  <div class="el-tiptap-editor__wrapper">
    <button @click="deleteComment">删除评论</button>
    <button @click="changeReadOnly">修改只读状态</button>
    <el-tiptap :extensions="extensions" :content="content" :readonly="readonly" :enableComment="true" @onCreate="onCreate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Document,
  Text,
  Paragraph,
  // text extensions
  Bold,
  Underline,
  Italic,
  Strike,
  Code,
  FontFamily,
  FontSize,
  Color,
  Highlight,
  FormatClear,
  // paragraph extensions
  Heading,
  BulletList,
  OrderedList,
  TaskList,
  TextAlign,
  LineHeight,
  Indent,
  Blockquote,
  CodeBlock,
  // rich and tools extensions
  Link,
  Image,
  Table,
  Iframe,
  HorizontalRule,
  Fullscreen,
  Print,
  SelectAll,
  History,
  CodeView,
  JATask,
  JAHoldLine,
  TrailingNode,
  TaskLink,
  Comment,
  HandleMethods
} from 'element-tiptap';
let commentId = 11
const extensions = [
  Document,
  Text,
  Paragraph,
  Heading.configure({ showLevels: [2, 3, 4] }),
  Bold.configure({ bubble: true }),
  Underline.configure({ bubble: true }),
  Italic.configure({ bubble: true }),
  Strike.configure({ bubble: true }),
  Code,
  FontFamily,
  FontSize,
  Color.configure({ bubble: true }),
  Highlight.configure({ bubble: true }),
  FormatClear,
  History,
  TaskLink.configure({
    handleTask: (data) => {
      console.log('点击任务回调')
      console.log(data)
    }
  }),
  Link,
  Image.configure(
    {
      uploadRequest() {
        return new Promise((resolve, reject) => {
          setTimeout(() => { resolve('https://www.shijuepi.com/uploads/allimg/200821/1-200R1141258.jpg') }, 3000)
        })
      }
    }
  ),
  Comment.configure({
    handleReqComment(comment) {
      console.log(comment)
      console.log('出来上传评论')
      return new Promise((resolve, reject) => {
        commentId++
        setTimeout(() => { resolve(`${commentId}`) }, 500)
      })
    },
    onCommentActivated(commentId) {
      console.log('点击激活评论块')
      console.log(commentId)
    }
  }),
  HandleMethods.configure({
    handleReqComment(comment) {
      console.log(comment)
      console.log('出来上传评论')

    },
    handleCreateTask(task) {
      console.log(task)
      console.log('点击创建任务')
    }
})
];

const content = '<h2>模块1</h2><p>文本数据123</p><p><a target="_blank" rel="noopener noreferrer nofollow" href="http://www.baidu.com">测试</a></p><p></p><p>&nbsp;</p><p><img src="https://ywja-public-bucket.oss-cn-hangzhou.aliyuncs.com//server-platform/3/upload/2024-01-12/1705038149417.png" width="100%" data-display="inline"></p><p>ll000 <task tlink=""  data-jaTask-id=100000000007121 data-jaTask-name=ll000 data-jaTask-data={"taskId":100000000007121,"executorUsers":[321285555352069,100000000024257,100000000024258,100000000001501,321285524263429,385904649646597,321289949549061,321289962598917,321534260158981,321539785261573,321554630849029,321285522637317,321271308612101,100000000024260,321535489626629,321555362390533,321535436399109,321540455547397,321534257381893,399069712077317,321285538710023,321292458172934,321297336390149,321297336635909,423130941943621,321540453347845,321539762184709,321554696081925],"createdUser":321554630849029,"isExist":"TRUE","taskTags":[],"text":"","title":"ll000"}>查看详情</task> </p><h2>模块2</h2><p>无</p><h2>模块3</h2><p>无</p><h2>模块4</h2><p>无</p><p>【晶鱼P0】“批注”+“快捷创任务”功能（V1.10.0版本）前端开发 <task tlink=""  data-jaTask-id=100000000525447 data-jaTask-name=【晶鱼P0】“批注”+“快捷创任务”功能（V1.10.0版本）前端开发 data-jaTask-data={"taskId":100000000525447,"text":null,"taskTags":[{"taskTagId":100000000001521,"name":"晶鱼","tagType":null}],"executorUsers":[385904649646597],"createdUser":399069712077317,"isExist":"TRUE","title":"【晶鱼P0】“批注”+“快捷创任务”功能（V1.10.0版本）前端开发","isCopy":null}>查看详情</task> </p><h3>01月03日 总结</h3><p>已完成方案设计并排期开发 <a href="https://alidocs.dingtalk.com/i/nodes/ZgpG2NdyVXaRGa1Ei23AQrZAJMwvDqPk?utm_scene=team_space">https://alidocs.dingtalk.com/i/nodes/ZgpG2NdyVXaRGa1Ei23AQrZAJMwvDqPk?utm_scene=team_space</a></p><h3>01月03日 日志</h3><p>1.完成晶鱼v1.11技术方案评审，（已申请到周六发版）<a href="https://alidocs.dingtalk.com/i/nodes/ZgpG2NdyVXaRGa1Ei23AQrZAJMwvDqPk?utm_scene=team_space">https://alidocs.dingtalk.com/i/nodes/ZgpG2NdyVXaRGa1Ei23AQrZAJMwvDqPk?utm_scene=team_space</a></p><p>2.简报<a href="https://github.com/ueberdosis/tiptap-templates/tree/main"><strong>tiptap-templates</strong></a><strong>库权限申请完成（目前下载库权限问题，还在跟进中）</strong>；</p><h3>01月03日 总结</h3><p>已完成方案设计并排期开发 <a href="https://alidocs.dingtalk.com/i/nodes/ZgpG2NdyVXaRGa1Ei23AQrZAJMwvDqPk?utm_scene=team_space">https://alidocs.dingtalk.com/i/nodes/ZgpG2NdyVXaRGa1Ei23AQrZAJMwvDqPk?utm_scene=team_space</a></p><p>2024日常任务 <task tlink=""  data-jaTask-id=100000000544343 data-jaTask-name=2024日常任务 data-jaTask-data={"taskId":100000000544343,"text":null,"taskTags":[],"executorUsers":[385904649646597],"createdUser":385904649646597,"isExist":"TRUE","title":"2024日常任务","isCopy":null}>查看详情</task> </p><h3>01月03日 日志</h3><p>1.完成晶鱼v1.11技术方案评审，（已申请到周六发版）<a href="https://alidocs.dingtalk.com/i/nodes/ZgpG2NdyVXaRGa1Ei23AQrZAJMwvDqPk?utm_scene=team_space">https://alidocs.dingtalk.com/i/nodes/ZgpG2NdyVXaRGa1Ei23AQrZAJMwvDqPk?utm_scene=team_space</a></p><p>2.简报<a href="https://github.com/ueberdosis/tiptap-templates/tree/main"><strong>tiptap-templates</strong></a><strong>库权限申请完成（目前下载库权限问题，还在跟进中）</strong>；</p><p>晶鱼小程序开发 <task tlink=""  data-jaTask-id=100000000257580 data-jaTask-name=晶鱼小程序开发 data-jaTask-data={"taskId":100000000257580,"text":"晶鱼小程序开发","taskTags":[],"executorUsers":[321534260158981],"createdUser":321534260158981,"isExist":"TRUE"}>查看详情</task> </p>'
const jbEditor = ref(null);
const onCreate = (editor) => {
  //在create方法中暴露editor
  console.log(editor)
  jbEditor.value = editor;

}

const deleteComment = () => {
  console.log('点击删除评论')
  console.log(jbEditor?.value.commands)
  console.log(commentId)
  jbEditor?.value.commands.unsetComment(`${commentId}`)
};
const readonly = ref(true);
const changeReadOnly = () => {
  console.log('点击切换只读')
  readonly.value = !readonly.value;
};
</script>
