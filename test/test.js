const fsBox = document.getElementsByClassName('full-screen-box');
const fsContent = document.getElementById('full-screen-content');
const allBoxes = document.getElementsByClassName('box');
const ofhBox = document.getElementById('overflow-hidden');

const layBox = document.getElementById('layered-box');
const layContent = document.getElementById('layered-content');

const layOptions = {
	hoverTarget: layBox,
	//maxXOffset: "50%",
	//duration: "3s"
}

pBTransform(layContent, layOptions);
