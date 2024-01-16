import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    handleMethods: {
        reqComment: ({ }) => ReturnType;
        reqCreateTask: ({ }) => ReturnType;
    };
  }
}

const HandleMethods = Extension.create({
  name: 'handleMethods',

  addOptions() {
    return {
        handleReqComment:null,
        handleReqCreateTask:null
    };
  },
  addCommands() {
    return {
        reqComment: (options) =>
        ({ commands }) => {
          console.log(options)
          if (this.options.handleReqComment) {
            this.options.handleReqComment(options)
          }
        },
        reqCreateTask: (options) =>
        ({ commands }) => {
          console.log(options)
          if (this.options.handleReqCreateTask) {
            this.options.handleReqCreateTask(options)
          }
        },
    };
  },

});

export default HandleMethods;
