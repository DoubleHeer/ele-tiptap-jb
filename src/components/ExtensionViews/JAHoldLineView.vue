<template>
    <node-view-wrapper as="div" class="ja-hold-line-view">
        <h1>{{node!.attrs.title}}</h1>
    </node-view-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';

export default defineComponent({
  name: 'JAHoldLineView',
  components: {
    NodeViewWrapper,
  },
  props: nodeViewProps,
});
</script>
<style scoped>
.ja-hold-line-view {
    background-color: antiquewhite;
}
</style>
