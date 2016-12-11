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

var CustomerSearchComponent = ng.core.Component({
  selector: "shine-customer-search",
  template: '\
  <header> \
    <h1 class="h2">Customer Search</h1> \
  </header> \
  <section class="search-form"> \
    <form> \
      <label for="keywords" class="sr-only">Keywords</label> \
        <input type="text" id="keywords" name="keywords" \
               placeholder="First Name, Last Name, or Email Address"\
               bind-ngModel="keywords" \
               on-ngModelChange="search($event)" \
               class="form-control input-lg" > \
    </form> \
  </section> \
  <section class="search-results"> \
    <header> \
      <h1 class="h3">Results</h1> \
    </header> \
    <ol class="list-group"> \
      <li *ngFor="let customer of customers" \
          class="list-group-item clearfix"> \
        <h3 class="pull-right"> \
          <small class="text-uppercase">Joined</small> \
          {{customer.created_at}} \
        </h3> \
        <h2 class="h3"> \
          {{customer.first_name}} {{customer.last_name}} \
          <small>{{customer.username}}</small> \
        </h2> \
        <h4>{{customer.email}}</h4> \
      </li> \
    </ol> \
</section> \
'
}).Class({
  constructor: [
    ng.http.Http,
    function(http) {
      this.http      = http;
      this.customers = null;
      this.keywords  = null;
    }
  ],
  search: function($event) {
    var self = this;
    self.keywords = $event;
    if (self.keywords.length < 3) {
      return;
    }
    self.http.get(
      "/customers.json?keywords=" + self.keywords
    ).subscribe(
      function(response) {
        self.customers = response.json().customers;
      },
      function(response) {
        alert(response);
      }
    );
  }
});

var CustomerSearchAppModule = ng.core.NgModule({
  imports: [
    ng.platformBrowser.BrowserModule,
    ng.forms.FormsModule,
    ng.http.HttpModule
  ],
  declarations: [ CustomerSearchComponent ],
  bootstrap: [ CustomerSearchComponent ]
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
