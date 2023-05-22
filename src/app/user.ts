export interface Survey {
   id?: number;
   name: string;
   org_type: string;
   approved: boolean
   users: number[];
}

export interface Organization {
  id?: number;
  name: string;
  org_type: string;
  users: number[];
  surveys: Survey[];
}

export interface User {
   id: number;
   username: string;
   is_staff: boolean;
   email: string;
   token: string;
   active_survey: Survey;
}
