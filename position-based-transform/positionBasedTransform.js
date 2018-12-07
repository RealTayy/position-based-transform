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
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        // console.log(mouseX, mouseY);
        const hoverTRect = this.hoverTarget.getBoundingClientRect();
        console.log(hoverTRect);
        // this.transform(e);
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

  transform(e) {
    console.log('transforming!');
  };

}