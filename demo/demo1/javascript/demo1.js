document.addEventListener('DOMContentLoaded', function (event) {
	imagesLoaded(document.querySelectorAll('.card_img'), function () {
		document.getElementById('main-preloader').style.opacity = 0;
		document.getElementById('main-preloader').style.pointerEvents = "none";
	});
});