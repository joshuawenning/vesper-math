import type { Theme } from './types';

export function resolveTheme(theme: Theme, prefersDark: boolean): 'dark' | 'light' {
  return theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
}

export function observeAppearance(
  theme: Theme,
  media: Pick<MediaQueryList, 'matches' | 'addEventListener' | 'removeEventListener'>,
  apply: (appearance: 'dark' | 'light') => void,
) {
  const update = () => apply(resolveTheme(theme, media.matches));
  update();
  if (theme !== 'system') return;
  media.addEventListener('change', update);
  return () => media.removeEventListener('change', update);
}
