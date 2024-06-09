export interface User {
    uid: number;
    name: string;
    role_id: number;
    department_id: number | null; // Assuming department_id can be null
  }