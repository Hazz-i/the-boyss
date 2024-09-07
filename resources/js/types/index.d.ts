export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    role: string;
    galon: boolean;
    image: string;
    whatsapp: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
