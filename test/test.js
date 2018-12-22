const fsBox = document.getElementsByClassName('full-screen-box');
const fsContent = document.getElementById('full-screen-content');
const allBoxes = document.getElementsByClassName('box');
const ofhBox = document.getElementById('overflow-hidden');

const layBox = document.getElementById('layered-box');
const layContent = document.getElementById('layered-content');
const layImg = document.getElementById('layered-img');
const layBehind = document.getElementById('layered-behind');
const layTextOne = document.getElementById('layered-text-one');
const layTextTwo = document.getElementById('layered-text-two');

const overflowHidden = document.getElementById('overflow-hidden');
const overflowImgBox = document.getElementById('overflow-img-box');

const options = {
	translate: 50,	
	// tilt: 25,	
	rotate: 35,
	// rotateStyle: 4,	
	// scale: 1.1
	// tiltReverse: true,
	// translateYReverse: true,	
	rotateStyle: 3,
}

const options2 = {	
}

console.log(pBTransform(layContent, { hoverTarget: layBox, ...options }));