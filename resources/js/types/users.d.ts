import { Role } from "./roles";

interface User {
    id: number;
    full_name: ?string;
    name: ?string;
    last_name: ?string;
    email: ?string;
    is_active: ?boolean;
    rol: ?string;
    created_at: string;
    updated_at: string;
}

export interface UsersPageProps {
    users: User[];
}


