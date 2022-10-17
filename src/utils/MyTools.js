export function onFormSubmit(e, callback) {
	e.preventDefault();
	callback();
}

export function toggleVisible(state, callback) {
	callback(!state);
}