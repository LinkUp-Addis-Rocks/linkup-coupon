import { toggleInfoForm, toggleSpinner, toggleError, toggleSuccess, toggleNoCoupons, toggleClaimBtnLoading } from "./toggle.js";

// * DOM elements
const rewardDiv = document.querySelector('.reward-text');
const imgDiv = document.querySelector('.coupon-img');
const infoForm = document.querySelector('#info-form')
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const claimBtn = document.querySelector('#claim-offer-btn');

// * Event Listeners
infoForm.addEventListener('submit', claimCoupon)

// * Supabase
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
script.onload = async () => {
	const supabase = loadSupabase();
	const code = getCouponCode();
	
	toggleSpinner(true);
	
	try {
		await loadCoupon(code, supabase);
		toggleInfoForm(true);
	} catch {
		toggleError(true);
	} finally {
		toggleSpinner(false);
	}
};
document.head.appendChild(script);

function loadSupabase() {
	const supabaseUrl = 'https://kdgqiiblitvrncdikire.supabase.co';
	const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZ3FpaWJsaXR2cm5jZGlraXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NzgxNzIsImV4cCI6MjAzMjA1NDE3Mn0.AUeXqzB81IN6eotwD8BYsksRricTV3z4hnjzaBMrYh8';
	
	const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

	window.supabaseClient = supabase

	return supabase;
}

function getCouponCode() {
	const code = new URLSearchParams(window.location.search).get('code');
	return code;
}

async function loadCoupon(code, supabase) {
	if (!code) {
		throw new Error('No coupon code found');
	}

	const { data, error } = await supabase.from('Coupons').select().eq('Number', code).single();

	if (error) {
		console.error(error);
		throw new Error('Error loading coupon');
	}

	if (data) {
		const coupon = data;

		rewardDiv.textContent = coupon.Reward;
		
		if (!!data.Photo) {
			// create image element
			const img = document.createElement('img');
			img.src = coupon.Photo;
			img.alt = 'Coupon photo';
			imgDiv.appendChild(img);
		}
	}
} 

async function claimCoupon(e) {
	e.preventDefault();
	if (claimBtn.dataset.loading === 'true') {
		return;
	}

	toggleClaimBtnLoading(true)

	const payload = {
		"Name": nameInput.value,
		"Phone Number": phoneInput.value,
		"Coupon": getCouponCode(),
	}

	try {
		console.log('Adding winners');
		const { error } = await window.supabaseClient.from('Winners').insert(payload)
		if (error) {
			throw new Error(error)
		}

		toggleInfoForm(false)
		toggleSuccess(true)
	} catch (error) {
		console.error(error);	
	} finally {
		toggleClaimBtnLoading(false)
	}
}