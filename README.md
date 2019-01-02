# Position Based Transform
Dependency free library for CSS transform effects based on mouse position.

## Demos & Documentation
Demo sites coming soon.

[Options & Targeting Demo](https://codepen.io/maiCoding/pen/ebEzWM)

Documentation site coming soon. For now refer to the [**Documentation**](https://github.com/RealTayy/position-based-transform#documentation) section below.

## Getting Started
Currently the only way to use Position Based Transform is to manually [download](https://github.com/RealTayy/position-based-transform/files/2720259/position-based-transform-v1.2.0.zip) and link `positionBasedTransform.min.js` in your HTML
```html
<body>
	<!-- Your HTML body stuff goes here --->
	<script src="./positionBasedTransform.min.js"></script>	
	<!-- Link your JavaScript file that uses sliceRevealer here --->
</body>
```

## How to use
For a basic example head over to this [CodePen](https://codepen.io/maiCoding/pen/XogZPz)
### Basic Initialization/Usage
Create a DOM element and make it targetable by giving it a class or id.
```html
<div id="pbt-target"></div>
```

Then in your javascript file target the DOM element and create an `options` object. Pass both into `pbTransform()`
```javascript
const target = document.getElementById("pbt-target");
const options = {
	// Options go here... for example a translate!
	translate: 50
}
pBTransform(target, options);
```

And that's it! For more in-depth information on customizing your Position Based Transform refer to the [**options**](https://github.com/RealTayy/position-based-transform#options-optional) section below.

# Documentation
## Initialization
For a quick demo on intializing, targeting, and setting options head to this [CodePen](https://codepen.io/maiCoding/pen/ebEzWM)

### Creating an instance
All `PBTransform()` instances are created through the `pBTransform()` function which takes two arguments.
```javascript
const target = document.getElementById('pbt-target');
pBTransform(transformTarget, options);
```

### pBTransform(transformTarget, option)
Creates and returns an instance of `PBTransform()`
```javascript
const target = document.getElementById("pbt-target");
const instance = pBTransform(transformTarget, options);
```

#### Targeting - transformTarget
When passing a target to `pBTransform()` you can use both `getElementById()` or `getElementsByClassName()`.
```javascript
// Both of these work!
const target = document.getElementById("targetID");
const target = document.getElementsByClassName("targetClassName")[0];
```

While Position Based Transform is dependency free and does not rely on jQuery you can still pass in jQuery objects as targets.
```javascript
// This works too!
const target = $(someJQuerySelector);
```

#### Options (Optional)
| Name              | Type                            | Example                                            | Description                                                                                                                                                                                       |
|-------------------|---------------------------------|----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| hoverTarget       | DOM Element                     | [CodePen](https://codepen.io/maiCoding/pen/XoaQKG) | Sets which DOM Element the event listener will be created on the detect   the mouse position for the animation. If not defined then sets the   `transformTarget` to be the `hoverTarget` as well. |
| updateRate        | Number (milliseconds)           | [CodePen](https://codepen.io/maiCoding/pen/MZEMqv) | Sets minimum delay between animations on the transformTarget. Default is   40.                                                                                                                    |
| translate         | Number (pixels) \| String       | [CodePen](https://codepen.io/maiCoding/pen/ZVaLOp) | The maximum amount the transformTarget can be translated. If you  want to affect only one axis then use   `translateX` or `translateY` instead. If passing in a number it defaults to   pixels.   |
| translateReverse  | Boolean                         | [CodePen](https://codepen.io/maiCoding/pen/ZVaLOp) | If true then direction the transformTarget translates is reversed. If you   want ot affect only one axis then use `translateXReverse` or   `translateYReverse`.                                   |
| tilt              | Number (degrees)                | [CodePen](https://codepen.io/maiCoding/pen/aPVQmw) | The maximum amount the transformTarget can be tilted (equilavent to   RotateX/RotateY). If you  want to   affect only one axis then use `tiltX` or `tiltY` instead.                               |
| tiltReverse       | Boolean                         | [CodePen](https://codepen.io/maiCoding/pen/aPVQmw) | If true then direction the transformTarget tilts is reversed. If you want   to affect only one axis then use `tiltXReverse` or `tiltYReverse`.                                                    |
| rotate            | Number (degrees)                | [CodePen]()                                        | The maximum amount the transformTarget can be rotated (equilavent to   RotateZ). If you  want to affect only   one axis then use `tiltX` or `tiltY` instead.                                      |
| rotateReverse     | Boolean                         | [CodePen]()                                        | If true then direction the transformTarget rotates is reversed. If you   want to affect only one axis then use `rotateXReverse` or `rotateYReverse`.                                              |
| rotateStyle       | Number (1\|2\|3)                | [CodePen]()                                        | Accepts either 1, 2, or 3. Sets a different way the rotatation is   calculated depending on mouse position. Please see example for details.                                                       |
| scale             | Number (float)                  | [CodePen]()                                        | Hovering over hoverTarget scales to this value. 1 = 100%                                                                                                                                          |
| initialTransform  | Object                          | [CodePen]()                                        | Sets initial transform properties in case your element already has some   transform properties on it or you want it to start at a different position.                                             |
| duration          | Number (milliseconds) \| String | [CodePen]()                                        | How many milliseconds/seconds it takes for a transform transition to   complete. Default is 200ms                                                                                                 |
| easing            | String                          | [CodePen]()                                        | Specifies the speed curve of the transition effect. Default is   "cubic-bezier(0.215, 0.61, 0.355, 1)".                                                                                           |
| resetOnMouseLeave | Boolean                         | [CodePen]()                                        | If true, then when mouse leaves hoverTarget then it resets position of   transformTarget.                                                                                                         |
| onEnter           | Function                        | [CodePen]()                                        | Callback function that fires when mouse enters hoverTarget.                                                                                                                                       |
| onLeave           | Function                        | [CodePen]()                                        | Callback function that fires when mouse leaves hoverTarget.                                                                                                                                       |
| onChange          | Function                        | [CodePen]()                                        | Callback function that fires when mouse moves inside of hoverTarget and a   new transition is fired.                                                                                              |

## Methods 
All methods are called on the instance that is created when initializing
```javascript
const target = document.getElementById('pbt-target');
const instance = pBTransform(transformTarget, options);
```

### **.resetPosition()**
```javascript
instance.resetPosition();
```
Calling `.resetPosition()` will reset the transformTarget to it's initial position by taking off any transform values.

### **.disable()**
```javascript
instance.disable();
```
Calling `.disable()` will prevent any transition effect from taking place.

### **.enable()**
```javascript
instance.enable();
```
Calling `.enable()` will renable any transition effect.

### **.toggle()**
```javascript
instance.toggle();
```
Calling `.toggle()` will switch between disabled and enabled state.

## Misc
### License
Position Based Transform is an open source software under the [MIT license](https://github.com/RealTayy/slice-revealer/blob/master/LICENSE.md)
### Credit/Shameless Plug
Interested in who made this? Come visit my portfolio at [MaiCoding](https://www.maiCoding.me)

Want more sick and easy to use animations? Come over to [AnimationZone](https://realtayy.github.io/animation-zone/)