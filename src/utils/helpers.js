import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from './constans';

export function generateError(text) {
  if (!text.trim()) {
    return 'Задача не может быть пустой';
  }

  if (text.length < MIN_TASK_LENGTH) {
    return `Минимальная длина: ${MIN_TASK_LENGTH} символа.`;
  }

  if (text.length > MAX_TASK_LENGTH) {
    return `Максимальная длина: ${MAX_TASK_LENGTH} символов.`;
  }

  return '';
}
