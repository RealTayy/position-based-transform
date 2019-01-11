const s4_content_left = document.getElementById('s4_content_left');
const s4_content_right = document.getElementById('s4_content_right');
const s4_content_left_wrapper = document.getElementById('s4_content_left_wrapper');
const s4_content_right_wrapper = document.getElementById('s4_content_right_wrapper');
const section_four = document.getElementById('section-four');

const card4_1 = document.getElementById('card4_1');
const c4_1_content = document.getElementById('c4_1_content');
const card4_1_wrapper = document.getElementById('card4_1_wrapper');
const c4_1_img = document.getElementById('c4_1_img');
const c4_1_glare = document.getElementById('c4_1_glare');

pBTransform(s4_content_left_wrapper, {
	hoverTarget: section_four,
	translateX: 250,
	translateXReverse: true,
	duration: 2500,
});

pBTransform(s4_content_right_wrapper, {
	hoverTarget: section_four,
	translateX: 250,
	translateXReverse: true,
	duration: 2500
});

pBTransform(card4_1_wrapper, {
	hoverTarget: card4_1,
	tilt: 15,
	onEnter: () => {
		card4_1.classList.add('hover');
		s4_content_left.style.opacity = 1;
		card4_2.style.opacity = 0;
	},
	onLeave: () => {
		card4_1.classList.remove('hover');
		s4_content_left.style.opacity = .1
		card4_2.style.opacity = 1;
	}
})

pBTransform(c4_1_glare, {	
	rotate: 5,
	rotateStyle: 2,
	hoverTarget: card4_1,
	translateX: 40,
	translateY: 40,
	translateYReverse: true,
	scale: 1.3,
})

const card4_2 = document.getElementById('card4_2');
const c4_2_content = document.getElementById('c4_2_content');
const card4_2_wrapper = document.getElementById('card4_2_wrapper');
const c4_2_img = document.getElementById('c4_2_img');
const c4_2_glare = document.getElementById('c4_2_glare');

pBTransform(s4_content_left_wrapper, {
	hoverTarget: section_four,
	translateX: 250,
	translateXReverse: true,
	duration: 2500,
});

pBTransform(s4_content_right_wrapper, {
	hoverTarget: section_four,
	translateX: 250,
	translateXReverse: true,
	duration: 2500
});

pBTransform(card4_2_wrapper, {
	hoverTarget: card4_2,
	tilt: 15,
	onEnter: () => {
		card4_2.classList.add('hover');
		s4_content_right.style.opacity = 1;
		card4_1.style.opacity = 0;
	},
	onLeave: () => {
		card4_2.classList.remove('hover');
		s4_content_right.style.opacity = .1
		card4_1.style.opacity = 1;
	}
})

pBTransform(c4_2_glare, {	
	rotate: 5,
	rotateStyle: 2,
	hoverTarget: card4_2,
	translateX: 40,
	translateY: 40,
	translateYReverse: true,
	scale: 1.3,
})