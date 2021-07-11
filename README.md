# svelte-simple-fileuploader

[![npm version](https://badge.fury.io/js/svelte-simple-fileuploader.svg)](https://badge.fury.io/js/svelte-simple-fileuploader)


A very simple Svelte fileuploader Action to put on HTML elements

![Example](https://github.com/nordquist/svelte-simple-fileuploader/blob/master/fileupload_01.gif?raw=true)

## Usage
```javascript
import fileuploader from 'svelte-simple-fileuploader';

use:fileUploader={options}
```

**options**

* enabled - Whether or not to enable component fileupload \<optional\>
* dropEnabled - Whether or not to allow drop \<optional\>
* allowedFileTypes - Allowed file endings (including dot) \<optional\>
* imageCover - Whether or not to have images as background of area when file uploaded \<optional\>
* implicitStyling - Title of the fileuploader \<optional\>
* borderStyle - Border style of the drop area on hover \<optional\>


______________________________________


*Example options*
```
options =  {
	allowedFileTypes: '.png,.jpg,.jpeg,.pdf', //allowed file types with .
	imageCover: true, //if the image should be used as background on the node
	implicitStyling: true, //if the border and other style should be implicitly applied on hover
	borderStyle: '1px blue dotted' //explicit border style applied if implicitStyling is false
}
```

*Example usage*
```html
<section id="hero-section"
	use:fileUploader={{
		allowedFileTypes: '.png,.jpg,.jpeg,.pdf',
		imageCover: true
	}}
	on:filesUploaded={handleUploadedFiles}
>
</section>
```


## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.