var reflectMetadata = require("reflect-metadata");
var ng = {
  core:     require("@angular/core")
};

var CustomerInfoComponent = ng.core.Component({
  selector: "shine-customer-info",
  template: require("./CustomerInfoComponent.html"),
  inputs: [
    "customer"
  ],
  outputs: [
    "customerInfoChanged"
  ]
}).Class({
  constructor: [
    function() {
      this.customer = null;
      this.customerInfoChanged = new ng.core.EventEmitter();
    }
  ],
  save: function(update) {
    this.customerInfoChanged.emit(update);
  }
});
module.exports = CustomerInfoComponent;
