import { getTodayUserResults } from '@/services/db/results';

export const downloadCsv = async () => {
	try {
		const data = await getTodayUserResults();
		const dataString = [
			'이름,성별,반,결과,결과 상세,시간',
			...data.map((row) => {
				const parsed = {
					name: row.users.name,
					gender: row.users.gender,
					class: row.users.class,
					result: row.result_type,
					resultSubtype: row.result_subtype,
					createdAt: row.created_at,
				};
				return `${parsed.name},${parsed.gender},${parsed.class},${parsed.result},${parsed.resultSubtype},${parsed.createdAt}`;
			}),
		].join('\n');

		// UTF-8 BOM 추가하여 Excel에서 한글이 제대로 표시되도록 함
		const BOM = '\uFEFF';
		const csvContent = BOM + dataString;

		// Blob을 사용하여 파일 생성
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const url = window.URL.createObjectURL(blob);
		// 다운로드 링크 생성
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute(
			'download',
			`Something-School-${new Date().toLocaleDateString('ko-KR', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})}.csv`
		);
		// 다운로드 링크 클릭
		document.body.appendChild(link);
		link.click();
		// 다운로드 링크 삭제 및 메모리 정리
		link.remove();
		window.URL.revokeObjectURL(url);
	} catch (error) {
		console.error('CSV 다운로드 실패:', error);
	}
};
