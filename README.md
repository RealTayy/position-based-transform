# Position Based Transform
Dependency free library for CSS transform effects based on mouse position.

## Demos & Documentation
Demo sites coming soon.

[Options & Targeting Demo](https://codepen.io/maiCoding/pen/ebEzWM)

Documentation site coming soon. For now refer to the [**Documentation**](https://github.com/RealTayy/position-based-transform#documentation) section below.

## Getting Started
Currently the only way to use Position Based Transform is to manually [download](https://github.com/RealTayy/position-based-transform/files/2711593/position-based-transform-1.1.0.zip) and link `positionBasedTransform.min.js` in your HTML
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

While Slice Revealer is dependency free and does not rely on jQuery you can still pass in jQuery objects as targets.
```javascript
// This works too!
const target = $(someJQuerySelector)[0];
```

#### Options (Optional)

## Methods 
All methods are called on the instance that is created when initializing
```javascript
const target = document.getElementById('pbt-target');
const instance = pBTransform(transformTarget, options);
```

### **.disable(boolean)**
```javascript
instance.disable(boolean);
```
Calling `.disable()` will prevent any 

## Misc
### License
Position Based Transform is an open source software under the [MIT license](https://github.com/RealTayy/slice-revealer/blob/master/LICENSE.md)
### Credit/Shameless Plug
Interested in who made this? Come visit my portfolio at [MaiCoding](https://www.maiCoding.me)

Want more sick and easy to use animations? Come over to [AnimationZone](https://realtayy.github.io/animation-zone/)