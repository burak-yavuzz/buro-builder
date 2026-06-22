<template>
  <ul class="list-unstyled ms-3 border-start ps-2 border-primary-subtle">
    <li v-for="node in nodes" :key="node.id" class="mb-1">
      <div 
        class="tree-item d-flex justify-content-between align-items-center" 
        :class="{ 'active': store.selectedNodeId === node.id }"
        @click.stop="store.selectNode(node.id)"
      >
        <span class="text-dark"><i class="fa fa-box me-2"></i> {{ componentSchemas[node.type].name }}</span>
        <button class="btn btn-link text-danger p-0" @click.stop="store.removeNode(node.id)"><i class="fa fa-times"></i></button>
      </div>
      <NavigatorTree v-if="node.children && node.children.length > 0" :nodes="node.children" />
    </li>
  </ul>
</template>

<script setup>
import { useBuilderStore } from '../store/builderStore';
import { componentSchemas } from '../config/schemas';
const props = defineProps(['nodes']);
const store = useBuilderStore();
</script>