<template>
    <bubble-menu v-if="editor" :editor="editor" v-show="activeMenu !== 'none'" :shouldShow="menuShouldShow">
        <div :class="{ 'el-tiptap-editor__menu-bubble--active': bubbleMenuEnable }" class="el-tiptap-editor__menu-bubble">
            <add-comment-command-button :editor="editor" />
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
    DEFAULT = 'default'
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
            bubbleMenuEnable:false
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
            }
            else {
                this.bubbleMenuEnable = false
            }
            this.setMenuType(MenuType.DEFAULT);
        },
    },

    methods: {
        menuShouldShow() {
            return true
        },
        generateCommandButtonComponentSpecs() {
            const extensionManager = this.editor.extensionManager;
            return extensionManager.extensions.reduce((acc: any, extension) => {
         
                // if (!extension.options.bubble) return acc;
                if(!(extension.name == 'comment')) return acc;
          
                const { button } = extension.options;
                if (!button || typeof button !== 'function') return acc;
      
                const menuBtnComponentSpec = button({
                    editor: this.editor,
                    t: this.t, // i18n
                    extension,
                });

                if (Array.isArray(menuBtnComponentSpec)) {
                    return [...acc, ...menuBtnComponentSpec.map(item => { return { ...item, priority: extension.options.priority }; })];
                }

                return [...acc, { ...menuBtnComponentSpec, priority: extension.options.priority }];
            }, [])?.sort((a: any, b: any) => b.priority - a.priority);
        },

        setMenuType(type: MenuType) {
            this.activeMenu = type;
        },
        $_isSelectSelection(selection: Selection) {
            const { $from, $to } = selection;
            return $to.pos > $from.pos;
        },

    },
});
</script>
  