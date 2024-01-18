<template>
    <bubble-menu v-if="editor" :editor="editor" v-show="activeMenu !== 'none'" :shouldShow="menuShouldShow">
        <div :class="{ 'el-tiptap-editor__menu-bubble--active': bubbleMenuEnable }" class="el-tiptap-editor__menu-bubble">
            <add-comment-command-button :editor="editor" :isImage="activeMenu === 'image'" />
        </div>
    </bubble-menu>
</template>
  
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Editor, BubbleMenu } from '@tiptap/vue-3';
import { getMarkRange } from '@tiptap/core';
import { TextSelection, AllSelection, Selection } from 'prosemirror-state';
import VIcon from '../Icon/Icon.vue';
import AddCommentCommandButton from '@/components/MenuCommands/Comment/AddCommentCommandButton.vue';

const enum MenuType {
    NONE = 'none',
    DEFAULT = 'default',
    IMAGE = 'image'
}

export default defineComponent({
    name: 'CommentBubble',

    components: {
        BubbleMenu,
        VIcon,
        AddCommentCommandButton
    },

    props: {
        editor: {
            type: Editor,
            required: true,
        },

        menuBubbleOptions: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            activeMenu: MenuType.NONE,
            bubbleMenuEnable: false
        }
    },

    setup() {
        const t = inject('t');
        const enableTooltip = inject('enableTooltip', true);
        const isCodeViewMode = inject('isCodeViewMode', false);

        return { t, enableTooltip, isCodeViewMode };
    },

    computed: {
    },

    watch: {
        'editor.state.selection': function (selection: Selection) {
            if (this.$_isSelectSelection(selection)) {
                this.bubbleMenuEnable = true
                // this.setMenuType(MenuType.DEFAULT);
                //禁用图片等其他气泡
                this.activeMenu = this.$_getCurrentMenuType();
            }
            else {
                this.bubbleMenuEnable = false
                this.setMenuType(MenuType.NONE);
            }
        },
    },

    methods: {
        menuShouldShow() {
            return true
        },
        setMenuType(type: MenuType) {
            this.activeMenu = type;
        },
        $_isSelectSelection(selection: Selection) {
            const { $from, $to } = selection;
            return $to.pos > $from.pos;
        },
        $_getCurrentMenuType(): MenuType {
            if (
                this.editor.state.selection instanceof TextSelection ||
                this.editor.state.selection instanceof AllSelection
            ) {
                return MenuType.DEFAULT;
            }
            let { node } = this.editor.state.selection;
            if (node && node.type.name === 'image') {
                console.log('当前选区是图片');
                return MenuType.IMAGE;
            } 

            return MenuType.NONE;
        },

    },
});
</script>
  