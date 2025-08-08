export interface QuestionOption {
	text: string;
	type: 'estrogen' | 'testosterone' | 'mixed';
	value: number;
}

export interface Question {
	question: string;
	options: QuestionOption[];
}
