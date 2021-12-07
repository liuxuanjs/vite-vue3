export interface ActionItem {
  title?: string;
  danger?: boolean;
  disabled?: boolean;
  onClick?: Fn;
}

export const ActionGroupProps = {
  actions: {
    type: Array as PropType<ActionItem[]>,
    default: () => [],
  },
  limit: {
    type: Number as PropType<number>,
    default: 4,
  },
  defaultAction: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
};
