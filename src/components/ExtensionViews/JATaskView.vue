<template>
    <node-view-wrapper as="div" class="ja-task-view">
        <div>
            <div>{{ node!.attrs.jaTaskName }}</div>
        <button :contenteditable="false" @click="clickJump">跳转链接</button>
        </div>
    </node-view-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';

export default defineComponent({
    name: 'JATaskView',
    components: {
        NodeViewWrapper,
    },
    props: nodeViewProps,
    computed: {
    jaTaskNodeOptions() {
      return this.editor.extensionManager.extensions.find(
        (e) => e.name === 'jaTask'
      )!.options;
    },
  },
    methods: {
        clickJump() {
            console.log(this.node!.attrs.jaTaskId)
            this.jaTaskNodeOptions.handleTask(this.node!.attrs.jaTaskId);
    
        }
    },
});
</script>
<style scoped>
.ja-task-view {
    background-color: antiquewhite;
}
</style>
