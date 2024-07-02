export interface IUser {
	user_id: number;
	username: string;
	// remove password for security
	email: string;
	created_at: string;
	updated_at?: string;
}
