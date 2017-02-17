var reflectMetadata = require("reflect-metadata");
var rxjsMap = require("rxjs/add/operator/map");
var ng = {
  core:   require("@angular/core"),
  http:   require("@angular/http"),
  router: require("@angular/router")
};

var CustomerDetailsComponent = ng.core.Component({
  selector: "shine-customer-details",
  template: require("./CustomerDetailsComponent.html")
}).Class({
  constructor: [
    ng.router.ActivatedRoute,
    ng.http.Http,
    function(activatedRoute, http) {
      this.activatedRoute = activatedRoute;
      this.http           = http;
      this.customer       = null;
    }
  ],
  ngOnInit: function() {
    var self = this;
    var observableFailed = function(response) {
      window.alert(response);
    };
    var customerGetSuccess = function(response) {
      self.customer = response.json().customer;
    };
    var routeSuccess = function(params) {
      var observable = self.http.get(
        "/customers/" + params['id'] + '.json'
      );

      var mappedObservable = observable.map(parseCustomer);

      mappedObservable.subscribe(
        function(customer) { self.customer = customer; },
        observableFailed
      );
    };

    var parseCustomer = function(response) {
      var customer = response.json().customer;
      customer.billing_address = {
        street: customer.billing_street,
        city: customer.billing_city,
        state: customer.billing_state,
        zipcode: customer.billing_zipcode
      };
      customer.shipping_address = {
        street: customer.shipping_street,
        city: customer.shipping_city,
        state: customer.shipping_state,
        zipcode: customer.shipping_zipcode
      };
      return customer;
    };

    self.activatedRoute.params.subscribe(routeSuccess, observableFailed);
  },
  
  saveCustomer: function(update) {
    this.saveCustomerField(update.field_name, update.value);
  },
  saveShippingAddress: function(update) {
    this.saveCustomerField("shipping_" + update.field_name,
                           update.value);
  },
  saveBillingAddress: function(update) {
    this.saveCustomerField("billing_" + update.field_name,
                           update.value);
  },
  saveCustomerField: function(field_name, value) {
    var update = {};
    update[field_name] = value;
    this.http.patch(
      "/customers/" + this.customer.customer_id + ".json",
      update
    ).subscribe(
      function() {},
      function(response) {
        window.alert(response);
      }
    );
  }
});

module.exports = CustomerDetailsComponent;
