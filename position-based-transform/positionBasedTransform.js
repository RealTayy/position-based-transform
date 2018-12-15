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
	}

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
			maxXOffset: "2.5%",
			maxYOffset: "2.5%",
			maxXRotateX: 5,
			maxYRotateX: 5,
			maxXRotateY: 5,
			maxYRotateY: 5,
			maxXRotateZ: 2.5,
			maxYRotateZ: 2.5,
			rotateStyle: 1,
			scale: 1.05,
			initialTransform: {
				rotate: "0deg",
				translateX: "0px",
				translateY: "0px",
			},
			duration: "700ms",
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
					}
				};
			});
		}
		// else track using eventlistener on hoverTarget
		else {
			// if resetOnMouseLeave is true then add eventListener to reset on mouse leave
			if (options.resetOnMouseLeave) {
				this.hoverTarget.addEventListener('mouseleave', () => {
					this.resetPosition();
				});
			};
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
				});
			};
			// else track mouse only when hovering over parent ignoring children but not other elements
			return this.hoverTarget.addEventListener('mousemove', (e) => {
				if (!this.getCanUpdate()) return;

				const mouseX = e.pageX;
				const mouseY = e.pageY;
				const offset = this.getOffset(mouseX, mouseY);
				this.transform(offset);
			});
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
		const maxXOffset = options.maxXOffset;
		const maxYOffset = options.maxYOffset;
		const disableRotate = options.disableRotate;
		const maxXRotateZ = options.maxXRotateZ;
		const maxYRotateZ = options.maxYRotateZ;
		const rotateStyle = options.rotateStyle;
		const duration = options.duration;
		const easing = options.easing;
		const initialTransform = options.initialTransform;
		const initialRotate = initialTransform.rotate;
		const initialTranslateX = initialTransform.translateX;
		const initialTranslateY = initialTransform.translateY;
		const scale = options.scale;

		// Break maxXOffset into unit and value to calculate translateValue
		const maxXOffsetValue = parseFloat(/^([\d.]+)(\D+)$/.exec(maxXOffset)[1]);
		const xOffsetValue = maxXOffsetValue * (offset.x / 100);
		const xOffsetUnit = /^([\d.]+)(\D+)$/.exec(maxXOffset)[2];

		// Break maxYOffset into unit and value to calculate translateValue
		const maxYOffsetValue = parseFloat(/^([\d.]+)(\D+)$/.exec(maxYOffset)[1]);
		const yOffsetValue = maxYOffsetValue * (offset.y / 100);
		const yOffsetUnit = /^([\d.]+)(\D+)$/.exec(maxYOffset)[2];

		// Calculate rotateValue for different options
		let rotateValue, rotateMultiplier, xRotateValue, yRotateValue, totalRotate, xMultiplier, yMultiplier, maxMultiplier

		// If disableRotate is true or maxRotate are 0 then don't rotate. duh.
		if (disableRotate || (maxXRotateZ === 0 && maxYRotateZ === 0)) rotateValue = 0;
		else {
			switch (rotateStyle) {
				case 1:
					totalRotate = maxXRotateZ + maxYRotateZ;
					xMultiplier = (maxXRotateZ / totalRotate) * 200;
					yMultiplier = (maxYRotateZ / totalRotate) * 200;
					maxMultiplier = xMultiplier * yMultiplier || xMultiplier || yMultiplier;
					xRotateValue = (xMultiplier * offset.x) / 100 || 1;
					yRotateValue = (yMultiplier * offset.y) / 100 || 1;
					rotateValue = totalRotate * (xRotateValue * yRotateValue) / maxMultiplier;
					break;
				case 2:
					totalRotate = maxXRotateZ + maxYRotateZ;
					xMultiplier = (maxXRotateZ / totalRotate) * 200;
					yMultiplier = (maxYRotateZ / totalRotate) * 200;
					maxMultiplier = xMultiplier * yMultiplier || xMultiplier || yMultiplier;;
					xRotateValue = (xMultiplier * offset.x) / 100 || 1;
					yRotateValue = (yMultiplier * offset.y) / 100 || 1;
					rotateValue = -totalRotate * (xRotateValue * yRotateValue) / maxMultiplier;
					break;
				case 3:
					rotateMultiplier = (maxXRotateZ) ? (maxYRotateZ / maxXRotateZ) * ((offset.y + 100) / 200) : 0;
					xRotateValue = maxXRotateZ * (offset.x / 100);
					yRotateValue = rotateMultiplier * xRotateValue || maxYRotateZ * (offset.y / 100);
					rotateValue = xRotateValue + yRotateValue;
					break;
				case 4:
					xRotateValue = maxXRotateZ * (offset.x / 100);
					yRotateValue = maxYRotateZ * (offset.y / 100);
					rotateValue = xRotateValue + yRotateValue;
					break;
			}
		}

		// Concatenate transform value(s) and apply it to transformCSS
		const perpectiveCSS = "perspective(300px)";
		const translateCSS = `translate(calc(${xOffsetValue + xOffsetUnit} + ${initialTranslateX}), calc(${yOffsetValue + yOffsetUnit} + ${initialTranslateY}))`;
		const rotateZCSS = `rotateZ(calc(${rotateValue}deg + ${initialRotate}))`;
		const scaleCSS = `scale(${scale})`
		const transformCSS = `${perpectiveCSS} ${translateCSS} ${scaleCSS} ${rotateZCSS}`;
		// console.log(transformCSS);
		this.transformTarget.style.webkitTransform = transformCSS;
		this.transformTarget.style.MozTransform = transformCSS;
		this.transformTarget.style.msTransform = transformCSS;
		this.transformTarget.style.OTransform = transformCSS;
		this.transformTarget.style.transform = transformCSS;
		this.transformTarget.style.transitionDuration = duration;
		this.transformTarget.style.transitionTimingFunction = easing;
	};

	// Function to reset position of transform target
	resetPosition() {
		this.transformTarget.style.transform = 'perspective(300px)';
	};
}
