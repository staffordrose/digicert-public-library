import { useMediaQuery } from 'react-responsive';
import theme from '../theme';

export default function useSmallScreenMediaQuery() {
  return useMediaQuery({
    query: `(max-width: calc(${theme.breakpoints.sm} - 1px))`,
  });
}
