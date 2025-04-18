<script setup lang="ts" name="HomeBannerBgImage">
import { withBase } from "vitepress";
import { computed, onMounted, onUnmounted, unref } from "vue";
import { useTeekConfig } from "../../../configProvider";
import { useNamespace, useLocale, useSwitchData } from "../../../hooks";
import { isString } from "../../../helper";
import type { Banner } from "../../../config/types";

defineOptions({ name: "HomeBannerBgImage" });

const ns = useNamespace("banner-bg-image");
const { t } = useLocale();
const { getTeekConfigRef } = useTeekConfig();

// Banner 配置项
const bannerConfig = getTeekConfigRef<Required<Banner>>("banner", {
  bgStyle: undefined,
  imgSrc: undefined,
  imgInterval: 15000,
  imgShuffle: false,
  mask: true,
  maskBg: "rgba(0, 0, 0, 0.4)",
});

// 局部图片背景风格
const isPartImgBgStyle = computed(() => unref(bannerConfig).bgStyle === "partImg");
// 全屏图片背景风格
const isFullImgBgStyle = computed(() => unref(bannerConfig).bgStyle === "fullImg");

const dataArray = [unref(bannerConfig).imgSrc || []].flat().map(item => item && withBase(item));
// banner 背景图片定时轮播
const {
  data: imageSrc,
  startAutoSwitch,
  stopAutoSwitch,
  index,
} = useSwitchData(dataArray, {
  timeout: unref(bannerConfig).imgInterval,
  shuffle: unref(bannerConfig).imgShuffle,
  onAfterUpdate: () => {
    // 预加载下一张图片
    const nextIndex = (unref(index) + 1) % dataArray.length;
    const newValue = dataArray[nextIndex];
    if (newValue) {
      const img = new Image();
      img.src = newValue;
    }
  },
});

onMounted(() => {
  startAutoSwitch();
});

onUnmounted(() => {
  stopAutoSwitch();
});

const getStyle = () => {
  const { imgSrc, maskBg, imgInterval } = unref(bannerConfig);
  const imgBgVar = ns.cssVarName("banner-img-bg");
  const maskBgColorVar = ns.cssVarName("banner-mask-bg-color");
  const imgSwitchIntervalVar = ns.cssVarName("banner-img-switch-interval-s");

  // 如果没有传入图片，则加载默认图片
  if (!imgSrc?.length) return { [imgBgVar]: ns.cssVar("bg-img-default") };

  return {
    [imgBgVar]: `url(${unref(imageSrc)}) center center / cover no-repeat`,
    [maskBgColorVar]: isString(maskBg) ? maskBg : `rgba(0, 0, 0, ${maskBg})`,
    [imgSwitchIntervalVar]: imgInterval / 1000 + "s",
  };
};
</script>

<template>
  <div
    :class="[ns.b(), { part: isPartImgBgStyle, full: isFullImgBgStyle }]"
    :style="getStyle()"
    :aria-label="t('tk.homeBanner.bgImgLabel')"
  >
    <div v-if="bannerConfig.mask && bannerConfig.imgSrc" class="mask" :aria-label="t('tk.homeBanner.maskLabel')" />
    <slot v-if="isPartImgBgStyle" />
  </div>
  <slot v-if="isFullImgBgStyle" />
</template>
