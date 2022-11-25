const sortListArr = ['rating', 'name', 'rank', 'year published', 'number of plays', 'selected'] as const;

const filterListArr = ['no filter', 'only played', 'only owned'] as const;


export const sortList = sortListArr.slice();
export const filterList = filterListArr.slice();
export type sortChoices = typeof sortListArr[number];
export type filterChoices = typeof filterListArr[number];
