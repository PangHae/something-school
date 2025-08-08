'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { calculateResults, getResultAnalysis } from '@/lib/questions';
import { TestResult } from '@/types/results';
import { User } from '@/types/users';

const ResultClient = () => {
	const router = useRouter();
	const [userInfo, setUserInfo] = useState<User | null>(null);
	const [testResult, setTestResult] = useState<TestResult | null>(null);
	const [, setAnswers] = useState<number[]>([]);

	const restartTest = () => {
		router.replace('/questions');
	};

	useEffect(() => {
		const storedUserInfo = sessionStorage.getItem('userInfo');
		const storedAnswers = sessionStorage.getItem('testAnswers');

		if (!storedUserInfo || !storedAnswers) {
			return;
		}

		const parsedUserInfo = JSON.parse(storedUserInfo);
		const parsedAnswers = JSON.parse(storedAnswers);

		setUserInfo(parsedUserInfo);
		setAnswers(parsedAnswers);

		const results = calculateResults(parsedAnswers, parsedUserInfo.gender);
		setTestResult(results);

		const participantData = {
			name: parsedUserInfo.name,
			gender: parsedUserInfo.gender,
			class: parsedUserInfo.class,
			estrogenScore: results.estrogenScore,
			testosteroneScore: results.testosteroneScore,
			resultType: results.resultType,
			resultSubtype: results.resultSubtype,
			answers: parsedAnswers,
		};
		console.log(participantData);
		// saveParticipant.mutate(participantData);
	}, []);

	if (!userInfo || !testResult) {
		return <div className="page-container">결과 계산 중...</div>;
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
				<CardContent className="p-4">
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
						<p className="text-sm text-gray-600">
							({testResult?.estrogenPercent}% :{' '}
							{testResult?.testosteronePercent}
							%)
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Detailed Analysis */}
			<Card className="card-gradient mb-6">
				<CardContent className="p-4">
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
			{/* <Card className="card-gradient mb-6">
				<CardContent className="pt-6">
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
								* 30초마다 자동 업데이트됩니다
							</p>
						</div>
					) : (
						<div className="text-center text-gray-500">
							통계를 불러올 수 없습니다.
						</div>
					)}
				</CardContent>
			</Card> */}

			{/* Restart Button */}
			<Button onClick={restartTest} className="w-full btn-secondary">
				🔄 다시 실험하기
			</Button>
		</div>
	);
};

export default ResultClient;
