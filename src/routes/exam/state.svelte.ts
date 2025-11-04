let examEnded = $state(false);
let questionIndex = $state(0);

export function examStore() {
	return {
		get isEnded() {
			return examEnded;
		},
		get questionIndex() {
			return questionIndex;
		},
		setEnded(value: boolean) {
			examEnded = value;
		},
		incrementQuestionIndex() {
			questionIndex++;
		},
		reset() {
			examEnded = false;
			questionIndex = 0;
		}
	};
}
