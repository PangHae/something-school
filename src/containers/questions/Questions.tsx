'use client';

import { useState } from 'react';

import { Step } from '@/types/steps';

import QuestionsDetailClient from './QuestionsDetail.client';
import UserInfoClient from './UserInfo.client';

const Questions = () => {
	const [currentStep, setCurrentStep] = useState<Step>('user');

	const handleNextStep = () => {
		setCurrentStep('questions');
	};

	if (currentStep === 'user') {
		return <UserInfoClient onNextStep={handleNextStep} />;
	}

	return <QuestionsDetailClient />;
};

export default Questions;
