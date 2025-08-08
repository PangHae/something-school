export interface TestResult {
	estrogenScore: number;
	testosteroneScore: number;
	estrogenPercent: number;
	testosteronePercent: number;
	resultType: string;
	resultSubtype: string;
	resultIcon: string;
}

export interface ParticipantStats {
	total: number;
	today: number;
	estrogenCount: number;
	testosteroneCount: number;
	mixedCount: number;
	estrogenPercent: number;
	testosteronePercent: number;
	estrogenFemale: number;
	estrogenMale: number;
	testosteroneFemale: number;
	testosteroneMale: number;
}

export interface RecentParticipant {
	id: number;
	name: string;
	gender: string;
	class: number;
	resultSubtype: string;
	createdAt: string;
}
