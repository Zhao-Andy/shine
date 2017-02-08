var reflectMetadata = require("reflect-metadata");
var ng = {
  core:     require("@angular/core")
};

var CreditCardComponent = ng.core.Component({
  selector: "shine-credit-card",
  template: require("./CreditCardComponent.html")
}).Class({
  constructor: [
    function() {
    }
  ]
});
module.exports = CreditCardComponent;
