// Initialize and Returns pBTransform Instance
function pBTransform(target, options) {
  // TODO: Incorporate jQuery targeting

  // Check if target if Native DOM element and return pBTransform Instance
  // If targeted by getElementById()
  if (target instanceof Element) {
    console.log('getElementById')
    return new PBTransform(target, options);
  }
  // Else if targeted by getElementByClassName()
  else if (target instanceof HTMLCollection) {
    // Else if target has multiple elements in it return array of instance    
    if (target.length === 1) {
      console.log('ByClassName single');
      return new PBTransform(target[0], options);
    }
    // Else if target has multiple elements in it return array of instance
    else if (target.length > 1) {
      console.log('ByClassName multiple');
    };
  }
  else throw TypeError('Target must be a HTMLCollection or Element');
};

class PBTransform {
  constructor(transformTarget, options) {
    // Default options
    const defaultOptions = {
      transformTarget: transformTarget,
      hoverTarget: transformTarget,
      ignoreOthers: false,
      ignoreChildren: true,
    };
    // Create options from defaultOptions and passed in custom options
    this.options = {
      ...defaultOptions,
      ...options
    };
    options = this.options;

    // Instance properties
    this.transformTarget = options.transformTarget;
    this.hoverTarget = options.hoverTarget;

    // Initialize PBT
    this.init();
  };

  init() {    
    const options = this.options;
    // if ignoreOther options always track mouse through all elements
    if (options.ignoreOthers) {
      return document.addEventListener('mousemove', (e) => {
		// Get mouse position relative to page
		const mouseX = e.pageX;
        const mouseY = e.pageY;                
		// If hovering over hoverTarget then transform!
		if (this.isHovering(mouseX, mouseY)) {
			const offset = this.getOffset(mouseX, mouseY);
			this.transform(offset);
		};		
		
      });
    };
    // if ignoreChildren was disable then only transform when hovering over parent but not it's children.
    if (!options.ignoreChildren) {
      return this.hoverTarget.addEventListener('mousemove', (e) => {
        if (e.target === this.hoverTarget) this.transform(e);
      });
    };
    // else track mouse only when hovering over parent ignoring children but not other elements
    return this.hoverTarget.addEventListener('mousemove', (e) => {
      this.transform(e);
    });
  };
  
  // Helper function to get offset of mouse position relative to hoverTarget's center in percentage
  getOffset(mouseX, mouseY) {	
	const hRect = this.hoverTarget.getBoundingClientRect();
	// Variables needed to determine if mouse if within hoverTarget's X coordinates
	const xOffset = window.pageXOffset;
	const hXStartPosition = xOffset + hRect.left;
	// Variables needed to determine if mouse if within hoverTarget's Y coordinates
	const yOffset = window.pageYOffset;		
	const hYStartPosition = yOffset + hRect.top;
	// Variables needed to determine how far mouse is from middle of hoverTarget's center
	const hXCenterPosition = hXStartPosition + (hRect.width/2);
	const hXOffset = hXCenterPosition - mouseX;
	const hXOffsetPercent = hXOffset / (hRect.width/2) * -100;		
	const hYCenterPosition = hYStartPosition + (hRect.height/2);
	const hYOffset = hYCenterPosition - mouseY;
	const hYOffsetPercent = hYOffset / (hRect.height/2) * -100;	
	
	return {x:hXOffsetPercent, y:hYOffsetPercent};
  }
  
  // Helper Function to see if mouse is within hoverTarget's DOM box whatever its called  
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
	
	return (withinX && withinY)		
  }

  transform(e) {
    console.log('transforming!');
  };

}