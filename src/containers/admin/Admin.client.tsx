'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { calculateStats } from '@/lib/status';
import { subscribeToUserResults } from '@/services/db/results';
import { ParticipantStats, UserResultJoined } from '@/types/results';
import { downloadCsv } from '@/utils/download';

const AdminClient = () => {
	const [userResults, setUserResults] = useState<UserResultJoined[]>([]);
	const [stats, setStats] = useState<ParticipantStats | null>(null);
	const [statsLoading, setStatsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = subscribeToUserResults(
			(data) => {
				setUserResults(data);
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

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			{/* Header */}
			<div className="text-center mb-8">
				<h2 className="text-2xl font-black text-pink-500 mb-2">
					📈 썸띵스쿨 호르몬 실험실 관리자
				</h2>
				<div className="border-t-2 border-gray-300 mt-4"></div>
			</div>

			{/* Statistics Cards */}
			<div className="grid md:grid-cols-2 gap-6 mb-6">
				<Card className="bg-white rounded-3xl shadow-xl">
					<CardHeader>
						<CardTitle className="text-lg font-bold text-green-500">
							📊 실시간 통계
						</CardTitle>
					</CardHeader>
					<CardContent>
						{statsLoading ? (
							<div className="text-gray-500">로딩 중...</div>
						) : stats ? (
							<div className="space-y-2 text-sm">
								<p>
									• 오늘 참가자:{' '}
									<span className="font-bold">{stats.today}명</span>
								</p>
								<p>
									• 에스트로겐형:{' '}
									<span className="font-bold text-pink-500">
										{stats.estrogenPercent}%
									</span>
								</p>
								<p>
									• 테스토스테론형:{' '}
									<span className="font-bold text-green-500">
										{stats.testosteronePercent}%
									</span>
								</p>
							</div>
						) : (
							<div className="text-gray-500">통계를 불러올 수 없습니다.</div>
						)}
					</CardContent>
				</Card>

				<Card className="bg-white rounded-3xl shadow-xl">
					<CardHeader>
						<CardTitle className="text-lg font-bold text-green-500">
							📋 데이터 다운로드
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<Button
								onClick={() => downloadCsv()}
								className="w-full btn-secondary text-sm"
							>
								📥 오늘 데이터 다운로드
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Participants */}
			<Card className="bg-white rounded-3xl shadow-xl mb-6">
				<CardHeader>
					<CardTitle className="text-lg font-bold text-green-500">
						📝 최근 참가자 ({userResults.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					{userResults && userResults.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>이름</TableHead>
									<TableHead>성별</TableHead>
									<TableHead>반</TableHead>
									<TableHead>결과</TableHead>
									<TableHead>에겐 수치</TableHead>
									<TableHead>테토 수치</TableHead>
									<TableHead>시간</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{userResults.map((result) => (
									<TableRow key={result.id}>
										<TableCell className="font-medium">
											{result.users.name}
										</TableCell>
										<TableCell>
											{result.users.gender === 'male' ? '남' : '여'}
										</TableCell>
										<TableCell>{result.users.class}반</TableCell>
										<TableCell>{result.result_subtype.split(' ')[0]}</TableCell>
										<TableCell>{result.estrogen_score}</TableCell>
										<TableCell>{result.testosterone_score}</TableCell>
										<TableCell>
											{new Date(result.created_at).toLocaleTimeString('ko-KR', {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<div className="text-gray-500">참가자 데이터가 없습니다.</div>
					)}
				</CardContent>
			</Card>

			{/* Back Button */}
			<Link href="/">
				<Button className="btn-gray">← 메인으로 돌아가기</Button>
			</Link>
		</div>
	);
};

export default AdminClient;
