import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from './constants.ts';

export function generateError(text: string) {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return 'Задача не может быть пустой';
  }

  if (trimmedText.length < MIN_TASK_LENGTH) {
    return `Минимальная длина: ${MIN_TASK_LENGTH} символа.`;
  }

  if (trimmedText.length > MAX_TASK_LENGTH) {
    return `Максимальная длина: ${MAX_TASK_LENGTH} символов.`;
  }

  return '';
}
