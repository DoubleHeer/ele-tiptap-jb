<template>
  <div class="el-tiptap-editor__wrapper">
    <button @click="clickDemo">测试暴露editor调用</button>
    <el-tiptap :extensions="textExtensions" :content="content" output="json" @onUpdate="onUpdate" @onCreate="onCreate" />

    <el-tiptap :extensions="paragraphExtensions" content="Paragraph Extensions" />

    <el-tiptap :extensions="richAndToolsExtensions" content="Rich And Tools Extensions" />
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
  JAHoldLine
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
  JAHoldLine
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
      "taskId": 100000000007121,
      "text": "",
      "taskTags": [],
      "executorUsers": [
        321285555352069,
        100000000024257,
        100000000024258,
        100000000001501,
        321285524263429,
        385904649646597,
        321289949549061,
        321289962598917,
        321534260158981,
        321539785261573,
        321554630849029,
        321285522637317,
        321271308612101,
        100000000024260,
        321535489626629,
        321555362390533,
        321535436399109,
        321540455547397,
        321534257381893,
        399069712077317,
        321285538710023,
        321292458172934,
        321297336390149,
        321297336635909,
        423130941943621,
        321540453347845,
        321539762184709,
        321554696081925
      ],
      "createdUser": 321554630849029,
      "isExist": "TRUE",
      "title": "ll000",
      "list": null,
      "isCopy": null
    }
  }
  }
  jbEditor.value.commands.setJaTask(options)
  // jbEditor.value.commands.setJAHoldLine({ 'title': 'hhhh' });
};
const onUpdate = (output, editor) => {
  console.log(output);
  console.log(editor.getHTML())
};

const content = {
  "type": "doc",
  "content": [{
    "type": "jaHoldLine",
    "attrs": {
      "title": "任务标题yi"
    }
  },
  {
    "type": "jaTask",
    "attrs": {
      "jaTaskName": "测试任务没那个",
      "jaTaskId": "12345"
    }
  },
  {
    "type": "jaHoldLine",
    "attrs": {
      "title": "任务标题yi"
    }
  },
  {
    "type": "jaTask",
    "attrs": {
      "jaTaskName": "测试任务没那个",
      "jaTaskId": "33333"
    }
  },
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
