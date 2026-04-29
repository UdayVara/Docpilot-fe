
import { NextThemeProvider } from './NextThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider >
      {children}
    </NextThemeProvider>
  );
}