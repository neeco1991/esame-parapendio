let numberOfQuestions = $state(0);
let questionIndex = $state(0);

export function sectionStore() {
	return {
		get numberOfQuestions() {
			return numberOfQuestions;
		},
		get questionIndex() {
			return questionIndex;
		},
		setNumberOfQuestions(n: number) {
			numberOfQuestions = n;
		},
		incrementQuestionIndex() {
			questionIndex++;
		},
		reset() {
			numberOfQuestions = 0;
			questionIndex = 0;
		}
	};
}
