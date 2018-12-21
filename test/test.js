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
	// translate: "50px",
	translateY: "5%",
	// tilt: 15,
	// tiltX: 5,
	// rotate: 5,
	// rotateX: 12.5,	
	// scale: 1.1
}

const options2 = {
	maxXRotateX: 5,
	maxYRotateX: 5,
	maxXRotateY: 5,
	maxYRotateY: 5,
}

console.log(pBTransform(layContent, { hoverTarget: layBox, ...options }));