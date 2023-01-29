export function onFormSubmit(e, callback) {
	e.preventDefault();
	callback();
}

export function toggleVisible(state, callback) {
	callback(!state);
}

export function clear_local_storage() {
	localStorage.clear();
	window.location.reload();
}
