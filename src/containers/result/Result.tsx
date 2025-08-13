'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { UserResult } from '@/types/users';

import ResultClient from './Result.client';

const Result = () => {
	const [isValidAccess, setIsValidAccess] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<UserResult | null>(null);
	const [testAnswers, setTestAnswers] = useState<number[]>([]);
	const router = useRouter();

	useEffect(() => {
		// sessionStorage에서 필요한 데이터 확인
		const storedUserInfo = sessionStorage.getItem('userInfo');
		const storedAnswers = sessionStorage.getItem('testAnswers');

		// 데이터가 없거나 불완전한 경우 메인 페이지로 리다이렉트
		if (!storedUserInfo || !storedAnswers) {
			toast.error('올바른 경로로 접근해주세요.');
			router.replace('/');
			return;
		}

		try {
			// JSON 파싱이 가능한지 확인
			const parsedUserInfo = JSON.parse(storedUserInfo);
			const parsedAnswers = JSON.parse(storedAnswers);

			// 필수 데이터가 있는지 확인
			if (
				!parsedUserInfo.name ||
				!parsedUserInfo.gender ||
				!parsedUserInfo.class ||
				!Array.isArray(parsedAnswers)
			) {
				toast.error('올바른 경로로 접근해주세요.');
				router.replace('/');
				return;
			}

			setUserInfo(parsedUserInfo);
			setTestAnswers(parsedAnswers);
			setIsValidAccess(true);
		} catch {
			// JSON 파싱 에러 시 메인 페이지로 리다이렉트
			toast.error('올바른 경로로 접근해주세요.');
			router.replace('/');
			return;
		} finally {
			setIsLoading(false);
		}
	}, [router]);

	if (isLoading) {
		return (
			<div className="page-container">
				<div className="text-center">
					<div className="text-2xl mb-4">⏳</div>
					<div className="text-lg font-bold mb-2">페이지 확인 중...</div>
					<div className="text-sm text-gray-600">잠시만 기다려주세요</div>
				</div>
			</div>
		);
	}

	if (!isValidAccess || !userInfo || !testAnswers) {
		return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
	}

	return <ResultClient userInfo={userInfo} testAnswers={testAnswers} />;
};

export default Result;
