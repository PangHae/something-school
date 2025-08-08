import { Geist, Geist_Mono } from 'next/font/google';

import QueryClientProvider from '@/components/providers/QueryClientProvider';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: '썸띵스쿨 | 호르몬 실험실',
	description: '너 테토야? 에겐이야?',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryClientProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					{children}
				</body>
			</html>
		</QueryClientProvider>
	);
}
