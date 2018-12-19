// Initialize and Returns pBTransform Instance
function pBTransform(target, options) {
	// Check if target is jQuery object and return PBTransform Instance
	try {
		if (target instanceof jQuery) {
			console.log('its jQuery!');
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
			maxTranslateX: options.maxTranslate, // Just FYI these properties take a string like "0px"
			maxTranslateY: options.maxTranslate, // Just FYI these properties take a string like "0px"
			maxTiltX: options.maxTilt,
			maxTiltY: options.maxTilt,
			maxRotateX: options.maxRotate / 2,
			maxRotateY: options.maxRotate / 2,
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

		// Initialize PBT
		this.init();
	};

	init() {
		const options = this.options;
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
		const maxTranslateX = options.maxTranslateX;
		const maxTranslateY = options.maxTranslateY;
		const maxRotateX = options.maxRotateX;
		const maxRotateY = options.maxRotateY;
		const maxTiltY = options.maxTiltY;
		const maxTiltX = options.maxTiltX;
		const rotateStyle = options.rotateStyle;
		const duration = options.duration;
		const easing = options.easing;
		const initialTransform = options.initialTransform;
		const initialRotateZ = initialTransform.rotateZ;
		const initialRotateX = initialTransform.rotateX;
		const initialRotateY = initialTransform.rotateY;
		const initialTranslateX = initialTransform.translateX;
		const initialTranslateY = initialTransform.translateY;
		const scale = options.scale;

		// Calculate translateCSS
		let maxTranslateXValue, translateXValue, translateXUnit, translateYValue, translateYUnit, maxTranslateYValue;
		// If maxTranslateX/maxTranslateY are 0 then don't translate. duh.		
		if (!maxTranslateX) translateXValue = 0, translateXUnit = "px";
		else {
			// Break maxTranslateX into unit and value			
			maxTranslateXValue = parseFloat(/^([\d.]+)(\D+)$/.exec(maxTranslateX)[1]);
			translateXValue = maxTranslateXValue * (offset.x / 100);
			translateXUnit = /^([\d.]+)(\D+)$/.exec(maxTranslateX)[2];
		};
		if (!maxTranslateY) translateYValue = 0, translateYUnit = "px";
		else {
			// Break maxTranslateY into unit and value
			maxTranslateYValue = parseFloat(/^([\d.]+)(\D+)$/.exec(maxTranslateY)[1]);
			translateYValue = maxTranslateYValue * (offset.y / 100);
			translateYUnit = /^([\d.]+)(\D+)$/.exec(maxTranslateY)[2];
		};

		// Calculate rotateZValue
		let rotateZValue;
		// If maxRotateX and maxRotateY are 0 then don't rotate. duh.
		if (maxRotateX === 0 && maxRotateY === 0) rotateZValue = 0;
		else {
			let rotateMultiplier, rotateValueX, rotateValueY, totalRotate, multiplierX, multiplierY, maxMultiplier;
			switch (rotateStyle) {
				case 1:
					totalRotate = maxRotateX + maxRotateY;
					multiplierX = (maxRotateX / totalRotate) * 200;
					multiplierY = (maxRotateY / totalRotate) * 200;
					maxMultiplier = multiplierX * multiplierY || multiplierX || multiplierY;
					rotateValueX = (multiplierX * offset.x) / 100 || 1;
					rotateValueY = (multiplierY * offset.y) / 100 || 1;
					rotateZValue = totalRotate * (rotateValueX * rotateValueY) / maxMultiplier;
					break;
				case 2:
					totalRotate = maxRotateX + maxRotateY;
					multiplierX = (maxRotateX / totalRotate) * 200;
					multiplierY = (maxRotateY / totalRotate) * 200;
					maxMultiplier = multiplierX * multiplierY || multiplierX || multiplierY;;
					rotateValueX = (multiplierX * offset.x) / 100 || 1;
					rotateValueY = (multiplierY * offset.y) / 100 || 1;
					rotateZValue = -totalRotate * (rotateValueX * rotateValueY) / maxMultiplier;
					break;
				case 3:
					rotateMultiplier = (maxRotateX) ? (maxRotateY / maxRotateX) * ((offset.y + 100) / 200) : 0;
					rotateValueX = maxRotateX * (offset.x / 100);
					rotateValueY = rotateMultiplier * rotateValueX || maxRotateY * (offset.y / 100);
					rotateZValue = rotateValueX + rotateValueY;
					break;
				case 4:
					rotateValueX = maxRotateX * (offset.x / 100);
					rotateValueY = maxRotateY * (offset.y / 100);
					rotateZValue = rotateValueX + rotateValueY;
					break;
				default: break;
			};
		};

		// Calculate rotateValueX
		let rotateXValue;
		// If maxTiltY and maxYRotateX are 0 then don't rotate. duh.
		if (maxTiltY === 0) rotateXValue = 0;
		else rotateXValue = maxTiltY * (offset.y / 100);

		// Calculate rotateValueY
		let rotateYValue;
		// If maxTiltY and maxYRotateX are 0 then don't rotate. duh.
		if (maxTiltX === 0) rotateYValue = 0;
		else rotateYValue = -maxTiltX * (offset.x / 100);

		// Concatenate transform value(s) and built transformCSS from them
		const perpectiveCSS = "perspective(300px)";
		const translateCSS = (translateXValue || translateYValue) ? `translate(calc(${translateXValue + translateXUnit} + ${initialTranslateX}), calc(${translateYValue + translateYUnit} + ${initialTranslateY}))` : '';
		const rotateXCSS = (rotateXValue) ? `rotateX(calc(${rotateXValue}deg + ${initialRotateX}))` : '';
		const rotateYCSS = (rotateYValue) ? `rotateY(calc(${rotateYValue}deg + ${initialRotateY}))` : '';
		const rotateZCSS = (rotateZValue) ? `rotateZ(calc(${rotateZValue}deg + ${initialRotateZ}))` : '';
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
		this.transformTarget.style.transform = (options.maxTiltX || options.maxTiltY) ? 'perspective(300px)' : '';		
	};
};

