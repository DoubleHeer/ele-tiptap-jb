import { getMarkRange } from '@tiptap/core';
import type { Editor } from '@tiptap/core';
import TiptapLink from '@tiptap/extension-link';
import { Plugin, TextSelection } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
// import AddLinkCommandButton from '@/components/MenuCommands/Link/AddLinkCommandButton.vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        taskLink: {
            setTaskLinkWarp: (options: {}) => ReturnType;
            setTaskLink: (options: {}) => ReturnType;
        };
    }
}

const TaskLink = TiptapLink.extend({
    name: "taskLink",
    addAttributes() {
        return {
            ...this.parent?.(),
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
                default: undefined,
                parseHTML: element => element.getAttribute('data-jaTask-data'),
                renderHTML: attributes => ({
                    'data-jaTask-data': attributes.jaTaskData,
                }),
            }
        };
    },
    addCommands() {
        return {
            setTaskLinkWarp:
                (options) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: options,
                        });
                    },
            setTaskLink:
                (options) =>
                    ({ commands }) => {
                        if (!(typeof options.jaTaskData === "string")) {
                            options.jaTaskData = JSON.stringify(options.jaTaskData)
                        }
                        console.log(options)
                        const elems = `<p>${options.jaTaskName} <a target="_blank"  data-jaTask-id=${options.jaTaskId} data-jaTask-name=${options.jaTaskName} data-jaTask-data=${options.jaTaskData} href="">查看详情</a> </p>`
                        return commands.insertContent(elems);
                    },
        };
    },
    addOptions() {
        return {
            ...this.parent?.(),
            handleTask: null
            // button({ editor }: { editor: Editor }) {
            //     return {
            //         component: AddLinkCommandButton,
            //         componentProps: {
            //             editor,
            //         },
            //     };
            // },
        };
    },

    addProseMirrorPlugins() {
        const handleTask = this.options.handleTask
        console.log(this.options)
        return [
            new Plugin({
                props: {
                    handleClick(view: EditorView, pos: number) {
                        console.log('回调tasklink')
                        // 获取点击位置的mark
                        const marks = view.state.doc.nodeAt(pos)?.marks;
                        if (!marks) return false;
                        console.log(marks)
                        const clickedMark = marks.find(mark => mark.type.name === 'taskLink')
                        console.log(clickedMark)
                        if (clickedMark && handleTask) {
                            // 处理点击当前mark的逻辑
                            handleTask(clickedMark.attrs.jaTaskData)

                        }
                        return true;

                        console.log(view)
                        const { schema, doc, tr } = view.state;

                        const range = getMarkRange(doc.resolve(pos), schema.marks.link);

                        if (!range) return false;

                        const $start = doc.resolve(range.from);
                        const $end = doc.resolve(range.to);

                        const transaction = tr.setSelection(
                            new TextSelection($start, $end)
                        );

                        view.dispatch(transaction);
                        return true;
                    },
                },
            }),
        ];
    },
});

export default TaskLink;
