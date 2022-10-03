export function initTime() {
	sessionStorage.setItem('MyPrintInitTime', Date.now());
}

export function getInitTime() {
	return Date.now() - sessionStorage.getItem('MyPrintInitTime');
}

export default function mprint(...args) {
	const secPassed = getInitTime()/1000;
	console.log(`=(${secPassed})=`, ...args);
}