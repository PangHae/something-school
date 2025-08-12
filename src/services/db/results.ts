import { TZDate } from 'react-day-picker';

import { ResultRequest, UserResultJoined } from '@/types/results';
import { supabaseClient } from '@/utils/supabase/client';

export const createResult = async (result: ResultRequest) => {
	try {
		// 입력 검증
		if (!result.userId || result.userId <= 0) {
			throw new Error('유효하지 않은 사용자입니다.');
		}

		if (result.estrogenScore < 0 || result.estrogenScore > 100) {
			throw new Error('유효하지 않은 에스트로겐 점수입니다.');
		}

		if (result.testosteroneScore < 0 || result.testosteroneScore > 100) {
			throw new Error('유효하지 않은 테스토스테론 점수입니다.');
		}

		if (
			!result.resultType ||
			!['에스트로겐형', '테스토스테론형', '혼합형'].includes(result.resultType)
		) {
			throw new Error('유효하지 않은 결과 타입입니다.');
		}

		if (!result.resultSubtype || result.resultSubtype.trim().length === 0) {
			throw new Error('결과 서브타입이 필요합니다.');
		}

		const supabase = supabaseClient();

		const { data, error } = await supabase
			.from('results')
			.insert({
				user_id: result.userId,
				estrogen_score: result.estrogenScore,
				testosterone_score: result.testosteroneScore,
				result_type: result.resultType,
				result_subtype: result.resultSubtype.trim(),
			})
			.select();

		if (error) {
			if (error.code === 'PGRST116') {
				throw new Error('결과 저장 권한이 없습니다.');
			}
			throw new Error('결과 저장에 실패하였습니다. 다시 시도해주세요.');
		}

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error('결과 저장에 실패하였습니다. 다시 시도해주세요.');
	}
};

const getUserResultsQuery = (
	supabaseClient: any,
	todayOnly: boolean = false
) => {
	let query = supabaseClient.from('results').select(
		`
			*,
			users (
				id,
				name,
				gender,
				class,
				created_at
			)
		`
	);

	if (todayOnly) {
		// TZDate를 사용해서 Asia/Seoul 기준 오늘 시작과 끝 시간 설정
		const nowKST = new TZDate(new Date(), 'Asia/Seoul');

		// 오늘 00:00:00
		const todayStart = new TZDate(
			new Date(
				nowKST.getFullYear(),
				nowKST.getMonth(),
				nowKST.getDate(),
				0,
				0,
				0,
				0
			),
			'Asia/Seoul'
		).toISOString();

		// 오늘 23:59:59.999
		const todayEnd = new TZDate(
			new Date(
				nowKST.getFullYear(),
				nowKST.getMonth(),
				nowKST.getDate(),
				23,
				59,
				59,
				999
			),
			'Asia/Seoul'
		).toISOString();

		query = query.gte('created_at', todayStart).lte('created_at', todayEnd);
	}

	return query.order('created_at', { ascending: false });
};

export const getAllUserResults = async (): Promise<UserResultJoined[]> => {
	const supabase = supabaseClient();

	const { data, error } = await getUserResultsQuery(supabase);

	if (error) {
		throw error;
	}

	return data as UserResultJoined[];
};

export const getTodayUserResults = async (): Promise<UserResultJoined[]> => {
	const supabase = supabaseClient();

	const { data, error } = await getUserResultsQuery(supabase, true);

	if (error) {
		throw error;
	}

	return data as UserResultJoined[];
};

export const subscribeToUserResults = (
	callback: (data: UserResultJoined[]) => void,
	onError?: (error: any) => void,
	todayOnly: boolean = false
) => {
	const supabase = supabaseClient();

	const channel = supabase
		.channel('user_results_changes')
		.on(
			'postgres_changes',
			{
				event: '*',
				schema: 'public',
				table: 'results',
			},
			async () => {
				// 테이블이 변경될 때마다 최신 데이터를 다시 가져옴
				try {
					const { data, error } = await getUserResultsQuery(
						supabase,
						todayOnly
					);

					if (error) {
						if (onError) onError(error);
						return;
					}

					callback(data as UserResultJoined[]);
				} catch (err) {
					if (onError) onError(err);
				}
			}
		)
		.subscribe();

	const loadInitialData = async () => {
		try {
			const { data, error } = await getUserResultsQuery(supabase, todayOnly);

			if (error) {
				if (onError) onError(error);
				return;
			}

			callback(data as UserResultJoined[]);
		} catch (err) {
			if (onError) onError(err);
		}
	};

	loadInitialData();

	// 구독 해제 함수 반환
	return () => {
		channel.unsubscribe();
	};
};
