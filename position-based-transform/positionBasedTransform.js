// Initialize and Returns pBTransform Instance
function pBTransform(target, options) {
	// Check if target is jQuery object and return PBTransform Instance
	try {
		if (target instanceof jQuery) {
			return new PBTransform(target[0], options)
		};
	} catch (e) {
		// Don't error and exit out of function yet if not jQuery Object
	};

	// Check if target if Native DOM element and return PBTransform Instance
	// If targeted by getElementById()
	if (target instanceof Element) {
		return new PBTransform(target, options);
	}
	// Else if targeted by getElementByClassName()
	else if (target instanceof HTMLCollection) {
		// Else if target has multiple elements in it return array of instance    
		if (target.length === 1) {
			return new PBTransform(target[0], options);
		}
		// Else if target has multiple elements in it return array of instance
		else if (target.length > 1) {
			let instances = [];
			for (let i = 0; i < target.length; i++) {
				const instance = new PBTransform(target[i], options);
				instances.push(instance);
			};
			return instances;
		};
	}
	else throw TypeError('Target must be a valid HTMLCollection or Element');
};

class PBTransform {
	constructor(transformTarget, options = {}) {
		// Default options
		const defaultOptions = {
			transformTarget: transformTarget,
			hoverTarget: transformTarget,
			ignoreOthers: false,
			ignoreChildren: true,
			updateRate: 40,
			translateX: options.translate, // Just FYI these properties take a string like "0px"
			translateY: options.translate, // Just FYI these properties take a string like "0px"
			translateXReverse: options.translateReverse,
			translateYReverse: options.translateReverse,
			tiltX: options.tilt,
			tiltY: options.tilt,
			tiltXReverse: options.tiltReverse,
			tiltYReverse: options.tiltReverse,
			rotateX: options.rotate / 2 || 0,
			rotateY: options.rotate / 2 || 0,
			rotateXReverse: options.rotateReverse,
			rotateYReverse: options.rotateReverse,
			rotateStyle: 1,
			scale: undefined,
			initialTransform: {
				rotateZ: "0deg",
				rotateX: "0deg",
				rotateY: "0deg",
				translateX: "0px",
				translateY: "0px",
			},
			duration: "200ms",
			easing: "cubic-bezier(0.215, 0.61, 0.355, 1)", //aka easeOutCubic
			resetOnMouseLeave: true,
		};
		// Create options from defaultOptions and passed in custom options
		this.options = {
			...defaultOptions,
			...options,
			initialTransform: {
				...defaultOptions.initialTransform,
				...options.initialTransform,
			}
		};
		options = this.options;

		// Instance properties
		this.transformTarget = options.transformTarget;
		this.hoverTarget = options.hoverTarget;
		this.canUpdate = true;
		this.hasMoved = false;
		this.disabled = false;
		this.enterCB = options.enterCB;
		this.leaveCB = options.leaveCB;

		// Initialize PBT
		this.init();
	};

	init() {
		return document.addEventListener('mousemove', (e) => {
			if (this.disabled) return;
			if (!this.getCanUpdate()) return;
			const mouseX = e.pageX;
			const mouseY = e.pageY;
			// If hovering over hoverTarget then transform!
			if (this.isHovering(mouseX, mouseY)) {
				// Run enterCB if entering hoverTarget from a rested position				
				if (this.enterCB && this.hasMoved === false) this.enterCB();
				this.hasMoved = true;
				const offset = this.getOffset(mouseX, mouseY);
				this.transform(offset);
			}
			// Else check if transform target has moved and if it did then reset position
			else {
				if (this.hasMoved) {
					this.hasMoved = false;
					// Run leaveCB if leaving hoverTarget from a moved position
					if (this.leaveCB) this.leaveCB();
					if (this.options.resetOnMouseLeave) this.resetPosition();
				};
			};
		});
	};

