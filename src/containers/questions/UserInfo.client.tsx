'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserInput } from '@/types/users';

interface Props {
	onNextStep: () => void;
}

const UserInfoClient = ({ onNextStep }: Props) => {
	const router = useRouter();
	const [userInfo, setUserInfo] = useState<UserInput>({
		name: '',
		class: '',
		gender: undefined,
	});

	const handleStartQuestions = () => {
		if (!userInfo.name.trim() || !userInfo.class || !userInfo.gender) {
			toast.error('모든 정보를 입력해주세요!');
			return;
		}
		sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
		onNextStep();
	};

	return (
		<div className="page-container">
			{/* Header */}
			<div className="text-center mb-8">
				<h2 className="text-2xl font-black text-pink-500 mb-2">
					📋 실험 참가자 정보
				</h2>
				<p className="text-gray-600">실험 전 기본 정보를 입력해주세요!</p>
			</div>

			{/* Form Card */}
			<Card className="card-gradient mb-6">
				<CardContent className="px-2 py-2">
					<div className="space-y-2">
						{/* Name Input */}
						<div>
							<Label className="block text-gray-700 font-bold mb-2">
								👤 이름
							</Label>
							<Input
								type="text"
								value={userInfo.name}
								onChange={(e) =>
									setUserInfo({ ...userInfo, name: e.target.value })
								}
								className="input-field"
								placeholder="이름을 입력하세요"
							/>
						</div>

						{/* Gender Selection */}
						<div>
							<Label className="block text-gray-700 font-bold mb-3">
								🚻 성별
							</Label>
							<div className="flex space-x-4">
								<Label className="flex-1">
									<Input
										type="radio"
										name="gender"
										value="male"
										checked={userInfo.gender === 'male'}
										onChange={(e) =>
											setUserInfo({
												...userInfo,
												gender: e.target.value as 'male' | 'female',
											})
										}
										className="hidden"
									/>
									<div
										className={`w-full radio-option text-center ${
											userInfo.gender === 'male' ? 'radio-option-selected' : ''
										}`}
									>
										<span className="text-2xl">👨</span>
										<div className="font-bold text-gray-700">남자</div>
									</div>
								</Label>
								<Label className="flex-1">
									<Input
										type="radio"
										name="gender"
										value="female"
										checked={userInfo.gender === 'female'}
										onChange={(e) =>
											setUserInfo({
												...userInfo,
												gender: e.target.value as 'male' | 'female',
											})
										}
										className="hidden"
									/>
									<div
										className={`w-full radio-option text-center ${
											userInfo.gender === 'female'
												? 'radio-option-selected'
												: ''
										}`}
									>
										<span className="text-2xl">👩</span>
										<div className="font-bold text-gray-700">여자</div>
									</div>
								</Label>
							</div>
						</div>

						{/* Class Input */}
						<div>
							<Label className="block text-gray-700 font-bold mb-2">
								🏫 반
							</Label>
							<Input
								type="number"
								min="1"
								max="20"
								value={userInfo.class}
								onChange={(e) =>
									setUserInfo({
										...userInfo,
										class: parseInt(e.target.value) || '',
									})
								}
								className="input-field"
								placeholder="반을 입력하세요"
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Navigation Buttons */}
			<div className="flex space-x-4">
				<Button
					type="button"
					onClick={() => router.back()}
					className="flex-1 btn-gray"
				>
					← 이전
				</Button>
				<Button onClick={handleStartQuestions} className="flex-1 btn-primary">
					다음 →
				</Button>
			</div>
		</div>
	);
};

export default UserInfoClient;
