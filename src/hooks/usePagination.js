import { reactive } from 'vue';

const defultPagination = {
  current: 1,
  pageNum: 1,
  total: 0,
  pageSize: 10,
  pageSizeOptions: ['10', '20', '30', '50'],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (t) => `共 ${t} 条数据`,
};

export default function usePagination(option) {
  const pagination = reactive({
    ...defultPagination,
    ...option,
  });

  function onPageChange(page) {
    if (page.pageSize !== pagination.pageSize) {
      pagination.current = 1;
    } else {
      pagination.current = page.current;
    }

    page.pageSize && (pagination.pageSize = page.pageSize);
  }

  return { pagination, onPageChange };
}