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
  }
});
module.exports = TextFieldComponent;
