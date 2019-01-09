const s3_bg_container = document.getElementById("s3_bg_container");
const s3_bg = document.getElementById("s3_bg");
const s3_bg_cover = document.getElementById("s3_bg_cover");
const s3_fog = document.getElementById("s3_fog");
const s3_fog_r = document.getElementById("s3_fog_r");

// Background effects
pBTransform(s3_fog, {
	hoverTarget: s3_bg_container,
	translate: "30%",
	scale: 1.6,
	duration: 4000,
})

pBTransform(s3_fog_r, {
	hoverTarget: s3_bg_container,
	translate: "10%",
	scale: 1.2,
	duration: 2000,
})

pBTransform(s3_bg, {
	hoverTarget: s3_bg_container,
	translate: "3%",
	scale: 1.06,
	duration: 4000,
})

// Card 1
const card3_1 = document.getElementById("card3_1");
const c3_1_cover = document.getElementById("c3_1_cover");
const card3_1_img_container = document.getElementById("card3_1_img_container");
const c3_1_text = document.getElementById("c3_1_text");
const c3_1_subtext = document.getElementById("c3_1_subtext");
const c3_1_caption_img = document.getElementById("c3_1_caption_img");
const c3_1_trail = document.getElementById("c3_1_trail");
const c3_1_content = document.getElementById("c3_1_content");

pBTransform(card3_1, {
	onEnter: () => {
		s3_bg_cover.style.opacity = 1;
		c3_1_cover.style.opacity = .001;
		c3_1_content.classList.add('hover');
		c3_2_content.style.opacity = .25;
		c3_2_trail.style.opacity = .25;
	},
	onLeave: () => {
		s3_bg_cover.style.opacity = .001;
		c3_1_cover.style.opacity = 1;
		c3_1_content.classList.remove('hover');
		c3_2_content.style.opacity = 1;
		c3_2_trail.style.opacity = 1;
	}
})

pBTransform(card3_1_img_container, {
	hoverTarget: card3_1,
	translate: 15,
	rotate: 5,
	duration: 500,
})

pBTransform(c3_1_trail, {
	hoverTarget: card3_1,
	translate: 10,
	rotate: 10,
	rotateStyle: 3,
	duration: 1000,
})

pBTransform(c3_1_text, {
	hoverTarget: card3_1,
	rotate: 5,
	rotateStyle: 2,
	duration: 500,
})

pBTransform(c3_1_subtext, {
	hoverTarget: card3_1,
	translate: 10,
	translateXReverse: true,
	rotateStyle: 3,
	duration: 750,
})

pBTransform(c3_1_caption_img, {
	hoverTarget: card3_1,
	translateX: 25,
	duration: 1250,
})

// Card 2
const card3_2 = document.getElementById("card3_2");
const c3_2_cover = document.getElementById("c3_2_cover");
const card3_2_img_container = document.getElementById("card3_2_img_container");
const c3_2_text = document.getElementById("c3_2_text");
const c3_2_subtext = document.getElementById("c3_2_subtext");
const c3_2_caption_img = document.getElementById("c3_2_caption_img");
const c3_2_trail = document.getElementById("c3_2_trail");
const c3_2_content = document.getElementById("c3_2_content");

pBTransform(card3_2, {
	onEnter: () => {
		s3_bg_cover.style.opacity = 1;
		c3_2_cover.style.opacity = .001;
		c3_2_content.classList.add('hover');
		c3_1_content.style.opacity = .25;
	},
	onLeave: () => {
		s3_bg_cover.style.opacity = .001;
		c3_2_cover.style.opacity = 1;
		c3_2_content.classList.remove('hover');
		c3_1_content.style.opacity = 1;
	}
})

pBTransform(card3_2_img_container, {
	hoverTarget: card3_2,
	translate: 15,
	rotate: 15,
	rotateStyle: 2,
	duration: 500,
})

pBTransform(c3_2_trail, {
	hoverTarget: card3_2,
	translate: 10,
	rotate: 15,
	rotateStyle: 2,
	duration: 1000,
})

pBTransform(c3_2_text, {
	hoverTarget: card3_2,	
	rotate: 5,
	rotateStyle: 2,
	duration: 500,
})

pBTransform(c3_2_subtext, {
	hoverTarget: card3_2,
	translateX: 10,
	translateXReverse: true,
	rotate: 5,
	rotateStyle: 2,
	duration: 750,
})

pBTransform(c3_2_caption_img, {
	hoverTarget: card3_2,	
	translateY: 25,
	duration: 1250,
})