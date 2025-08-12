export interface TestResult {
	estrogenScore: number;
	testosteroneScore: number;
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

export interface UserResultJoined {
	id: number;
	user_id: number;
	estrogen_score: number;
	testosterone_score: number;
	result_type: string;
	result_subtype: string;
	created_at: string;
	users: {
		id: number;
		name: string;
		gender: string;
		class: number;
		created_at: string;
	};
}

export interface ResultDTO {
	id: number;
	user_id: number;
	estrogen_score: number;
	testosterone_score: number;
	result_type: string;
	result_subtype: string;
	created_at: string;
}

export interface ResultRequest {
	userId: number;
	estrogenScore: number;
	testosteroneScore: number;
	resultType: string;
	resultSubtype: string;
}
