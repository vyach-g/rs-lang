/**
 * Айдишники слов в БД составлены таким образом, что
 * ID_BASE - постоянная часть id, она не изменяется
 * ADDITIONAL_MIN - минимальное значение, с которого начинают 
 * Генерироваться добавочные айди слов (всего их 3_600)
 * Чтобы было безопаснее, можно выбирать хэш на 1 знак с конца короче,
 * Соответственно константа ADDITIONAL_MIN увеличится
 * Однако я сомневаюсь, что один пользователь сможет сгенерировать
 * 200_000 слов английского языка намеренно
 */

const ID_BASE = '5e9f5ee35eb9e72bc21';
const ADDITIONAL_MIN = 717980;

export function randomInBetween(min: number, max: number): number { 
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function generateId(difficultyType: number | string) {
	const bottom = (+difficultyType) * 600;
	const ADDITIONAL_ID = (randomInBetween(bottom, bottom + 600) + ADDITIONAL_MIN).toString(16);
	return ID_BASE + ADDITIONAL_ID;
}