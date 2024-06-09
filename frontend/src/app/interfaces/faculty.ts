export interface Faculty_table {
    uid: number;
    course_code: string;
    course_name: string;
    topic: string;
    outcome: string;
    status_code: number;
    hours_completed: number | null; // Assuming department_id can be null
  }