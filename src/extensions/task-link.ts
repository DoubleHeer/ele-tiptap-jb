import { Mark, markPasteRule, mergeAttributes } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'
import { find, registerCustomProtocol, reset } from 'linkifyjs'
import { EditorView } from '@tiptap/pm/view';

export interface LinkProtocolOptions {
  scheme: string;
  optionalSlashes?: boolean;
}

export interface LinkOptions {
  /**
   * An array of custom protocols to be registered with linkifyjs.
   */
  protocols: Array<LinkProtocolOptions | string>

  /**
   * A list of HTML attributes to be rendered.
   */
  HTMLAttributes: Record<string, any>
  /**
   * A validation function that modifies link verification for the auto linker.
   * @param url - The url to be validated.
   * @returns - True if the url is valid, false otherwise.
   */
  validate?: (url: string) => boolean
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    taskLink: {
      setTaskLinkWarp: (options: {}) => ReturnType;
    }
  }
}

const TaskLink = Mark.create<LinkOptions>({
  name: 'taskLink',

  priority: 1000,

  keepOnSplit: false,

  onCreate() {
    this.options.protocols.forEach(protocol => {
      if (typeof protocol === 'string') {
        registerCustomProtocol(protocol)
        return
      }
      registerCustomProtocol(protocol.scheme, protocol.optionalSlashes)
    })
  },

  onDestroy() {
    reset()
  },

  //   inclusive() {
  //     return this.options.autolink
  //   },

  addOptions() {
    return {
      openOnClick: true,
      linkOnPaste: true,
      autolink: true,
      protocols: [],
      handleTask: null,
      HTMLAttributes: {
        class: null,
      },
      validate: undefined,
    }
  },

  addAttributes() {
    return {
      tlink: {
        default: null,
      },
      class: {
        default: this.options.HTMLAttributes.class,
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
    }
  },

  parseHTML() {
    return [{ tag: 'task[tlink]:not([tlink *= "javascript:" i])' }]
  },

  renderHTML({ HTMLAttributes }) {
    // False positive; we're explicitly checking for javascript: links to ignore them
    // eslint-disable-next-line no-script-url
    if (HTMLAttributes.tlink?.startsWith('javascript:')) {
      // strip out the href
      return ['task', mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, tlink: '' }), 0]
    }
    return ['task', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setTaskLinkWarp:
        (options) =>
          ({ commands }) => {
            if (!(typeof options.jaTaskData === "string")) {
              options.jaTaskData = JSON.stringify(options.jaTaskData)
            }
            console.log(options)
            const elems = `<p>${options.jaTaskName} <task tlink=''  data-jaTask-id=${options.jaTaskId} data-jaTask-name=${options.jaTaskName} data-jaTask-data=${options.jaTaskData}>查看详情</task> </p>`
            return commands.insertContent(elems);
          },
    }
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
              return false
            }
            return true;
          },
        },
      }),
    ];
    // const plugins: Plugin[] = []

    // if (this.options.autolink) {
    //   plugins.push(
    //     autolink({
    //       type: this.type,
    //       validate: this.options.validate,
    //     }),
    //   )
    // }

    // if (this.options.openOnClick) {
    //   plugins.push(
    //     clickHandler({
    //       type: this.type,
    //     }),
    //   )
    // }

    // if (this.options.linkOnPaste) {
    //   plugins.push(
    //     pasteHandler({
    //       editor: this.editor,
    //       type: this.type,
    //     }),
    //   )
    // }

    // return plugins
  },
})

export default TaskLink;