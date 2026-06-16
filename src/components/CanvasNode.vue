<template>
  <div 
    class="node-wrapper position-relative"
    :class="[
      isSelected ? 'selected-node' : '', 
      node.props.animation ? 'animate__animated ' + node.props.animation : '',
      node.type === 'col' ? `${node.props.size} ${node.props.sizeSm || 'col-12'}` : 'w-100 mb-2'
    ]"
    :style="{ 
       backgroundColor: node.props.bgColor !== '#ffffff' && node.props.bgColor !== 'transparent' ? node.props.bgColor : '', 
       borderRadius: node.props.borderRadius || '0px',
       fontFamily: node.props.fontFamily || 'inherit',
       fontSize: node.props.fontSize || 'inherit',
       fontWeight: node.props.fontWeight ? node.props.fontWeight.split(' ')[0] : 'inherit',
       color: node.props.customTextColor !== '#000000' ? node.props.customTextColor : 'inherit'
    }"
    @click.stop="store.selectNode(node.id)"
  >
    <button v-if="isSelected" class="btn btn-danger btn-sm delete-btn shadow" @click.stop="store.removeNode(node.id)">
      <i class="fa-solid fa-trash"></i>
    </button>

    <component :is="resolvedComponent" :props="node.props" :key="node.id">
      
      <draggable 
        v-if="isContainer"
        v-model="node.children" 
        group="canvas" 
        item-key="id" 
        class="nested-dropzone w-100"
        :class="node.type === 'row' ? 'row m-0' : 'd-flex flex-column h-100'"
        ghost-class="ghost-drop"
        animation="200"
      >
        <template #item="{ element }">
          <CanvasNode :node="element" />
        </template>
      </draggable>

    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import draggable from 'vuedraggable';
import { useBuilderStore } from '../store/builderStore';
import { componentSchemas } from '../config/schemas';

import RowElement from '../elements/RowElement.vue';
import ColElement from '../elements/ColElement.vue';
import SpacerElement from '../elements/SpacerElement.vue';
import HeadingElement from '../elements/HeadingElement.vue';
import TextElement from '../elements/TextElement.vue';
import ButtonElement from '../elements/ButtonElement.vue';
import CardElement from '../elements/CardElement.vue';
import SliderElement from '../elements/SliderElement.vue';
import VideoElement from '../elements/VideoElement.vue';
import IconBoxElement from '../elements/IconBoxElement.vue';
import DividerElement from '../elements/DividerElement.vue';
import ImageElement from '../elements/ImageElement.vue';
import ProgressElement from '../elements/ProgressElement.vue';
import TestimonialElement from '../elements/TestimonialElement.vue';
import AccordionElement from '../elements/AccordionElement.vue';
import ShortcodeElement from '../elements/ShortcodeElement.vue';
import PriceTableElement from '../elements/PricingElement.vue';

const componentMap = {
  row: RowElement,
  col: ColElement,
  emptyspace: SpacerElement,
  heading: HeadingElement,
  text: TextElement,
  button: ButtonElement,
  card: CardElement,
  slider: SliderElement,
  video: VideoElement,
  iconbox: IconBoxElement,
  divider: DividerElement,
  image: ImageElement,
  progress: ProgressElement,
  testimonial: TestimonialElement,
  accordion: AccordionElement,
  shortcode: ShortcodeElement,
  pricetable: PriceTableElement
};

const props = defineProps({
  node: { type: Object, required: true }
});

const store = useBuilderStore();

const isSelected = computed(() => store.selectedNodeId === props.node.id);
const resolvedComponent = computed(() => componentMap[props.node.type]);
const isContainer = computed(() => componentSchemas[props.node.type]?.isContainer);
</script>