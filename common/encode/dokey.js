import random from './random.js';
const key = 'lVHtuCOfgXffjNQt';
	
	function secretdate() {
		var timestamp = new Date().getTime();
		var nonce = random.random_char(8);
		var data_for_sign =  timestamp + nonce;
		return data_for_sign;
	};
	
	function getkey() {
	    return key;
	}	
export default {
	secretdate,
	getkey
}
