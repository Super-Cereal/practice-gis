export interface Result<T> {
	error?: string,
	isSuccess: boolean,
	value?: T,
}