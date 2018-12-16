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
	maxXOffset: "5%",
	maxYOffset: "5%",
	maxXRotateX: 5,
	maxYRotateX: 5,
	maxXRotateY: 5,
	maxYRotateY: 5,
	maxXRotateZ: 2.5,
	maxYRotateZ: 2.5,
	scale: 1.1
}

const options2 = {
	maxXRotateX: 5,
	maxYRotateX: 5,
	maxXRotateY: 5,
	maxYRotateY: 5,
}

pBTransform(layContent, { hoverTarget: layBox, ...options });