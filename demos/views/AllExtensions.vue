<template>
  <div class="el-tiptap-editor__wrapper">
    <button @click="clickDemo">测试暴露editor调用</button>
    <el-tiptap :extensions="textExtensions" :content="content" output="json" @onUpdate="onUpdate" @onCreate="onCreate" />

    <el-tiptap :extensions="paragraphExtensions" content="Paragraph Extensions" />

    <el-tiptap :extensions="richAndToolsExtensions" content="Rich And Tools Extensions" @onUpdate="onUpdate1" />
  </div>
</template>

<script setup>
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
  TaskLink
} from 'element-tiptap';

import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'; // import base style
import 'codemirror/mode/xml/xml.js'; // language
import 'codemirror/addon/selection/active-line.js'; // require active-line.js
import 'codemirror/addon/edit/closetag.js'; // autoCloseTags
import { ref } from 'vue';

const textExtensions = [
  Document,
  Text,
  Paragraph,
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
  JATask.configure({
    handleTask: (data) => {
      console.log('------------')
      console.log(data)
    }
  }),
  JAHoldLine,
  TaskLink.configure({
    handleTask: (data) => {
      console.log('------------')
      console.log(data)
    }
  }),
  Link
];

const paragraphExtensions = [
  Document,
  Text,
  Paragraph,
  Heading.configure({ level: 5 }),
  BulletList,
  OrderedList,
  TaskList,
  TextAlign,
  LineHeight,
  Indent,
  Blockquote,
  CodeBlock,
  History,
  TaskLink
];

const richAndToolsExtensions = [
  Document,
  Text,
  Paragraph,
  Link,
  Image.configure(

  ),
  Iframe,
  Table.configure({ resizable: true }),
  TrailingNode,
  HorizontalRule,
  Print,
  SelectAll,
  Fullscreen,
  CodeView.configure({
    codemirror,
    codemirrorOptions: {
      styleActiveLine: true,
      autoCloseTags: true,
    },
  }),
  History,
];
const jbEditor = ref(null);
const onCreate = (editor) => {
  //在create方法中暴露editor
  console.log(editor)
  jbEditor.value = editor;

}
let idcc = 123
const clickDemo = () => {
  console.log(jbEditor.value)

  const options = {
    jaTaskId: idcc++,
    jaTaskName: "任务id123",
    jaTaskData:  {
    "id": "newTask140990d0",
    "type": "newTask",
    "data": {
      "taskId": 100000000010409,
      "text": "",
      "taskTags": [],
      "executorUsers": [
        385904649646597,
        100000000001501,
        321285524263429,
        321554630849029,
        423130941943621
      ],
      "createdUser": 321554630849029,
      "isExist": "TRUE",
      "title": "tt",
      "isCopy": null
    }
  }
  }
  jbEditor.value.commands.setTaskLink(options)
  // jbEditor.value.commands.setJAHoldLine({ 'title': 'hhhh' });
};
const onUpdate = (output, editor) => {
  console.log(output);

  console.log(editor.getHTML())
};
const onUpdate1 = (output, editor) => {

  console.log(editor.getHTML())
  console.log(editor.getJSON())
};
const content = {
  "type": "doc",
  "content": [
  {
    "type": "paragraph",
    "content": [
      {
        "type": "text",
        "text": "Text Extensions"
      }
    ]
  }
  ]
}
</script>
