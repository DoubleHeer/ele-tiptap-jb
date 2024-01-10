import { Node, mergeAttributes } from '@tiptap/core';
import { Editor, VueNodeViewRenderer } from '@tiptap/vue-3';
import CommandButton from '@/components/MenuCommands/CommandButton.vue';
import JATaskView from '@/components/ExtensionViews/JATaskView.vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        jaTask: {
            setJaTask: (options: { }) => ReturnType;
        };
    }
}

const JATask = Node.create({
    name: 'jaTask',
    // schema
    group: 'block',
    selectable: false,

    addAttributes() {
        return {
            id: {
                default: undefined,
                parseHTML: element => element.getAttribute('data-id'),
                renderHTML: attributes => ({
                    'data-id': attributes.id,
                }),
            },
            jaTaskId: {
                default: undefined,
                parseHTML: element => element.getAttribute('data-jaTask-id'),
                renderHTML: attributes => ({
                    'data-jaTask-id': attributes.jaTaskId,
                }),
            },
            jaTaskName: {
                default: undefined,
                parseHTML: element => element.getAttribute('data-jaTask-name'),
                renderHTML: attributes => ({
                    'data-jaTask-name': attributes.jaTaskName,
                }),
            },
            jaTaskData: {
                default: undefined
            }
        };
    },

    parseHTML() {
        return [
          {
            tag: `div.node-${this.name}`,
          },
        ]
      },
    
      renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
      },

    addCommands() {
        return {
            setJaTask:
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
            handleTask:null,
            HTMLAttributes: {
              class: `node-${this.name}`,
            }
            // button({ editor, t }: { editor: Editor; t: (...args: any[]) => string }) {
            //     return {
            //         component: CommandButton,
            //         componentProps: {
            //             command: () => {
            //                 editor.commands.setJaTask({"jaTaskName": "测试任务没那s阿萨德个"});
            //                 editor.commands.insertContent({
            //                     type: 'paragraph'
            //                 });
                            
            //             },
            //             icon: 'horizontal-rule',
            //             tooltip: t('editor.extensions.HorizontalRule.tooltip'),
            //         },
            //     };
            // }
        };
    },
    addNodeView() {
        return VueNodeViewRenderer(JATaskView);
    },
});

export default JATask;
