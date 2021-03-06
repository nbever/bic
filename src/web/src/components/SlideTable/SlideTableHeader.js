class SlideTableHeader {

  constructor(displayText, width, key, transform = (t) => t, sortByValue = true) {
    this.display = displayText;
    this.width = width;
    this.key = key;
    this.transform = transform;
    this.sortByValue = sortByValue;
  }

  set sortByValue(shouldI) {
    this._sortByValue = shouldI;
  }

  get sortByValue() {
    return this._sortByValue;
  }

  set transform(aTransform) {
    this._transform = aTransform;
  }

  get transform() {
    return this._transform;
  }

  set display(someText) {
    this._display = someText;
  }

  get display() {
    return this._display;
  }

  set width(aWidth) {
    this._width = aWidth;
  }

  get width() {
    return this._width;
  }

  set key(aKey) {
    this._key = aKey;
  }

  get key() {
    return this._key;
  }
}

export default SlideTableHeader;
