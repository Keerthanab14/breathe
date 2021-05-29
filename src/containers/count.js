import React, { useState, useEffect } from 'react';
import '../css/style.css';

export default function Count() {
	let [ seconds, setSeconds ] = useState(0);
	let [ minutes, setMinutes ] = useState(0);
	let [ hours, setHours ] = useState(0);
	let [ breath, setBreath ] = useState('Inhale');

	let [ count, setCount ] = useState(0);
	//Define vars to hold display value
	let [ displaySeconds, setDisplaySeconds ] = useState('00');
	let [ displayMinutes, setDisplayMinutes ] = useState('00');
	let [ displayHours, setDisplayHours ] = useState('00');

	//Define var to hold setInterval() func
	let interval = null;

	//Define var to hold status
	// let status = "stopped";
	let [ isActive, setIsActive ] = useState(false);

	useEffect(
		() => {
			let interval = null;
			if (!!isActive) {
				console.log('isActive');
				interval = setInterval(() => {
          let first = async () => await setSeconds((seconds) => seconds + 1);
          first().then(() => stopWatch());
				}, 1000);
			} else if (!isActive && breath == 'Inhale') {
				console.log('isNotActive');
				clearInterval(interval);
			}
			return () => clearInterval(interval);
		},
		[ isActive, seconds ]
	);

	// Logic to when to increment next value
    const toggleStart = () => {
      setIsActive(!isActive)
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
		// If secs/mins/hrs are 1 digit, add leading 0
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
		clearInterval(null);
		setSeconds(0);
		setMinutes(0);
		setHours(0);
		setCount(0);
		setIsActive(false);
	}

  const resetDisplay = () => {
    let first = async () => await reset();
    first().then(() => {
      setDisplayHours("00");
      setDisplayMinutes("00");
      setDisplaySeconds("00");
    });
  }

	function counter() {
		setCount(count + 1);
	}

	//Breathe IN / OUT
	function change() {
		if (breath == 'Inhale') {
			setBreath('Exhale');
		} else {
			setBreath('Inhale');
			counter();
		}
    if (!isActive) {
      setIsActive(true);
    }
	}

	const display = () => {
		return displayHours.toString() + ':' + displayMinutes.toString() + ':' + displaySeconds.toString();
	};

	const render = () => {
		return (
			<div>
				<div id="display">{display()}</div>;
				<div class="buttons">
					<button class="btn-1" id="startStop" onClick={toggleStart}>
						{isActive ? 'Stop' : 'Start'}
					</button>
					<button class="btn-1" id="reset" onClick={resetDisplay}>
						Reset
					</button>
				</div>

				<p>Press start and let's starting breathing</p>
				<div>
					<p>
          You took <span id="disp">{count}</span> Breaths
					</p>
				</div>
				<div class="buttons">
					<button class="Breather" onClick={change} id="Breather" value="Inhale">
						{breath == 'Inhale' ? 'Inhale' : 'Exhale'}
					</button>
				</div>
			</div>
		);
	};

	return <div class="count-container"> {render()} </div>;
}
