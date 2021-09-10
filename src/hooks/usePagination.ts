import { reactive } from 'vue';

import { TableState } from 'ant-design-vue/es/table/interface';

type Pagination = TableState['pagination'];

const defultPagination: Pagination = {
  current: 1,
  total: 0,
  pageSize: 10,
  pageSizeOptions: ['10', '20', '30', '50'],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (t) => `共 ${t} 条数据`,
};

export default function usePagination(option: Pagination = {}) {
  const pagination = reactive({
    ...defultPagination,
    ...option,
  });

  function onPageChange(page): void {
    if (page.pageSize !== pagination.pageSize) {
      pagination.current = 1;
    } else {
      pagination.current = page.current;
    }

    page.pageSize && (pagination.pageSize = page.pageSize);
  }

  return { pagination, onPageChange };
}
