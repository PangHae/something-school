import { UserResult, UserDTO } from '@/types/users';
import { supabaseClient } from '@/utils/supabase/client';

export const createUser = async (user: UserResult) => {
	try {
		const supabase = supabaseClient();
		const { data, error } = await supabase
			.from('users')
			.insert({
				name: user.name,
				gender: user.gender,
				class: user.class,
			})
			.select()
			.single();

		if (error) {
			throw new Error('사용자 생성에 실패하였습니다. 다시 시도해주세요.');
		}

		return data as UserDTO;
	} catch {
		throw new Error('사용자 생성에 실패하였습니다. 다시 시도해주세요.');
	}
};
