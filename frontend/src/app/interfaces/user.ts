export interface User {
    id: number;
    name: string;
    role: number;
    department_id: number | null; // Assuming department_id can be null
  }