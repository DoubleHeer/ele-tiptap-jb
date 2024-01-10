<template>
    <node-view-wrapper as="div" class="ja-task-view">
        <node-view-wrapper as="div" :contenteditable="true" >
            <div>{{ node!.attrs.jaTaskName }}</div>
        </node-view-wrapper>
        <button :contenteditable="false" @click="clickJump">跳转链接</button>
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
            this.jaTaskNodeOptions.handleTask(this.node!.attrs.jaTaskData)
        }
    },
});
</script>
<style scoped>
.ja-task-view {
    background-color: antiquewhite;
}
[contenteditable]:focus {
    outline: none;
}

</style>
