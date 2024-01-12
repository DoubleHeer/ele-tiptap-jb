<template>
  <div class="el-tiptap-editor__wrapper">
    <el-tiptap
      :extensions="extensions"
      :content="content"
      placeholder="Write something ..."
      @onCreate="onCreateEvent"
      @onFocus="onFocusEvent"
      @onBlur="onBlurEvent"
      @onUpdate="onUpdateEvent"
    />
  </div>
</template>

<script setup>
import {
  Document,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  Blockquote,
  CodeBlock,
  Image,
  BulletList,
  OrderedList,
  TaskList,
  TextAlign,
  Indent,
  History,
} from 'element-tiptap';

import { ElNotification } from 'element-plus';

const extensions = [
  Document,
  Text,
  Paragraph,
  Heading.configure({ level: 5 }),
  Bold,
  Underline,
  Italic,
  Strike,
  Blockquote,
  CodeBlock,
  Image,
  TextAlign,
  BulletList,
  OrderedList,
  TaskList,
  Indent,
  History,
];

const content =
  '<p>任务id123 <task tlink="" data-jatask-id="123" data-jatask-name="任务id123" data-jatask-data="{&quot;id&quot;:&quot;newTask140990d0&quot;,&quot;type&quot;:&quot;newTask&quot;,&quot;data&quot;:{&quot;taskId&quot;:100000000010409,&quot;text&quot;:&quot;&quot;,&quot;taskTags&quot;:[],&quot;executorUsers&quot;:[385904649646597,100000000001501,321285524263429,321554630849029,423130941943621],&quot;createdUser&quot;:321554630849029,&quot;isExist&quot;:&quot;TRUE&quot;,&quot;title&quot;:&quot;tt&quot;,&quot;isCopy&quot;:null}}">查看详情</task> </p><p>&nbsp;</p><p><img src="https://i.ibb.co/4pJs2Lx/undraw-static-assets-rpm6.png" width="300"></p><p>Open <strong>Console</strong>, your action on the editor will be logged.</p>';

const onCreateEvent = () => {
  ElNotification.info({
    title: 'Editor Event',
    message: '🔥create',
  });
};

const onFocusEvent = () => {
  ElNotification.info({
    title: 'Editor Event',
    message: '🔥focus',
  });
};

const onBlurEvent = () => {
  ElNotification.info({
    title: 'Editor Event',
    message: '🔥blur',
  });
};

const onUpdateEvent = () => {
  ElNotification.info({
    title: 'Editor Event',
    message: '🔥update',
  });
};
</script>
