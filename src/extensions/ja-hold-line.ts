import { Node, mergeAttributes } from '@tiptap/core';
import { Editor, VueNodeViewRenderer } from '@tiptap/vue-3';
import CommandButton from '@/components/MenuCommands/CommandButton.vue';
import JAHoldLineView from '@/components/ExtensionViews/JAHoldLineView.vue';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    jaHoldLine: {
      setJAHoldLine: (options: { title: string }) => ReturnType;
    };
  }
}

const JAHoldLine = Node.create({
  name: 'jaHoldLine',

  // schema
  group: 'block',
  selectable: false,

  addAttributes() {
    return {
      ...this.parent?.(),
      title: {
        default: '',
        parseHTML: (element) => {
          const src = element.getAttribute('title');
          return src;
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `div.node-${this.name}`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setJAHoldLine:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addOptions() {
    return {
        button({ editor, t }: { editor: Editor; t: (...args: any[]) => string }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
                editor.commands.setJAHoldLine({title:'测试标题栏'});
            },
            icon: 'horizontal-rule',
            tooltip: t('editor.extensions.HorizontalRule.tooltip'),
          },
        };
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(JAHoldLineView);
  },
});

export default JAHoldLine;
