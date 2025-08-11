import { Question } from '@/types/questions';

export const questions: Question[] = [
	{
		question: 'Q1. 내 썸 시작 스타일은?',
		options: [
			{ text: '💬 먼저 말 걸기', type: 'testosterone', value: 2 },
			{ text: '👀 눈빛으로 어필', type: 'estrogen', value: 1 },
			{ text: '😊 자연스럽게 웃으며', type: 'estrogen', value: 2 },
			{ text: '🤔 상황 봐가며', type: 'testosterone', value: 1 },
		],
	},
	{
		question: 'Q2. 썸남/썸녀가 늦게 답장하면?',
		options: [
			{ text: '😤 바로 따지기', type: 'testosterone', value: 2 },
			{ text: '😢 속상하지만 참기', type: 'estrogen', value: 1 },
			{ text: '🤷‍♀️ 바쁜가보다 하기', type: 'estrogen', value: 2 },
			{ text: '📱 더 늦게 답장하기', type: 'testosterone', value: 1 },
		],
	},
	{
		question: 'Q3. 데이트 장소 정할 때',
		options: [
			{ text: '🎯 내가 정해서 제안', type: 'testosterone', value: 2 },
			{ text: '💭 상대방 취향 고려', type: 'estrogen', value: 2 },
			{ text: '🤝 같이 의논해서', type: 'estrogen', value: 1 },
			{ text: '😅 상대방에게 맡기기', type: 'testosterone', value: 1 },
		],
	},
	{
		question: 'Q4. 썸 상대가 다른 사람과 친하게 지내면?',
		options: [
			{ text: '🔥 직접 질문하기', type: 'testosterone', value: 2 },
			{ text: '😭 속으로만 질투', type: 'estrogen', value: 1 },
			{ text: '🧐 상황 파악하기', type: 'estrogen', value: 2 },
			{ text: '😤 나도 다른 사람과', type: 'testosterone', value: 1 },
		],
	},
	{
		question: 'Q5. 고백을 받는다면?',
		options: [
			{ text: '💪 나도 먼저 할걸', type: 'testosterone', value: 2 },
			{ text: '😊 받는 게 좋다', type: 'estrogen', value: 1 },
			{ text: '🤔 상황에 따라', type: 'estrogen', value: 2 },
			{ text: '💕 로맨틱하게 받고 싶어', type: 'testosterone', value: 1 },
		],
	},
	{
		question: 'Q6. 데이트 중 갑자기 비가 오면?',
		options: [
			{ text: '🏃‍♂️ 빨리 뛰어가자', type: 'testosterone', value: 2 },
			{ text: '☔ 우산 하나로 같이', type: 'estrogen', value: 2 },
			{ text: '🏠 근처 카페로 피하기', type: 'estrogen', value: 1 },
			{ text: '🌧️ 비 맞으며 걷기', type: 'testosterone', value: 1 },
		],
	},
	{
		question: 'Q7. 첫 키스는 언제?',
		options: [
			{ text: '💋 분위기 되면 바로', type: 'testosterone', value: 2 },
			{ text: '💖 특별한 날에', type: 'estrogen', value: 2 },
			{ text: '🤗 자연스럽게 될 때', type: 'estrogen', value: 1 },
			{ text: '⏰ 충분히 알고 나서', type: 'testosterone', value: 1 },
		],
	},
	{
		question: 'Q8. 내 연애 표현 방식',
		options: [
			{ text: '💬 감정표현 자주 함', type: 'testosterone', value: 2 },
			{ text: '☺️ 티는 내지만 먼저는 못 함', type: 'estrogen', value: 1 },
			{ text: '🤗 먼저 말하면 맞장구', type: 'estrogen', value: 2 },
			{ text: '✊ 표현 없으면 연애 안됨', type: 'testosterone', value: 1 },
		],
	},
	{
		question: 'Q9. 싸웠을 때 해결 방법',
		options: [
			{ text: '🗣️ 바로 대화로 해결', type: 'testosterone', value: 2 },
			{ text: '😔 시간 두고 풀기', type: 'estrogen', value: 1 },
			{ text: '🤝 서로 양보하기', type: 'estrogen', value: 2 },
			{ text: '💌 편지나 메시지로', type: 'testosterone', value: 1 },
		],
	},
	{
		question: 'Q10. 기념일을 챙기는 스타일',
		options: [
			{ text: '📅 정확히 다 챙기기', type: 'testosterone', value: 2 },
			{ text: '💝 특별하게 준비', type: 'estrogen', value: 2 },
			{ text: '🎉 간단하게 축하', type: 'estrogen', value: 1 },
			{ text: '💭 마음으로만', type: 'testosterone', value: 1 },
		],
	},
	{
		question: 'Q11. 미래의 연인에게 바라는 것',
		options: [
			{ text: '💪 든든하고 리드해주길', type: 'estrogen', value: 1 },
			{ text: '🤗 나를 따라와 주길', type: 'testosterone', value: 2 },
			{ text: '👫 서로 존중하며', type: 'estrogen', value: 2 },
			{ text: '💕 로맨틱한 사랑', type: 'testosterone', value: 1 },
		],
	},
];

