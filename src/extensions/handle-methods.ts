import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    handleMethods: {
      reqCreateTask: ({}) => ReturnType;
    };
  }
}

const HandleMethods = Extension.create({
  name: 'handleMethods',

  addOptions() {
    return {
      handleReqCreateTask: null
    };
  },
  addCommands() {
    return {
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
