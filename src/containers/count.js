import React, { useState, useEffect } from 'react';
import '../css/style.css';

import BgMusic from '../assets/background.mp3';
import SoundIn from '../assets/breathIn.mp3';
import SoundOut from '../assets/breathOut.mp3';


export default function Count() {
	let [ seconds, setSeconds ] = useState(0);
	let [ minutes, setMinutes ] = useState(0);
	let [ hours, setHours ] = useState(0);
	let [ breath, setBreath ] = useState('Inhale');
	let [ audio, setAudio ] = useState(false);

	let [ count, setCount ] = useState(0);
	//Define vars to hold display value
	let [ displaySeconds, setDisplaySeconds ] = useState('00');
	let [ displayMinutes, setDisplayMinutes ] = useState('00');
	let [ displayHours, setDisplayHours ] = useState('00');

	//Define var to hold setInterval() func
	let interval = null;

	//Define var to hold status
	// let status = "stopped";
	let [ guidedActive, setGuidedActive ] = useState(false);
	let [ freeActive, setFreeActive ] = useState(false);

	let audioIn = new Audio(SoundIn);
	let audioOut = new Audio(SoundOut);

	useEffect(
		() => {
			let interval = null;
			if (!!freeActive & !guidedActive) {
				console.log('isFree');
				interval = setInterval(() => {
					
					let first = async () => await setSeconds((seconds) => seconds + 1);
					first().then(() => stopWatch());
				}, 1000);
			} else if (!!guidedActive && !freeActive) {
				console.log('isguided');
				if (seconds >= 0 ) {
					interval = setInterval(() => {
						let first = async () => await setSeconds((seconds) => seconds - 1);
						first().then(() => setDisplays());
					}, 1000);
				} else {
					let resetTime = async () => await setSeconds(() => 3);
					resetTime().then(() => setDisplays());
				}
			}
			// } else if (!freeActive && guidedActive) {
			// 	console.log('inactive');
			// 	clearInterval(interval);
			// 	resetDisplay();
			// }
			return () => clearInterval(interval);
		},
		[ freeActive, seconds, guidedActive ]
	);

	// Logic to when to increment next value
	const toggleGuided = () => {
		let first = async () => await resetDisplay();
		first().then(() => {
			setGuidedActive(!guidedActive);
			setFreeActive(false);
		});
	};
	const toggleFree = () => {
		let first = async () => await resetDisplay();
		first().then(() => {
			setFreeActive(!freeActive);
			setGuidedActive(false);
		});
	};

	function stopWatch() {
		// When mins change
		if (seconds / 60 == 1) {
			setSeconds(0);
			setMinutes(minutes++);

			if (minutes / 60 == 1) {
				setMinutes(0);
				setHours(hours++);
			}
		}
		setDisplays();
	}
	function setDisplays() {
		// If secs/mins/hrs are 1 digit, add leading 0
		if (seconds == 0 ) {
			setDisplaySeconds('00')
		}

		if (seconds < 10) {
			setDisplaySeconds('0' + seconds.toString());
		} else {
			setDisplaySeconds(seconds);
		}
		if (minutes < 10) {
			setDisplayMinutes('0' + minutes.toString());
		} else {
			setDisplayMinutes(minutes);
		}
		if (hours < 10) {
			setDisplayHours('0' + hours.toString());
		} else {
			setDisplayHours(hours);
		}
	}

	function reset() {
		clearInterval(interval);
		setSeconds(0);
		setMinutes(0);
		setHours(0);
		setGuidedActive(false);
		setFreeActive(false);
	}

	function resetCount() {
		setCount(0);
	}

	const resetDisplay = async () => {
		let first = async () => await reset();
		first().then(() => {
			setDisplays();
		});
	};

	function counter() {
		setCount(count + 1);
	}

	//Breathe IN / OUT
	function change() {
		if (breath == 'Inhale') {
			audioOut.pause();
			audioOut.currentTime = 0;
			audioIn.play();
			setBreath('Exhale');
		} else {
			audioIn.pause();
			audioIn.currentTime = 0;
			audioOut.play();
			setBreath('Inhale');
			counter();
		}
	}

	const display = () => {
		return displayHours.toString() + ':' + displayMinutes.toString() + ':' + displaySeconds.toString();
	};

	const render = () => {
		return (
			<div>
				<div id="display">{display()}</div>
				<div className="buttons">
					<button className="btn-1" onClick={toggleGuided}>
						{guidedActive ? 'Stop' : 'Guided Breathing'}
					</button>
					<button className="btn-1" onClick={toggleFree}>
						{freeActive ? 'Stop' : 'Free Breathing'}
					</button>
					<button className="btn-1" id="reset" onClick={resetCount}>
						Reset Breath Count
					</button>
				</div>

				<p className="home-fs">Press start and let's starting breathing</p>
				<div>
					<p className="home-fs">
						You took <span className="home-fs">{count}</span> Breaths
					</p>
				</div>
				<div className="buttons">
					<button className="Breather" onClick={change} id="Breather" value="Inhale">
						{breath == 'Inhale' ? 'Inhale' : 'Exhale'}
					</button>
				</div>
				
			</div>
		);
	};

	return <div className="count-container"> {render()} </div>;
}
