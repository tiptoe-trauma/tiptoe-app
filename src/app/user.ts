export interface Organization {
   id?: number;
   name: string;
   org_type: string;
   users: number[];
}

export interface User {
   id: number;
   username: string;
   is_staff: boolean;
   email: string;
   token: string;
   active_organization: Organization;
}
