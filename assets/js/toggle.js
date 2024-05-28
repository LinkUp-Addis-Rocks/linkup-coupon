const spinnerDiv = document.querySelector('.spinner');
const errorDiv = document.querySelector('.error');
const infoFormDiv = document.querySelector('.info-form');
const successDiv = document.querySelector('.success');
const noCouponsDiv = document.querySelector('.no-coupons');

function toggleDiv(div, flag) {
	if (flag) {
		div.classList.remove('hidden');
		return;
	}

	div.classList.add('hidden');
}

export function toggleSpinner(flag) {
	toggleDiv(spinnerDiv, flag);
}

export function toggleError(flag) {
	toggleDiv(errorDiv, flag);
}

export function toggleInfoForm(flag) {
	toggleDiv(infoFormDiv, flag);
}

export function toggleSuccess(flag) {
	toggleDiv(successDiv, flag);
}

export function toggleNoCoupons(flag) {
	toggleDiv(noCouponsDiv, flag);
}

