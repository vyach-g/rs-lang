import { WordDTO } from '../../../api/apiCalls.types';

export interface IAnswer {
	word: WordDTO | undefined;
	isCorrect: boolean;
  }