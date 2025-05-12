import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import employeesData from '../data/generated_users.json';

export const useEmployeeStore = create(
  persist(
    (set, get) => ({
      employees: [],

      addEmployee: (employee) =>
        set((state) => ({
          employees: [employee, ...state.employees],
        })),

      initEmployees: () => {
        const stored = get().employees;
        if (stored.length === 0) {
          set({ employees: employeesData });
        }
      },
    }),
    {
      name: 'employee-storage', // Nom dans le localStorage
    }
  )
);