export function calculateResults(answers: number[], gender: string) {
	let estrogenScore = 0;
	let testosteroneScore = 0;

	answers.forEach((answerIndex, questionIndex) => {
		const answer = questions[questionIndex].options[answerIndex];
		if (answer.type === 'estrogen') {
			estrogenScore += answer.value;
		} else if (answer.type === 'testosterone') {
			testosteroneScore += answer.value;
		}
	});

	const totalScore = estrogenScore + testosteroneScore;
	const estrogenPercent =
		totalScore > 0 ? (estrogenScore / totalScore) * 100 : 50;
	const testosteronePercent =
		totalScore > 0 ? (testosteroneScore / totalScore) * 100 : 50;

	let resultType: string;
	let resultSubtype: string;
	let resultIcon: string;

	if (estrogenScore > testosteroneScore) {
		resultType = '에스트로겐형';
		resultIcon = '🌸';
		resultSubtype =
			gender === 'female' ? '에겐녀 (Estrogen Girl)' : '에겐남 (Estrogen Boy)';
	} else if (testosteroneScore > estrogenScore) {
		resultType = '테스토스테론형';
		resultIcon = '🔥';
		resultSubtype =
			gender === 'female'
				? '테토녀 (Testosterone Girl)'
				: '테토남 (Testosterone Boy)';
	} else {
		resultType = '혼합형';
		resultIcon = '⚖️';
		resultSubtype = '균형잡힌 매력 (Balanced Type)';
	}

	return {
		estrogenScore,
		testosteroneScore,
		estrogenPercent: Math.round(estrogenPercent * 10) / 10,
		testosteronePercent: Math.round(testosteronePercent * 10) / 10,
		resultType,
		resultSubtype,
		resultIcon,
	};
}

export function getResultAnalysis(resultType: string) {
	switch (resultType) {
		case '에스트로겐형':
			return {
				title: '✨ 에겐형의 특징',
				thumbStyle: {
					title: '🎯 썸 스타일',
					items: [
						'조심스럽고 신중한 접근',
						'상대방 눈치를 많이 봄',
						'먼저 다가가기보단 기다리는 스타일',
						'은근한 관심 표현을 선호',
					],
				},
				lovePattern: {
					title: '💕 연애 패턴',
					items: [
						'천천히 감정을 쌓아가는 타입',
						'로맨틱하고 부드러운 분위기 선호',
						'상대방의 배려심을 중요하게 생각',
						'밀당의 고수, 기다림의 미학',
					],
				},
				strengths: {
					title: '🌱 장점',
					items: [
						'깊이 있는 감정 교류',
						'안정적이고 진실한 관계 추구',
						'상대방을 세심하게 배려',
					],
				},
				warnings: {
					title: '⚠️ 주의점',
					items: [
						'때로는 적극성도 필요해요',
						'내 마음을 더 솔직하게 표현해보세요',
					],
				},
			};
		case '테스토스테론형':
			return {
				title: '✨ 테토형의 특징',
				thumbStyle: {
					title: '🎯 썸 스타일',
					items: [
						'적극적이고 주도적인 접근',
						'솔직하고 직설적인 표현',
						'먼저 다가가는 것을 두려워하지 않음',
						'확실한 관심 표현을 선호',
					],
				},
				lovePattern: {
					title: '💕 연애 패턴',
					items: [
						'빠르게 감정을 표현하는 타입',
						'역동적이고 활발한 분위기 선호',
						'상대방의 적극성을 중요하게 생각',
						'밀고 당기기보다 직진',
					],
				},
				strengths: {
					title: '🌱 장점',
					items: [
						'확실하고 명확한 의사표현',
						'리더십 있는 관계 주도',
						'상대방에게 확신을 줌',
					],
				},
				warnings: {
					title: '⚠️ 주의점',
					items: ['때로는 신중함도 필요해요', '상대방의 속도를 맞춰주세요'],
				},
			};
		default:
			return {
				title: '✨ 혼합형의 특징',
				thumbStyle: {
					title: '🎯 썸 스타일',
					items: [
						'상황에 따라 유연한 접근',
						'균형잡힌 감정 표현',
						'적극성과 신중함의 조화',
						'다양한 매력 어필',
					],
				},
				lovePattern: {
					title: '💕 연애 패턴',
					items: [
						'상대와 상황에 맞춰 조절',
						'다채로운 분위기 연출 가능',
						'균형잡힌 관계 추구',
						'올라운드 플레이어 타입',
					],
				},
				strengths: {
					title: '🌱 장점',
					items: [
						'다양한 상황 적응 능력',
						'폭넓은 매력으로 어필',
						'안정적이면서도 역동적',
					],
				},
				warnings: {
					title: '⚠️ 주의점',
					items: [
						'때로는 확실한 선택이 필요해요',
						'본인만의 색깔을 더 뚜렷하게',
					],
				},
			};
	}
}
