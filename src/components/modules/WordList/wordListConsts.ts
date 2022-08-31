import { blue, lightBlue, lightGreen, lime, orange, red, yellow } from '@mui/material/colors';

export const GROUP_TOTAL = 6;
export const PAGE_PER_GROUP = 30;
export const WORD_PER_PAGE = 20;
export const WORDS_TOTAL = 3600;

export enum TextbookTab {
  A1 = 1,
  A2,
  B1,
  B2,
  C1,
  C2,
  Hard,
}

export const GROUP_COLORS = [
  { dark: blue[700], light: blue[100] },
  { dark: lightBlue[700], light: lightBlue[100] },
  { dark: lightGreen[700], light: lightGreen[100] },
  { dark: lime[700], light: lime[100] },
  { dark: yellow[700], light: yellow[100] },
  { dark: orange[700], light: orange[100] },
  { dark: red[700], light: red[100] },
];
