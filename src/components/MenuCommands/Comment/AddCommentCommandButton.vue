<template>
    <command-button :command="reqComment" :enable-tooltip="enableTooltip"
        :tooltip="t('editor.extensions.CodeBlock.tooltip')" icon="code" :button-icon="buttonIcon" />
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Editor } from '@tiptap/vue-3';
import CommandButton from '../CommandButton.vue';

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
        buttonIcon: {
            default: '',
            type: String
        }
    },

    setup() {
        const t = inject('t');
        const enableTooltip = inject('enableTooltip', true);

        return { t, enableTooltip };
    },

    methods: {
        reqComment() {
            const { from, to } = this.editor.state.selection // 获取选区的开始和结束位置
            const text = this.editor.state.doc.textBetween(from, to) // 获取选区的文本内容
            const hasMark = this.editor.state.doc.rangeHasMark(from, to, this.editor.schema.marks["comment"])
            console.log(hasMark)
            const comment = {
                message: text,
                from,
                to
            }
            this.editor.commands.reqComment(comment)
        },
    },
});
</script>
  