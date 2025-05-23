<script setup lang="ts" name="LayoutEnhance">
import LayoutSwitch from "./LayoutSwitch.vue";
import LayoutPageWidthSlide from "./LayoutPageWidthSlide.vue";
import LayoutDocWidthSlide from "./LayoutDocWidthSlide.vue";
import LayoutColor from "./LayoutColor.vue";
import Spotlight from "./Spotlight.vue";
import SpotlightStyle from "./SpotlightStyle.vue";
import { useElementHover } from "../../../hooks";
import { ref, watch, useTemplateRef, nextTick, computed } from "vue";
import { ns } from "./namespace";
import { readingIcon } from "../../../assets/icons";
import { useTeekConfig } from "../../../configProvider";
import Icon from "../../Icon";

const { getTeekConfigRef } = useTeekConfig();
const layoutEnhanceConfig = getTeekConfigRef("layoutEnhance", {});

const disabledList = computed(() => {
  return {
    layoutSwitch: layoutEnhanceConfig.value.layoutSwitch?.disabled ?? false,
    layoutColor: layoutEnhanceConfig.value.layoutColor?.disabled ?? false,
    spotlight: layoutEnhanceConfig.value.spotlight?.disabled ?? false,
  };
});

const layoutEnhanceRef = useTemplateRef<HTMLDivElement>("layoutEnhanceRef");
const popupElementRef = useTemplateRef<HTMLDivElement>("popupElementRef");

const visible = useElementHover(layoutEnhanceRef);

const popupStyle = ref({ top: "0px", left: "0px" });

watch(visible, async () => {
  await nextTick();
  const refElement = layoutEnhanceRef.value;

  if (refElement) {
    const rect = refElement.getBoundingClientRect();
    const popupWidth = popupElementRef.value?.offsetWidth || 0;
    // TODO rect 位置变化后，实时计算
    popupStyle.value = {
      top: `${rect.top + rect.height / 2 + 20}px`,
      left: `${rect.left - popupWidth + rect.width + 16}px`,
    };
  }
});
</script>

<template>
  <div ref="layoutEnhanceRef" :class="ns.b()" @click="visible = true">
    <Icon :icon="readingIcon" :size="20" />
    <Transition :name="ns.joinNamespace('fade-linear')">
      <div
        v-show="visible"
        ref="popupElementRef"
        :style="popupStyle"
        :class="ns.e('content')"
        @click.stop
        @touchstart.stop
      >
        <template v-if="!disabledList.layoutSwitch">
          <LayoutSwitch />
          <LayoutPageWidthSlide />
          <LayoutDocWidthSlide />
        </template>

        <template v-if="!disabledList.layoutColor">
          <LayoutColor />
        </template>

        <template v-if="!disabledList.spotlight">
          <Spotlight />
          <SpotlightStyle />
        </template>
      </div>
    </Transition>
  </div>
</template>
