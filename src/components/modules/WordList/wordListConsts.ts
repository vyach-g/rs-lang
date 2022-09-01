import { blue, lightBlue, lightGreen, lime, orange, red, yellow } from '@mui/material/colors';

export const GROUP_TOTAL = 6;
export const PAGE_PER_GROUP = 30;
export const WORD_PER_PAGE = 20;
export const WORDS_TOTAL = 3600;

export enum TextbookTab {
  A1,
  A2,
  B1,
  B2,
  C1,
  C2,
  Hard,
}

export const GROUP_COLORS = [
  { dark: blue[800], light: blue[400] },
  { dark: lightBlue[800], light: lightBlue[400] },
  { dark: lightGreen[800], light: lightGreen[400] },
  { dark: lime[800], light: lime[500] },
  { dark: yellow[800], light: yellow[600] },
  { dark: orange[800], light: orange[400] },
  { dark: red[800], light: red[400] },
];
