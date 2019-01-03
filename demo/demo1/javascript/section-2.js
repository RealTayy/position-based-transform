const card2_1 = document.getElementById('card2_1');
const sectionTwo = document.getElementById('section-two');
const c2_1_content = document.getElementById('c2_1_content');
const s2_cover = document.getElementById('s2_cover');
const c2_1_img = document.getElementById('c2_1_img');

const card2_2 = document.getElementById('card2_2');
const c2_2_content = document.getElementById('c2_2_content');
const c2_2_img = document.getElementById('c2_2_img');

pBTransform(c2_1_content, {
	hoverTarget: card2_1,
	tilt: 25,
	tiltReverse: true,
	onChange: (offset) => {
		const distance = Math.max(0, 100 - ((100 - offset.h) * 2));
		s2_cover.style.opacity = distance * .01;
		card2_2.style.opacity = distance * .01;
	},
	onEnter: () => {
		sectionTwo.style.backgroundImage = "url('./images/card2-1.jpg')"
	},
	onLeave: () => {
		s2_cover.style.opacity = .999;
		card2_2.style.opacity = 1;
	}
})

pBTransform(c2_1_img, {
	hoverTarget: card2_1,
	tilt: 25,
	tiltReverse: true,
})

pBTransform(c2_2_content, {
	hoverTarget: card2_2,
	tilt: 25,
	tiltReverse: true,
	onChange: (offset) => {
		const distance = Math.max(0, 100 - ((100 - offset.h) * 2));
		s2_cover.style.opacity = distance * .01;
		card2_1.style.opacity = distance * .01;
	},
	onEnter: () => {
		sectionTwo.style.backgroundImage = "url('./images/card2-2.jpg')"
	},
	onLeave: () => {
		s2_cover.style.opacity = .999;
		card2_1.style.opacity = 1;
	}
})

pBTransform(c2_2_img, {
	hoverTarget: card2_2,
	tilt: 25,
	tiltReverse: true,
})