	initBugged() {
		const options = this.options;
		// if ignoreOther options is true then always track mouse through all elements
		if (options.ignoreOthers) {
			return document.addEventListener('mousemove', (e) => {
				if (!this.getCanUpdate()) return;
				const mouseX = e.pageX;
				const mouseY = e.pageY;
				// If hovering over hoverTarget then transform!
				if (this.isHovering(mouseX, mouseY)) {
					const offset = this.getOffset(mouseX, mouseY);
					this.hasMoved = true;
					this.transform(offset);
				}
				// Else check if transform target has moved and if it did then reset position
				else {
					if (options.resetOnMouseLeave && this.hasMoved) {
						this.hasMoved = false;
						this.resetPosition();
					};
				};
			});
		}
		// else track using eventlistener on hoverTarget
		else {
			// if ignoreChildren was disable then only transform when hovering over parent but not it's children.
			if (!options.ignoreChildren) {
				return this.hoverTarget.addEventListener('mousemove', (e) => {
					if (!this.getCanUpdate()) return;
					if (e.target === this.hoverTarget) {
						const mouseX = e.pageX;
						const mouseY = e.pageY;
						const offset = this.getOffset(mouseX, mouseY);
						this.transform(offset);
					};
					// if resetOnMouseLeave is true then add eventListener to reset on mouse leave
					if (options.resetOnMouseLeave) {
						this.hoverTarget.addEventListener('mouseleave', () => {
							this.resetPosition();
						});
					};
				});
			}
			// TODO: Please refer to KNOWN BUGS #1
			// else track mouse only when hovering over parent ignoring children but not other elements
			else {
				return this.hoverTarget.addEventListener('mousemove', (e) => {
					if (!this.getCanUpdate()) return;
					const mouseX = e.pageX;
					const mouseY = e.pageY;
					// If hovering over hoverTarget then move it
					if (this.isHovering(mouseX, mouseY)) {
						const offset = this.getOffset(mouseX, mouseY);
						this.transform(offset);
					}
					// Else reset position if enabled
					else {
						if (options.resetOnMouseLeave) this.resetPosition();
					};
				});
			};
		};
	};

	// Helper function to get offset of mouse position relative to hoverTarget's center in percentage
	getOffset(mouseX, mouseY) {
		const hRect = this.hoverTarget.getBoundingClientRect();
		// Determine how far mouse is from middle of hoverTarget's center for X axis
		const xOffset = window.pageXOffset;
		const hXStartPosition = xOffset + hRect.left;
		const hXCenterPosition = hXStartPosition + (hRect.width / 2);
		const hXOffset = hXCenterPosition - mouseX;
		const hXOffsetPercent = hXOffset / (hRect.width / 2) * -100;
		// Determine how far mouse is from middle of hoverTarget's center for Y axis
		const yOffset = window.pageYOffset;
		const hYStartPosition = yOffset + hRect.top;
		const hYCenterPosition = hYStartPosition + (hRect.height / 2);
		const hYOffset = hYCenterPosition - mouseY;
		const hYOffsetPercent = hYOffset / (hRect.height / 2) * -100;
		// Determine how far mouse is from middle of hoverTarget's center for the hypotenuse
		const hypotenuseLength = Math.hypot(hRect.width / 2, hRect.height / 2);
		const hHOffset = Math.hypot(hXOffset, hYOffset);
		const hHOffsetPercent = hHOffset / hypotenuseLength * 100;

		return { x: hXOffsetPercent, y: hYOffsetPercent, h: hHOffsetPercent };
	};

	// Helper function to see if mouse is within hoverTarget's DOM box whatever its called  
	isHovering(mouseX, mouseY) {
		const hRect = this.hoverTarget.getBoundingClientRect();
		// Variables needed to determine if mouse if within hoverTarget's X coordinates
		const xOffset = window.pageXOffset;
		const hXStartPosition = xOffset + hRect.left;
		const hXEndPosition = hXStartPosition + hRect.width;
		const withinX = mouseX >= hXStartPosition && mouseX <= hXEndPosition
		// Variables needed to determine if mouse if within hoverTarget's Y coordinates
		const yOffset = window.pageYOffset;
		const hYStartPosition = yOffset + hRect.top;
		const hYEndPosition = hYStartPosition + hRect.height;
		const withinY = mouseY >= hYStartPosition && mouseY <= hYEndPosition

		return (withinX && withinY);
	};

