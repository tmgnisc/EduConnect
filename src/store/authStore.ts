import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, RegisterData, User } from '@/types';
import { authApi } from '@/services/api';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          // Dummy login credentials for testing
          const dummyUsers: Record<string, { user: User; token: string }> = {
            'admin@educonnect.com': {
              user: {
                id: '1',
                email: 'admin@educonnect.com',
                name: 'Admin User',
                role: 'admin',
                status: 'approved',
                createdAt: new Date().toISOString(),
              },
              token: 'dummy-admin-token',
            },
            'publisher@educonnect.com': {
              user: {
                id: '2',
                email: 'publisher@educonnect.com',
                name: 'Publisher User',
                role: 'publisher',
                status: 'approved',
                createdAt: new Date().toISOString(),
              },
              token: 'dummy-publisher-token',
            },
            'school@educonnect.com': {
              user: {
                id: '3',
                email: 'school@educonnect.com',
                name: 'School User',
                role: 'school',
                status: 'approved',
                createdAt: new Date().toISOString(),
              },
              token: 'dummy-school-token',
            },
          };

          // Check if it's a dummy login
          if (dummyUsers[email] && password === 'password123') {
            const dummyAuth = dummyUsers[email];
            set({
              user: dummyAuth.user,
              token: dummyAuth.token,
              isAuthenticated: true,
            });
            return;
          }

          // Otherwise, try real API login
          const response = await authApi.login({ email, password });
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
          });
        } catch (error) {
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        try {
          await authApi.register(data);
        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
