import { ref } from "vue";

/**
 * 定时对数据进行截取，实现滚动
 *
 * @param list 数据
 * @param limit 显示数量
 * @param intervalTime 自动滚动间隔时间
 */
export const useScrollData = (list: any[], limit: number, intervalTime = 3000) => {
  // 当前滚动数据
  const visibleData = ref(list.slice(0, limit));
  let currentIndex = limit;
  let intervalId: NodeJS.Timeout | null = null;

  /**
   * 开启自动滚动
   */
  const startAutoScroll = () => {
    intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % list.length;

      visibleData.value.push(list[nextIndex]);
      visibleData.value.shift();

      currentIndex = nextIndex;
    }, intervalTime);
  };

  /**
   * 关闭自动滚动
   */
  const stopAutoScroll = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  return {
    visibleData,
    startAutoScroll,
    stopAutoScroll,
  };
};
