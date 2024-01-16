import { Mark, mergeAttributes, Range } from "@tiptap/core";
import { Mark as PMMark } from "@tiptap/pm/model";
import CommandButton from '@/components/MenuCommands/CommandButton.vue';
import type { Editor } from '@tiptap/core';

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    comment: {
      /**
       * Set a comment (add)
       */
      setComment: (commentId: string) => ReturnType;
      /**
       * Unset a comment (remove)
       */
      unsetComment: (commentId: string) => ReturnType;

      reqComment: ({ }) => ReturnType;
    };
  }
}

export interface MarkWithRange {
  mark: PMMark;
  range: Range;
}

export interface CommentOptions {
  HTMLAttributes: Record<string, any>;
  onCommentActivated: (commentId: string) => void;
}

export interface CommentStorage {
  activeCommentId: string | null;
}

const CommentExtension = Mark.create<CommentOptions, CommentStorage>({
  name: "comment",
  addOptions() {
    return {
      HTMLAttributes: {
        class: "tip-comment"
      },
      handleReqComment: null,
      onCommentActivated: () => { },
      // button({ editor, t }: { editor: Editor; t: (...args: any[]) => string }) {
      //   return {
      //     component: CommandButton,
      //     componentProps: {
      //       editor,
      //       command: () => {
      //           const { from, to } = editor.state.selection // 获取选区的开始和结束位置
      //           const text = editor.state.doc.textBetween(from, to) // 获取选区的文本内容
      //           const hasMark = editor.state.doc.rangeHasMark(from, to, editor.schema.marks["comment"])
      //           console.log(hasMark)
      //           const comment = {
      //             message: text,
      //             from,
      //             to
      //           }
      //           editor.commands.reqComment(comment)
      //     },
      //       icon: 'bold',
      //       tooltip: t('editor.extensions.Bold.tooltip'),
      //     },
      //   };
      // },
    };
  },

  addAttributes() {
    return {
      commentId: {
        default: null,
        parseHTML: (el) =>
          (el as HTMLSpanElement).getAttribute("data-comment-id"),
        renderHTML: (attrs) => ({ "data-comment-id": attrs.commentId }),
      },
      commentIds: {
        default: []
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: "[data-comment-id]",
        getAttrs: (el) =>
          !!(el as HTMLSpanElement).getAttribute("data-comment-id")?.trim() &&
          null,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {

    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  onSelectionUpdate() {
    const { $from } = this.editor.state.selection;

    const marks = $from.marks();

    if (!marks.length) {
      this.storage.activeCommentId = null;
      this.options.onCommentActivated(this.storage.activeCommentId);
      return;
    }

    const commentMark = this.editor.schema.marks.comment;

    const activeCommentMark = marks.find((mark) => mark.type === commentMark);

    this.storage.activeCommentId = activeCommentMark?.attrs.commentId || null;

    this.options.onCommentActivated(this.storage.activeCommentId);
  },

  addStorage() {
    return {
      activeCommentId: null,
    };
  },

  addCommands() {
    return {
      reqComment: (options) =>
        ({ commands }) => {
          console.log(options)
          if (this.options.handleReqComment) {
            this.options.handleReqComment(options).then(commentId => {
              this.editor.commands.setComment(commentId)
            })
          }
        },
      setComment:
        (commentId) =>
          ({ commands }) => {
            if (!commentId) return false;

            const { from, to } = this.editor.state.selection // 获取选区的开始和结束位置
            const selection = this.editor.state.selection;
            console.log(this.editor.state.selection)
            const hasMark = this.editor.state.doc.rangeHasMark(from, to, this.editor.schema.marks["comment"])

            console.log(hasMark)
            let marks = []

            if (selection instanceof Selection) {
              const { $from, $to } = selection
              this.editor.state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
                marks.push(...node.marks)
              })
            }
            
            console.log(marks)

            // // 获取所有的 marks
            // let marks = this.editor.state.schema.marks;
            // console.log(marks)
            // // 遍历所有的 marks
            // for (let markType in marks) {
            //   // 使用 "state.doc.rangeHasMark" 方法检查 selection 中是否包含 mark
            //   if (this.editor.state.doc.rangeHasMark(from, to, marks[markType])) {
            //     console.log(`Selection contains mark: ${markType}`);
            //   }
            // }

            commands.setMark("comment", { commentId });
          },
      unsetComment:
        (commentId) =>
          ({ tr, dispatch }) => {
            if (!commentId) return false;

            const commentMarksWithRange: MarkWithRange[] = [];

            tr.doc.descendants((node, pos) => {
              const commentMark = node.marks.find(
                (mark) =>
                  mark.type.name === "comment" &&
                  mark.attrs.commentId === commentId,
              );

              if (!commentMark) return;

              commentMarksWithRange.push({
                mark: commentMark,
                range: {
                  from: pos,
                  to: pos + node.nodeSize,
                },
              });
            });

            commentMarksWithRange.forEach(({ mark, range }) => {
              tr.removeMark(range.from, range.to, mark);
            });

            return dispatch?.(tr);
          },
    };
  },
});

export default CommentExtension;