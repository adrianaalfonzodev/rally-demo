export interface Role {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    permissions?: string;
}

export type RolesPageProps = {
    roles: Role[];
};
