export interface QuestionOption {
	text: string;
	type: 'estrogen' | 'testosterone';
	value: number;
}

export interface Question {
	question: string;
	options: QuestionOption[];
}
