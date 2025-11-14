export interface Agent {
    id: number;
    name: string;
    lastname: string;
    fullName?: string;
    id_number: string;
    email?: string;
    phone?: string;
    address?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface AgentResponse {
    data: Agent[];
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

// export interface Agents {
//     agents: ;

// }