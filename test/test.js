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

const layOptions = {
	hoverTarget: layBox,
}

pBTransform(layContent, { ...layOptions });
pBTransform(layImg, { ...layOptions });
pBTransform(layBehind, { ...layOptions });
pBTransform(layTextOne, { ...layOptions });
pBTransform(layTextTwo, { ...layOptions, initialTransform: { rotate: "-90deg" } });