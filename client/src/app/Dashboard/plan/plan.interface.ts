import { Term } from  './../term/term.interface';

export interface Plan {
	id: string;
	name: string;
	terms: Array<Term>;
}