'use client';

import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { calculateResults, getResultAnalysis } from '@/lib/questions';
import { calculateStats } from '@/lib/status';
import { createResult, subscribeToUserResults } from '@/services/db/results';
import { createUser } from '@/services/db/users';
import { TestResult, ParticipantStats } from '@/types/results';
import { UserResult } from '@/types/users';

const ResultClient = () => {
	const [userInfo, setUserInfo] = useState<UserResult | null>(null);
	const [testResult, setTestResult] = useState<TestResult | null>(null);
	const [stats, setStats] = useState<ParticipantStats | null>(null);
	const [statsLoading, setStatsLoading] = useState(true);

	const { mutate: resultMutate, isPending: isResultPending } = useMutation({
		mutationFn: createResult,
		onSuccess: (data) => {
			sessionStorage.setItem('submitted', 'true');
			if (testResult && userInfo) {
				const newResult = {
					id: data[0].id,
					user_id: data[0].user_id,
					estrogen_score: data[0].estrogen_score,
					testosterone_score: data[0].testosterone_score,
					result_type: data[0].result_type,
					result_subtype: data[0].result_subtype,
					created_at: data[0].created_at,
					users: {
						id: data[0].user_id,
						name: userInfo.name,
						gender: userInfo.gender || 'male',
						class: userInfo.class,
						created_at: data[0].created_at,
					},
				};

				// 기존 통계에 본인 결과 추가하여 즉시 업데이트
				setStats((prevStats) => {
					if (!prevStats) {
						return calculateStats([newResult]);
					}

					// 본인 결과가 이미 포함되어 있지 않다면 추가
					const updatedStats = {
						...prevStats,
						total: prevStats.total + 1,
					};

					// 결과 타입에 따라 카운트 증가
					if (testResult.resultType === '에스트로겐형') {
						updatedStats.estrogenCount += 1;
						if (userInfo.gender === 'female') {
							updatedStats.estrogenFemale += 1;
						} else {
							updatedStats.estrogenMale += 1;
						}
					} else if (testResult.resultType === '테스토스테론형') {
						updatedStats.testosteroneCount += 1;
						if (userInfo.gender === 'female') {
							updatedStats.testosteroneFemale += 1;
						} else {
							updatedStats.testosteroneMale += 1;
						}
					}

					// 퍼센트 재계산
					updatedStats.estrogenPercent = Math.round(
						(updatedStats.estrogenCount / updatedStats.total) * 100
					);
					updatedStats.testosteronePercent = Math.round(
						(updatedStats.testosteroneCount / updatedStats.total) * 100
					);

					return updatedStats;
				});
			}

			toast.success('결과 저장 완료');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const { mutate: userMutate, isPending: isUserPending } = useMutation({
		mutationFn: createUser,
		onSuccess: (data) => {
			if (testResult) {
				resultMutate({
					userId: data.id,
					estrogenScore: testResult.estrogenScore,
					testosteroneScore: testResult.testosteroneScore,
					resultType: testResult.resultType,
					resultSubtype: testResult.resultSubtype,
				});
			}
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	useEffect(() => {
		const storedUserInfo = sessionStorage.getItem('userInfo');
		const storedAnswers = sessionStorage.getItem('testAnswers');
		const storedSubmitted = sessionStorage.getItem('submitted');

		if (!storedUserInfo || !storedAnswers) {
			return;
		}

		const parsedUserInfo = JSON.parse(storedUserInfo);
		const parsedAnswers = JSON.parse(storedAnswers);

		setUserInfo(parsedUserInfo);

		const results = calculateResults(parsedAnswers, parsedUserInfo.gender);
		setTestResult(results);

		if (!Boolean(storedSubmitted)) {
			userMutate({
				name: parsedUserInfo.name,
				gender: parsedUserInfo.gender,
				class: parsedUserInfo.class,
			});
		}
	}, []);

	useEffect(() => {
		const unsubscribe = subscribeToUserResults(
			(data) => {
				const calculatedStats = calculateStats(data);
				setStats(calculatedStats);
				setStatsLoading(false);
			},
			(error) => {
				console.error('실시간 구독 에러:', error);
				setStatsLoading(false);
			},
			true // 오늘 날짜만 필터링
		);

		return unsubscribe;
	}, []);

	if (!userInfo || !testResult) {
		return <div className="page-container">결과 계산 중...</div>;
	}

	// 저장 중일 때 로딩 표시
	if (isUserPending || isResultPending) {
		return (
			<div className="page-container">
				<div className="text-center">
					<div className="text-2xl mb-4">💾</div>
					<div className="text-lg font-bold mb-2">
						{isUserPending ? '사용자 정보 저장 중...' : '결과 저장 중...'}
					</div>
					<div className="text-sm text-gray-600">잠시만 기다려주세요</div>
				</div>
			</div>
		);
	}

	const analysis = getResultAnalysis(testResult?.resultType || '');
	const resultColor =
		testResult?.resultType === '에스트로겐형'
			? 'text-pink-500'
			: testResult?.resultType === '테스토스테론형'
				? 'text-green-500'
				: 'text-purple-500';

	return (
		<div className="page-container">
			{/* Header */}
			<div className="text-center mb-6">
				<h2 className="text-2xl font-black text-pink-500 mb-2">
					🎉 실험 완료!
				</h2>
				<p className="text-gray-600">
					{userInfo?.name}님의 썸 호르몬 분석 결과
				</p>
			</div>

			{/* Result Main Card */}
			<Card className="card-gradient mb-6 text-center">
				<CardContent className="p-2">
					<div className="text-6xl mb-4">{testResult?.resultIcon}</div>
					<h3 className={`text-2xl font-black mb-2 ${resultColor}`}>
						{testResult?.resultType}
					</h3>
					<p className="text-lg font-bold text-gray-700 mb-4">
						{testResult?.resultSubtype}
					</p>
					<div className="bg-gray-100 rounded-2xl p-4">
						<p className="text-sm font-bold text-gray-700">
							에스트로겐 {testResult?.estrogenScore}점 vs 테스토스테론{' '}
							{testResult?.testosteroneScore}점
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Detailed Analysis */}
			<Card className="card-gradient mb-6">
				<CardContent className="p-2">
					<h4 className={`text-lg font-bold mb-4 ${resultColor}`}>
						{analysis.title}
					</h4>
					<div className="space-y-4 text-sm">
						<div>
							<h5 className="font-bold text-gray-800 mb-2">
								{analysis.thumbStyle.title}
							</h5>
							<ul className="text-gray-600 space-y-1 ml-4">
								{analysis.thumbStyle.items.map((item) => (
									<li key={item}>• {item}</li>
								))}
							</ul>
						</div>

						<div>
							<h5 className="font-bold text-gray-800 mb-2">
								{analysis.lovePattern.title}
							</h5>
							<ul className="text-gray-600 space-y-1 ml-4">
								{analysis.lovePattern.items.map((item) => (
									<li key={item}>• {item}</li>
								))}
							</ul>
						</div>

						<div>
							<h5 className="font-bold text-gray-800 mb-2">
								{analysis.strengths.title}
							</h5>
							<ul className="text-gray-600 space-y-1 ml-4">
								{analysis.strengths.items.map((item) => (
									<li key={item}>• {item}</li>
								))}
							</ul>
						</div>

						<div>
							<h5 className="font-bold text-gray-800 mb-2">
								{analysis.warnings.title}
							</h5>
							<ul className="text-gray-600 space-y-1 ml-4">
								{analysis.warnings.items.map((item) => (
									<li key={item}>• {item}</li>
								))}
							</ul>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Real-time Statistics */}
			<Card className="card-gradient mb-6">
				<CardContent className="p-2">
					<h4 className="text-lg font-bold text-green-500 mb-4">
						📊 전체 참가자 현황 (실시간)
					</h4>
					{statsLoading ? (
						<div className="text-center text-gray-500">통계 로딩 중...</div>
					) : stats ? (
						<div className="text-sm space-y-2">
							<p className="font-bold text-gray-800">
								총 참가자: <span>{stats.total}</span>명
							</p>

							<div className="space-y-2">
								<p className="font-bold text-pink-500">
									🌸 에스트로겐형: {stats.estrogenCount}명 (
									{stats.estrogenPercent}%)
								</p>
								<div className="ml-4 space-y-1 text-gray-600">
									<p>├ 에겐녀: {stats.estrogenFemale}명</p>
									<p>└ 에겐남: {stats.estrogenMale}명</p>
								</div>

								<p className="font-bold text-green-500">
									🔥 테스토스테론형: {stats.testosteroneCount}명 (
									{stats.testosteronePercent}%)
								</p>
								<div className="ml-4 space-y-1 text-gray-600">
									<p>├ 테토녀: {stats.testosteroneFemale}명</p>
									<p>└ 테토남: {stats.testosteroneMale}명</p>
								</div>
							</div>

							<p className="text-xs text-gray-500 mt-2">
								* 실시간으로 자동 업데이트됩니다
							</p>
						</div>
					) : (
						<div className="text-center text-gray-500">
							통계를 불러올 수 없습니다.
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default ResultClient;
