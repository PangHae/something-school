'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { questions } from '@/lib/questions';

const QuestionsDetailClient = () => {
	const router = useRouter();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<number[]>([]);

	const selectAnswer = (answerIndex: number) => {
		const newAnswers = [...answers];
		newAnswers[currentQuestion] = answerIndex;
		setAnswers(newAnswers);
	};

	const prevQuestion = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1);
		}
	};

	const nextQuestion = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			finishTest();
		}
	};

	const finishTest = () => {
		sessionStorage.setItem('testAnswers', JSON.stringify(answers));
		router.replace('/result');
	};

	const question = questions[currentQuestion];
	const progress = ((currentQuestion + 1) / questions.length) * 100;
	const isAnswered = answers[currentQuestion] !== undefined;

	return (
		<div className="page-container">
			{/* Progress Bar */}
			<div className="mb-8">
				<div className="flex items-center justify-between mb-2">
					<span className="text-sm font-bold text-gray-600">
						🧪 실험 진행 중...
					</span>
					<span className="text-sm font-bold text-pink-500">
						{currentQuestion + 1}/{questions.length}
					</span>
				</div>
				<Progress value={progress} className="h-3" />
			</div>

			{/* Question Card */}
			<Card className="card-gradient mb-6">
				<CardContent className="p-2">
					<h3 className="text-lg font-bold text-gray-800 mb-6">
						{question.question}
					</h3>
					<div className="space-y-3">
						{question.options.map((option, index) => (
							<Label key={index} className="block">
								<Input
									type="radio"
									name={`question-${currentQuestion}`}
									value={index}
									checked={answers[currentQuestion] === index}
									onChange={() => selectAnswer(index)}
									className="hidden"
								/>
								<div
									className={`radio-option ${
										answers[currentQuestion] === index
											? 'radio-option-selected'
											: ''
									}`}
								>
									{option.text}
								</div>
							</Label>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Navigation */}
			<div className="flex items-center justify-between">
				<Button
					onClick={prevQuestion}
					disabled={currentQuestion === 0}
					className={
						currentQuestion === 0
							? 'bg-gray-200 text-gray-400 cursor-not-allowed'
							: 'btn-gray'
					}
				>
					← 이전 문항
				</Button>
				<span className="text-sm font-bold text-gray-600">
					{currentQuestion + 1}/{questions.length}
				</span>
				<Button
					onClick={nextQuestion}
					disabled={!isAnswered}
					className={
						!isAnswered
							? 'btn-primary opacity-50 cursor-not-allowed'
							: 'btn-primary'
					}
				>
					{currentQuestion === questions.length - 1 ? '결과 보기' : '다음 문항'}{' '}
					→
				</Button>
			</div>
		</div>
	);
};

export default QuestionsDetailClient;
