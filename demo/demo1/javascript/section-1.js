// Card1_1
const card1_1 = document.getElementById('card1_1');
const c1_1_content = document.getElementById('c1_1_content');
const c1_1_img = document.getElementById('c1_1_img');
const c1_1_trail_1 = document.getElementById('c1_1_trail_1');
const c1_1_trail_2 = document.getElementById('c1_1_trail_2');
const c1_1_trail_3 = document.getElementById('c1_1_trail_3');

pBTransform(c1_1_content, {
	hoverTarget: card1_1,
	translateX: 60,
	rotate: 30,
	rotateStyle: 2,
	duration: 200,
})

pBTransform(c1_1_img, {
	hoverTarget: card1_1,
	translateX: 60,
	rotate: 30,
	rotateStyle: 2,
	duration: 200,
})

pBTransform(c1_1_trail_1, {
	hoverTarget: card1_1,
	translateX: 60,
	rotate: 45,
	rotateStyle: 2,
	duration: 350,
})

pBTransform(c1_1_trail_2, {
	hoverTarget: card1_1,
	translateX: 60,
	rotate: 60,
	rotateStyle: 2,
	duration: 500,
})

pBTransform(c1_1_trail_3, {
	hoverTarget: card1_1,
	translateX: 60,
	rotate: 75,
	rotateStyle: 2,
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
	rotate: 15,
	duration: 200,
})

pBTransform(c1_2_img, {
	hoverTarget: card1_2,
	translate: 65,
	scale: 1.05,
	rotate: 15,
	duration: 200,
})

pBTransform(c1_2_trail_1, {
	hoverTarget: card1_2,
	translate: 35,
	rotate: 20,
	duration: 350,
})

pBTransform(c1_2_trail_2, {
	hoverTarget: card1_2,
	translate: 5,
	translateReverse: true,
	scale: .95,
	rotate: 25,
	duration: 500,
})

pBTransform(c1_2_trail_3, {
	hoverTarget: card1_2,
	translate: 45,
	translateReverse: true,
	scale: .9,
	rotate: 30,
	duration: 650,
})