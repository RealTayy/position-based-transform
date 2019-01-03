// Card1_1
const card1_1 = document.getElementById('card1_1');
const c1_1_content = document.getElementById('c1_1_content');
const c1_1_img = document.getElementById('c1_1_img');
const c1_1_trail_1 = document.getElementById('c1_1_trail_1');
const c1_1_trail_2 = document.getElementById('c1_1_trail_2');
const c1_1_trail_3 = document.getElementById('c1_1_trail_3');

pBTransform(c1_1_content, {
	hoverTarget: card1_1,
	translate: 40,
	scale: 1.1,
	tilt: 10,
	// tiltReverse: true,
	duration: 200,
})

pBTransform(c1_1_img, {
	hoverTarget: card1_1,
	translate: 40,
	scale: 1.1,
	tilt: 5,
	duration: 200,
})

pBTransform(c1_1_trail_1, {
	hoverTarget: card1_1,
	translate: 20,
	translateReverse: true,
	tilt: 15,
	duration: 350,
})

pBTransform(c1_1_trail_2, {
	hoverTarget: card1_1,
	translate: 60,
	translateReverse: true,
	scale: .9,
	tilt: 20,
	duration: 500,
})

pBTransform(c1_1_trail_3, {
	hoverTarget: card1_1,
	translate: 100,
	translateReverse: true,
	scale: .8,
	tilt: 25,
	duration: 650,
})

const card1_2 = document.getElementById('card1_2');
const c1_2_content = document.getElementById('c1_2_content');
const c1_2_img = document.getElementById('c1_2_img');
const c1_2_trail_1 = document.getElementById('c1_2_trail_1');
const c1_2_trail_2 = document.getElementById('c1_2_trail_2');
const c1_2_trail_3 = document.getElementById('c1_2_trail_3');

pBTransform(c1_2_content, {
	hoverTarget: card1_2,
	translate: 50,
	scale: 1.05,
	rotate: 10,
	duration: 200,
})

pBTransform(c1_2_img, {
	hoverTarget: card1_2,
	translate: 45,
	scale: 1.05,
	rotate: 10,
	duration: 200,
})

pBTransform(c1_2_trail_1, {
	hoverTarget: card1_2,
	translate: 15,	
	rotate: 15,
	duration: 350,
})

pBTransform(c1_2_trail_2, {
	hoverTarget: card1_2,
	translate: 10,
	translateReverse: true,
	scale: .95,
	rotate: 20,
	duration: 500,
})

pBTransform(c1_2_trail_3, {
	hoverTarget: card1_2,
	translate: 40,
	translateReverse: true,
	scale: .9,
	rotate: 25,
	duration: 650,
})