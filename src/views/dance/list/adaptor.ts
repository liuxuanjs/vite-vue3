interface paramsTypes {
  pageNum?: number;
  pageSize?: number;
  status?: string;
  difficulty?: number;
  style?: string;
  name?: string;
}

export const getParams = (pagination, options, status) => {
  const { difficulty, style, name } = options;
  const { pageSize, current } = pagination;
  const params: paramsTypes = { pageNum: current, pageSize, status };

  if (difficulty) params.difficulty = difficulty;
  if (style) params.style = style;
  if (name) params.name = name.trim();

  return params;
};