	// Helper function to see if you can update based off updateRate
	getCanUpdate() {
		if (!this.canUpdate) return false;
		else {
			this.canUpdate = false;
			setTimeout(() => { this.canUpdate = true }, this.options.updateRate)
			return true;
		};
	};

	// Tranform HERE
	transform(offset) {
		// Options
		const options = this.options;
		const translateX = options.translateX;
		const translateY = options.translateY;
		const translateXReverse = options.translateXReverse;
		const translateYReverse = options.translateYReverse;
		const tiltX = options.tiltX;
		const tiltY = options.tiltY;
		const tiltXReverse = options.tiltXReverse;
		const tiltYReverse = options.tiltYReverse
		const rotateX = options.rotateX;
		const rotateY = options.rotateY;
		const rotateStyle = options.rotateStyle;
		const rotateXReverse = options.rotateXReverse;
		const rotateYReverse = options.rotateYReverse;
		const initialTransform = options.initialTransform;
		const scale = options.scale;
		const initialRotateZ = initialTransform.rotateZ;
		const initialRotateX = initialTransform.rotateX;
		const initialRotateY = initialTransform.rotateY;
		const initialTranslateX = initialTransform.translateX;
		const initialTranslateY = initialTransform.translateY;
		const duration = options.duration;
		const easing = options.easing;

		// Calculate translateCSS
		let maxTranslateXValue, translateXValue, translateXUnit, translateYValue, translateYUnit, maxTranslateYValue;
		// If maxTranslateX/maxTranslateY are 0 then don't translate. duh.		
		if (!translateX) translateXValue = 0, translateXUnit = "px";
		else {
			// Break maxTranslateX into unit and value			
			maxTranslateXValue = (typeof translateX === "number") ? translateX : parseFloat(/^([\d.]+)(\D+)$/.exec(translateX)[1]);
			translateXValue = maxTranslateXValue * (offset.x / 100);
			translateXUnit = (typeof translateX === "number") ? "px" : /^([\d.]+)(\D+)$/.exec(translateX)[2];
		};
		if (!translateY) translateYValue = 0, translateYUnit = "px";
		else {
			// Break maxTranslateY into unit and value
			maxTranslateYValue = (typeof translateY === "number") ? translateY : parseFloat(/^([\d.]+)(\D+)$/.exec(translateY)[1]);
			translateYValue = maxTranslateYValue * (offset.y / 100);
			translateYUnit = (typeof translateY === "number") ? "px" : /^([\d.]+)(\D+)$/.exec(translateY)[2];
		};

		// Calculate rotateZValue
		let rotateZValue;
		// If rotateX and rotateY isn't defined then don't rotate. duh.		
		if (rotateX || rotateY) {
			let rotateMultiplier, rotateValueX, rotateValueY, totalRotate, multiplierX, multiplierY, maxMultiplier, offsetX, offsetY;
			switch (rotateStyle) {
				case 1:
					totalRotate = rotateX + rotateY;
					multiplierX = (rotateX / totalRotate) * 200;
					multiplierY = (rotateY / totalRotate) * 200;
					maxMultiplier = multiplierX * multiplierY || multiplierX || multiplierY;
					rotateValueX = (multiplierX * offset.x) / 100 || 1;
					rotateValueY = (multiplierY * offset.y) / 100 || 1;
					rotateZValue = totalRotate * (rotateValueX * rotateValueY) / maxMultiplier;
					// If any reverse option were passed then reverse it.
					if (rotateXReverse || rotateYReverse) rotateValueZ *= -1;
					break;
				case 2:
					// If any reverse option were passed then reverse it.
					offsetY = (rotateYReverse) ? -offset.y : offset.y;
					offsetX = (rotateXReverse) ? -offset.x : offset.x;
					rotateMultiplier = (rotateX) ? (rotateY / rotateX) * ((offsetY + 100) / 200) : 0;
					rotateValueX = rotateX * (offsetX / 100);
					rotateValueY = rotateMultiplier * rotateValueX || rotateY * (offsetY / 100);
					rotateZValue = rotateValueX + rotateValueY;
					break;
				case 3:
					// If any reverse option were passed then reverse it.
					offsetY = (rotateYReverse) ? -offset.y : offset.y;
					offsetX = (rotateXReverse) ? -offset.x : offset.x;
					rotateValueX = rotateX * (offsetX / 100);
					rotateValueY = rotateY * (offsetY / 100);
					// If any reverse option were passed then reverse it.					
					rotateZValue = rotateValueX + rotateValueY;
					break;
				default: break;
			};
		};

		// Calculate rotateValueX
		let rotateXValue;
		// If tiltY and maxYRotateX are 0 then don't rotate. duh.
		if (tiltY === 0) rotateXValue = 0;
		else rotateXValue = tiltY * (offset.y / 100);

		// Calculate rotateValueY
		let rotateYValue;
		// If tiltY and maxYRotateX are 0 then don't rotate. duh.
		if (tiltX === 0) rotateYValue = 0;
		else rotateYValue = -tiltX * (offset.x / 100);

		// If any reverse option were passed then reverse it.
		if (translateXReverse) translateXValue *= -1;
		if (translateYReverse) translateYValue *= -1;
		if (tiltYReverse) rotateXValue *= -1;
		if (tiltXReverse) rotateYValue *= -1;

		// Concatenate transform value(s) and built transformCSS from them if they exist or they have an initial value set.
		const perpectiveCSS = (rotateXValue || rotateYValue) ? "perspective(1000px)" : '';
		const translateCSS = ((translateXValue || translateYValue || initialTranslateX !== "0px" || initialTranslateY !== "0px")) ? `translate(calc(${translateXValue + translateXUnit} + ${initialTranslateX}), calc(${translateYValue + translateYUnit} + ${initialTranslateY}))` : '';
		const rotateXCSS = (rotateXValue || initialRotateX !== "0deg") ? `rotateX(calc(${rotateXValue || 0}deg + ${initialRotateX}))` : '';
		const rotateYCSS = (rotateYValue || initialRotateY !== "0deg") ? `rotateY(calc(${rotateYValue || 0}deg + ${initialRotateY}))` : '';
		const rotateZCSS = (rotateZValue || initialRotateZ !== "0deg") ? `rotateZ(calc(${rotateZValue || 0}deg + ${initialRotateZ}))` : '';
		const scaleCSS = (scale) ? `scale(${scale})` : '';
		const transformCSS = `${perpectiveCSS} ${translateCSS} ${scaleCSS} ${rotateZCSS} ${rotateXCSS} ${rotateYCSS}`.trim();
		// Set transform target's CSS
		this.transformTarget.style.transitionDuration = duration;
		this.transformTarget.style.transitionTimingFunction = easing;
		this.transformTarget.style.webkitTransform = transformCSS;
		this.transformTarget.style.MozTransform = transformCSS;
		this.transformTarget.style.msTransform = transformCSS;
		this.transformTarget.style.OTransform = transformCSS;
		this.transformTarget.style.transform = transformCSS;
	};

	// Function to reset position of transform target
	resetPosition() {
		this.transformTarget.style.transform = (this.options.tiltX || this.options.tiltY) ? 'perspective(1000px)' : '';
	};

	// Functions to toggle transition effects on/off
	disable() { this.disabled = true; };
	enable() { this.disabled = false; };
	toggle() {
		if (this.disabled) this.disabled = false;
		else this.disabled = true
	}
};