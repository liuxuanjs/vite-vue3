/**
 * @description: Index interface parameters
 */
export interface indexParams {
  username: string;
  pass: string;
}

/**
 * @description: Index interface return value
 */
export interface indexResultModel {
  dayCount: number;
  userCount: number;
  recordCount: number;
  danceCount: number;
  weekCount: number;
  monthCount: number;
}
