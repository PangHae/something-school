export interface UserBase {
	name: string;
	gender?: 'male' | 'female';
}

export interface UserInput extends UserBase {
	class: number | '';
}

export interface UserResult extends UserBase {
	class: number;
}

export interface UserDTO extends UserResult {
	id: number;
	created_at: string;
}
