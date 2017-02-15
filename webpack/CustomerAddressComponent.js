var reflectMetadata = require("reflect-metadata");
var ng = {
  core:     require("@angular/core")
};

var CustomerAddressComponent = ng.core.Component({
  selector: "shine-customer-address",
  template: require("./CustomerAddressComponent.html"),
  inputs: [
    "type",
    "address"
  ],
  outputs: [
    "addressChanged"
  ]
}).Class({
  constructor: [
    function() {
      this.type       = null;
      this.address    = null;
      this.addressChanged = new ng.core.EventEmitter();
    }
  ],
  save: function(update) {
    this.addressChanged.emit(update);
  }
});
module.exports = CustomerAddressComponent;
