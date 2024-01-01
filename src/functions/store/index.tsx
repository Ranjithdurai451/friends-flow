import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const store = configureStore({
  reducer: { auth: authSlice.reducer },
});
export const queryClient = new QueryClient();
export function QueryProvider({ children }: { children: React.ReactNode }) {
  console.log('working');

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
