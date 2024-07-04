export interface IUser {
	user_id: number;
	username: string;
	email: string;
	created_at: string;
	updated_at?: string;
}

export interface IUserNew {
	username: string;
	password: string;
	email: string;
}

export type IUserUpdate = IUserNew;

export interface ILoginCredentials {
	username: string;
	password: string;
}
