import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';

import { tryOnUnmounted } from '@vueuse/core';
import { useDebounceFn } from '@vueuse/core';
import { unref, nextTick, computed, ref } from 'vue';

import echarts from '/@/utils/lib/echarts';
import { useEventListener } from '/@/hooks/useEventListener';

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'light'
) {
  let chartInstance: echarts.ECharts | null = null;
  let resizeFn: Fn = resize;
  let removeResizeFn: Fn = () => {};
  const cacheOptions = ref({}) as Ref<EChartsOption>;

  resizeFn = useDebounceFn(resize, 200);

  const getOptions = computed(() => {
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    } as EChartsOption;
  });

  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, t);

    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    });

    removeResizeFn = removeEvent;

    if (el.offsetHeight === 0) {
      setTimeout(() => {
        resizeFn();
      }, 30);
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;

    nextTick(() => {
      setTimeout(() => {
        if (!chartInstance) {
          initCharts();
          if (!chartInstance) return;
        }
        clear && chartInstance.clear();

        chartInstance.setOption(unref(getOptions));
      }, 30);
    });
  }

  function resize() {
    chartInstance?.resize();
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  return { setOptions, resize, echarts };
}
