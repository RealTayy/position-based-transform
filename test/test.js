const fsBox = document.getElementsByClassName('full-screen-box');
const fsContent = document.getElementById('full-screen-content');
const allBoxes = document.getElementsByClassName('box');
const ofhBox = document.getElementById('overflow-hidden');

const layBox = document.getElementById('layered-box');

// console.log(allBoxes);

const layOptions = {
	ignoreOthers: true
}
const layInstance = pBTransform(layBox, layOptions);
// const fsInstance = pBTransform(fsBox);