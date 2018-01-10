import isNil from 'lodash/isNil';

class Option {
  constructor(value, displayText) {
    this._value = value;
    this._displayText = displayText;
  }

  get value() {
    return this._value;
  }

  set value(aValue) {
    this._value = aValue;
  }

  set displayText(someText) {
    this._displayText = someText;
  }

  get displayText() {
    if (isNil(this._displayText)) {
      return this.value;
    }
    
    return this._displayText;
  }
}

export default Option;
