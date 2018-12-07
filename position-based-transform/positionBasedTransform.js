// Initialize and Returns SliceRevealer Instance
function pbTransform(target, options) {  
  // Check if target if Native DOM element and return SliceRevealer Instance
  // If targeted by getElementById()
  if (target instanceof Element) return console.log('getElementById')
  // Else if targeted by getElementByClassName()
  else if (target instanceof HTMLCollection) {
    // Else if target has multiple elements in it return array of instance    
    if (target.length === 1) {
      console.log('ByClassName single');
    }
    // Else if target has multiple elements in it return array of instance
    else if (target.length > 1) {
      console.log('ByClassName multiple');
    }
  }
  else throw TypeError('Target must be a HTMLCollection or Element');
}