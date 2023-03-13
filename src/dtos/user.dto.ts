export interface UserDTO {
    username: string;
    password: string;
    email: string;
}

export interface UseTokenDTO {
    username: string;
    id: string;
    email: string;
}
export interface UserUpdateDTO {
    id: string;
    username: string;
    password: string;
    email: string;
}
