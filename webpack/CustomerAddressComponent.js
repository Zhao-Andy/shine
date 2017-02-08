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
  ]
}).Class({
  constructor: [
    function() {
      this.type       = null;
      this.address    = null;
    }
  ]
});
module.exports = CustomerAddressComponent;
