import { ParticipantStats, UserResultJoined } from '@/types/results';

export const calculateStats = (
	results: UserResultJoined[]
): ParticipantStats => {
	const total = results.length;
	const today = results.filter((result) => {
		const resultDate = new Date(result.created_at);
		const todayDate = new Date();
		return (
			resultDate.getDate() === todayDate.getDate() &&
			resultDate.getMonth() === todayDate.getMonth() &&
			resultDate.getFullYear() === todayDate.getFullYear()
		);
	}).length;

	const estrogenResults = results.filter(
		(result) => result.result_type === '에스트로겐형'
	);
	const testosteroneResults = results.filter(
		(result) => result.result_type === '테스토스테론형'
	);

	const estrogenCount = estrogenResults.length;
	const testosteroneCount = testosteroneResults.length;
	const mixedCount = total - estrogenCount - testosteroneCount;

	const estrogenPercent =
		total > 0 ? Math.round((estrogenCount / total) * 100) : 0;
	const testosteronePercent =
		total > 0 ? Math.round((testosteroneCount / total) * 100) : 0;

	const estrogenFemale = estrogenResults.filter(
		(result) => result.users.gender === 'female'
	).length;
	const estrogenMale = estrogenResults.filter(
		(result) => result.users.gender === 'male'
	).length;
	const testosteroneFemale = testosteroneResults.filter(
		(result) => result.users.gender === 'female'
	).length;
	const testosteroneMale = testosteroneResults.filter(
		(result) => result.users.gender === 'male'
	).length;

	return {
		total,
		today,
		estrogenCount,
		testosteroneCount,
		mixedCount,
		estrogenPercent,
		testosteronePercent,
		estrogenFemale,
		estrogenMale,
		testosteroneFemale,
		testosteroneMale,
	};
};
