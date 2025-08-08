'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
	return (
		<div className="page-container">
			{/* Header */}
			<div className="text-center mb-6">
				<h1 className="text-2xl font-black text-pink-500 mb-2">
					🧪 썸띵스쿨 호르몬 실험실
				</h1>
				<p className="text-base font-bold text-gray-700">
					너 에겐이야? 너 테토야?
				</p>
			</div>

			{/* Main Illustration Card */}
			<Card className="card-gradient mb-4 relative overflow-hidden">
				<div className="absolute top-2 right-2 text-4xl opacity-20">🧪</div>
				<div className="absolute bottom-2 left-2 text-3xl opacity-20">🔬</div>

				<CardContent className="pt-4 pb-4">
					{/* Laboratory scene with cute characters */}
					<div className="text-center mb-4">
						<div className="text-6xl mb-3 animate-float">⚗️</div>
						<div className="flex justify-center space-x-6 mb-3">
							<span className="text-xl animate-bounce-slow">👩‍🔬</span>
							<span
								className="text-xl animate-bounce-slow"
								style={{ animationDelay: '0.5s' }}
							>
								👨‍🔬
							</span>
						</div>
					</div>

					<div className="text-center space-y-2">
						<p className="text-sm text-gray-700 font-medium">
							고등학교 과학시간에 배우는 호르몬!
						</p>
						<p className="text-sm text-gray-700 font-medium">
							너의 썸 스타일은
							<br />
							<span className="text-pink-500 font-bold">
								에스트로겐형
							</span>?{' '}
							<span className="text-green-500 font-bold">테스토스테론형</span>?
						</p>
						<p className="text-sm text-gray-700 font-medium">
							총 <span className="font-bold">11문항</span>으로 알아보자! 📚✨
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Warning Notice */}
			<Card className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 mb-4">
				<CardContent className="p-0">
					<h3 className="text-xs font-bold text-yellow-800 mb-2">
						⚠️ 주의사항
					</h3>
					<ul className="text-xs text-yellow-700 space-y-1">
						<li>• 본 검사는 과학적으로 입증된 검사가 아닙니다</li>
						<li>• 재미를 위한 콘텐츠로 과도한 의미 부여는 금물!</li>
						<li>• 저작권: 썸띵스쿨 (무단 배포 시 처벌 대상)</li>
					</ul>
				</CardContent>
			</Card>

			{/* Start Button */}
			<Link href="/questions">
				<Button className="w-full btn-primary py-4">🚀 실험 시작하기</Button>
			</Link>

			{/* Admin Link (Hidden) */}
			<div className="text-center mt-3">
				<button
					// onClick={showAdminLogin}
					className="text-xs text-gray-400 hover:text-gray-600"
				>
					관리자
				</button>
			</div>
		</div>
	);
};

export default Home;
