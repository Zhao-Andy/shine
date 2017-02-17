var reflectMetadata = require("reflect-metadata");
var ng = {
  core: require("@angular/core"),
};
var TextFieldComponent = ng.core.Component({
  selector: "shine-text-field",
  template: require("./TextFieldComponent.html"),
  inputs: [
    "object",
    "field_name",
    "label",
    "addon",
    "pattern",
    "compact"
  ],
  outputs: [
    "valueChanged"
  ]
}).Class({
  constructor: [
    function() {
      this.object     = null;
      this.field_name = null;
      this.label      = null;
      this.addon      = null;
      this.pattern    = null;
      this.compact    = false;
      this.valueChanged = new ng.core.EventEmitter();
    }
  ],
  modelValid: function(model) {
    return !(model.invalid && model.dirty);
  },
  validationPattern: function() {
    if (this.pattern) {
      return this.pattern;
    }
    else {
      return "^.*$";
    }
  },
  ngOnInit: function() {
    if (this.object && this.field_name) {
      this.originalValue = this.object[this.field_name];
    }
    else {
      this.originalValue = null;
    }
  },
  blur: function(model) {
    if (this.modelValid(model)) {
      if (this.originalValue != model.value) {
        this.valueChanged.emit({
          field_name: this.field_name,
          value: model.value
        });
        this.originalValue = model.value;
      }
    }
  }
});
module.exports = TextFieldComponent;
