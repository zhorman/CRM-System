import { MIN_TASK_LENGTH, MAX_TASK_LENGTH } from './constants';

export function isInvalidText(text: string) {
  const trimmedText = text.trim();
  if (
    !trimmedText ||
    trimmedText.length < MIN_TASK_LENGTH ||
    trimmedText.length > MAX_TASK_LENGTH
  ) {
    return true;
  }

  return false;
}
