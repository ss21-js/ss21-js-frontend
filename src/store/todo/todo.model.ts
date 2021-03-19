export type TodosState = {
	byId: { [key: string]: Todo };
	allIds: string[];
};
export interface Todo {
	id: string;
	title: string;
	description: string;
	isCompleted: boolean;
}
