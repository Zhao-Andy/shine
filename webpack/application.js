require ("application.css");
require ("bootstrap/dist/css/bootstrap.css");
var coreJS              = require('core-js');
var zoneJS              = require('zone.js');
var reflectMetadata     = require('reflect-metadata');
var ng                  = {
  core:                   require("@angular/core"),
  common:                 require("@angular/common"),
  compiler:               require("@angular/compiler"),
  forms:                  require("@angular/forms"),
  platformBrowser:        require("@angular/platform-browser"),
  platformBrowserDynamic: require("@angular/platform-browser-dynamic"),
  router:                 require("@angular/router"),
  http:                   require("@angular/http")
};

var CustomerAppComponent = require("./CustomerAppComponent");
var CustomerSearchComponent = require("./CustomerSearchComponent");
var CustomerDetailsComponent = require("./CustomerDetailsComponent");
var CustomerInfoComponent = require("./CustomerInfoComponent");
var CustomerAddressComponent = require("./CustomerAddressComponent");
var CreditCardComponent = require("./CreditCardComponent");
var TextFieldComponent = require("./TextFieldComponent");

var routing = ng.router.RouterModule.forRoot(
  [
    {
      path: "",
      component: CustomerSearchComponent
    },
    {
      path: ":id",
      component: CustomerDetailsComponent
    }
  ]
);


var AngularTestComponent = ng.core.Component({
  selector: "shine-angular-test",
  template: '\
  <h2 *ngIf="name">Hello {{name}}!</h2> \
  <form> \
    <div class="form-group"> \
      <label for="name">Name</label> \
      <input type="text" id="name" class="form-control" \
             name="name" bindon-ngModel="name"> \
    </div> \
  </form> \
  '
}).Class({
  constructor: function() {
    this.name = null;
  }
});

var AngularTestAppModule = ng.core.NgModule({
  imports: [ ng.platformBrowser.BrowserModule, ng.forms.FormsModule ],
  declarations: [ AngularTestComponent ],
  bootstrap: [ AngularTestComponent ]
})
.Class({
  constructor: function() {}
});

document.addEventListener('DOMContentLoaded', function() {
  var shouldBootstrap = document.getElementById("angular-test");
  if (shouldBootstrap) {
    ng.platformBrowserDynamic.
      platformBrowserDynamic().
      bootstrapModule(AngularTestAppModule);
  }
});


var CustomerSearchAppModule = ng.core.NgModule({
  imports: [
    ng.platformBrowser.BrowserModule,
    ng.forms.FormsModule,
    ng.http.HttpModule,
    routing
  ],
  declarations: [
    CustomerSearchComponent,
    CustomerDetailsComponent,
    CustomerInfoComponent,
    CustomerAddressComponent,
    CreditCardComponent,
    TextFieldComponent,
    CustomerAppComponent
  ],
  bootstrap: [ CustomerAppComponent ]
})
.Class({
  constructor: function() {}
});

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById("shine-customer-search")) {
    ng.platformBrowserDynamic.
    platformBrowserDynamic().
    bootstrapModule(CustomerSearchAppModule);
  }
});
