<template>
    <command-button :command="reqComment" :enable-tooltip="enableTooltip"
        :tooltip="t('editor.extensions.CodeBlock.tooltip')" icon="code" button-icon="评论" />
    <command-button :command="reqCreateTask" :enable-tooltip="enableTooltip"
        :tooltip="t('editor.extensions.CodeBlock.tooltip')" icon="code" button-icon="任务" />
    <command-button :command="reqShowComment" v-if="hasComment" :enable-tooltip="enableTooltip"
        :tooltip="t('editor.extensions.CodeBlock.tooltip')" icon="code" button-icon="查看" />
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Editor } from '@tiptap/vue-3';
import CommandButton from '../CommandButton.vue';
import { fa } from 'element-plus/es/locale';

export default defineComponent({
    name: 'AddCommentCommandButton',

    components: {
        CommandButton,
    },

    props: {
        editor: {
            type: Editor,
            required: true,
        },
        isImage: {
            default: false,
            type: Boolean
        }
    },

    setup() {
        const t = inject('t');
        const enableTooltip = inject('enableTooltip', true);

        return { t, enableTooltip };
    },
    computed: {
        hasComment(): boolean {
            if(!this.isImage) return false
            const { $from } = this.editor.state.selection;
            const marks = $from.marks();
            if (!marks) return false;
            const commentMark = this.editor.schema.marks.comment;
            const activeCommentMark = marks.find((mark) => mark.type === commentMark);

            const activeCommentId = activeCommentMark?.attrs.commentId || null;
            console.log(activeCommentId)
            return activeCommentId? true:false
        },
    }   ,

    methods: {
        reqComment() {
            const { from, to } = this.editor.state.selection // 获取选区的开始和结束位置
            let text = this.editor.state.doc.textBetween(from, to) // 获取选区的文本内容
            if(this.isImage){
                text = "[图片]"
            }
            const comment = {
                message: text,
                from,
                to
            }
            this.editor.commands.reqComment(comment)
        },
        reqCreateTask() {
            const { from, to } = this.editor.state.selection // 获取选区的开始和结束位置
            let text = this.editor.state.doc.textBetween(from, to) // 获取选区的文本内容
            if(this.isImage){
                text = "[图片]"
            }
            const task = {
                message: text,
                from,
                to
            }
            this.editor.commands.reqCreateTask(task)
        },
        reqShowComment() {
            const { $from } = this.editor.state.selection;
            const marks = $from.marks();
            if (!marks) return false;
            const commentMark = this.editor.schema.marks.comment;
            const activeCommentMark = marks.find((mark) => mark.type === commentMark);

            const activeCommentId = activeCommentMark?.attrs.commentId || null;
            console.log('点击回调显示图片评论')
            this.editor.commands.showComment(activeCommentId)
        }
    },
});
</script>
  