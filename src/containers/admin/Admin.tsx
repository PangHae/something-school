'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import AdminClient from './Admin.client';

const Admin = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [password, setPassword] = useState('');

	const handlePasswordSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// 실제 운영환경에서는 환경변수나 더 안전한 방법을 사용해야 합니다
		const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

		if (password === correctPassword) {
			setIsAuthenticated(true);
		} else {
			toast.error('비밀번호가 올바르지 않습니다.');
			setPassword('');
		}
	};

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<Card className="w-full max-w-md mx-4">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl font-black text-pink-500">
							🔐 관리자 인증
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handlePasswordSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="password">관리자 비밀번호</Label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="비밀번호를 입력하세요"
									required
								/>
							</div>
							<Button type="submit" className="w-full">
								로그인
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		);
	}

	return <AdminClient />;
};

export default Admin;
