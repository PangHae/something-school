export interface User {
	name: string;
	gender?: 'male' | 'female';
	class: number;
}

export interface UserDTO extends User {
	id: number;
	created_at: string;
}
