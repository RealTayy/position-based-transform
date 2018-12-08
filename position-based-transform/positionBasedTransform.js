// Initialize and Returns pBTransform Instance
function pBTransform(target, options) {
  // TODO: Incorporate jQuery targeting

  // Check if target if Native DOM element and return pBTransform Instance
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
      let instances = []
	  for (let i = 0; i < target.length; i++) {
		const instance = new PBTransform(target[i], options);
		instances.push(instance);
	  }
	  return instances;
    };
  }
  else throw TypeError('Target must be a valid HTMLCollection or Element');
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
        if (e.target === this.hoverTarget) {
		  const mouseX = e.pageX;
		  const mouseY = e.pageY;                
		  const offset = this.getOffset(mouseX, mouseY);
		  this.transform(offset)
	    };
      });
    };
    // else track mouse only when hovering over parent ignoring children but not other elements
    return this.hoverTarget.addEventListener('mousemove', (e) => {
	  const mouseX = e.pageX;
	  const mouseY = e.pageY;                
	  const offset = this.getOffset(mouseX, mouseY);
      this.transform(offset);
    });
  };
  
  // Helper function to get offset of mouse position relative to hoverTarget's center in percentage
  getOffset(mouseX, mouseY) {	
	const hRect = this.hoverTarget.getBoundingClientRect();
	// Determine how far mouse is from middle of hoverTarget's center for X axis
	const xOffset = window.pageXOffset;
	const hXStartPosition = xOffset + hRect.left;
	const hXCenterPosition = hXStartPosition + (hRect.width/2);
	const hXOffset = hXCenterPosition - mouseX;
	const hXOffsetPercent = hXOffset / (hRect.width/2) * -100;		
	// Determine how far mouse is from middle of hoverTarget's center for Y axis
	const yOffset = window.pageYOffset;		
	const hYStartPosition = yOffset + hRect.top;	
	const hYCenterPosition = hYStartPosition + (hRect.height/2);
	const hYOffset = hYCenterPosition - mouseY;
	const hYOffsetPercent = hYOffset / (hRect.height/2) * -100;	
	// Determine how far mouse is from middle of hoverTarget's center for the hypotenuse
	const hypotenuseLength = Math.hypot(hRect.width/2, hRect.height/2);
	const hHOffset = Math.hypot(hXOffset, hYOffset);
	const hHOffsetPercent = hHOffset / hypotenuseLength * 100
	
	console.log(hHOffsetPercent);
	
	return {x:hXOffsetPercent, y:hYOffsetPercent, h:hypotenuseLength};
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

  // Tranform HERE
  transform(offset) {	  
//    console.log(offset);
  };

}