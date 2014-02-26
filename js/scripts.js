var Contact = {
  all: [],
  create: function(firstName, lastName) {
    var contact = Object.create(Contact);
    contact.initialize(firstName, lastName);
    Contact.all.push(contact);
    return contact;
  },

  initialize: function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = [];
    this.phoneNumbers = [];
  },

  fullName: function() {
    return this.firstName + " " + this.lastName;
  },

  createAddress: function(street, city, state) {
    var address = Address.create(street, city, state);
    this.addresses.push(address);
    return address;
  },

  createPhoneNumber: function(string) {
    var phoneNumber = PhoneNumber.create(string);
    this.phoneNumbers.push(phoneNumber);
    return phoneNumber;
  }
};

var Address = {
  all: [],
  create: function(street, city, state) {
    var address = Object.create(Address);
    address.initialize(street, city, state);
    Address.all.push(address);
    return address;
  },

  initialize: function(street, city, state) {
    this.street = street;
    this.city = city;
    this.state = state;
  },

  fullAddress: function() {
    return this.street + ", " + this.city + ", " + this.state;
  },
  valid: function() {
    return !((/[^a-zA-Z]/g).test(this.state) || (/[^a-zA-Z]/g).test(this.city) || (/\D/).test(this.street.charAt(0)) || this.street === "" || this.city === "" || this.state === "" );
  }
};

var PhoneNumber = {
  all: [],
  create: function(string) {
    var phoneNumber = Object.create(PhoneNumber);
    phoneNumber.initialize(string);
    PhoneNumber.all.push(phoneNumber);
    return phoneNumber;
  },

  initialize: function(string) {
    this.string = string;
    this.areaCode = string.substring(0,3);
    this.firstThree = string.substring(3,6);
    this.secondFour = string.substring(6,10);
  },

  fullNumber: function() {
    return this.areaCode + "-" + this.firstThree + "-" + this.secondFour;
  },
  valid: function() {
    return !((/[^\(\)\-\.\d\s]/g).test(this.string) || this.string.replace((/\D/g), "").length !== 10);
  }
}


$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address-append">' + 
                                 '<div class="form-group">' + 
                                   '<label for="new-street">Street</label>' + 
                                   '<input type="text" class="form-control new-street">' + 
                                 '</div>' + 
                                 '<div class="form-group">' + 
                                   '<label for="new-city">City</label>' + 
                                   '<input type="text" class="form-control new-city">' + 
                                 '</div>' + 
                                 '<div class="form-group">' + 
                                   '<label for="new-state">State</label>' + 
                                   '<input type="text" class="form-control new-state">' + 
                                 '</div>' + 
                               '</div>');
  });

  $("#add-phone-number").click(function() {
    $("#new-phone-numbers").append('<div class="new-phone-number-append">' + 
                                      '<div class="form-group">' + 
                                        '<label for="new-phone-number">Phone number</label>' + 
                                        '<input type="text" class="form-control new-phone-number">' + 
                                      '</div>' +                                 
                                    '</div>');
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = Contact.create(inputtedFirstName, inputtedLastName);

    var inputtedStreet = $("div.new-address input.new-street").val();
    var inputtedCity = $("div.new-address input.new-city").val();
    var inputtedState = $("div.new-address input.new-state").val();
    var newAddress = newContact.createAddress(inputtedStreet, inputtedCity, inputtedState);

    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPhoneNumberScrubbed = inputtedPhoneNumber.replace(/\D/g, "");
    var newPhoneNumber = newContact.createPhoneNumber(inputtedPhoneNumberScrubbed);

    $(".new-phone-number-append").each(function() {
      var inputtedPhoneNumber = $(this).find("input.new-phone-number").val();
      var inputtedPhoneNumberScrubbed = inputtedPhoneNumber.replace(/\D/g, "");
      var newPhoneNumber = newContact.createPhoneNumber(inputtedPhoneNumberScrubbed);
    });


    $(".new-address-append").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = newContact.createAddress(inputtedStreet, inputtedCity, inputtedState);
    });

    var badPhoneNumberExists;
    newContact.phoneNumbers.forEach(function(phoneNumber) {
      if (!phoneNumber.valid()) {
        badPhoneNumberExists = true;
      }
    });

    var badAddressExists;
        newContact.addresses.forEach(function(address) {
          if (!address.valid()) {
            badAddressExists = true;
          }
        });


    if (badPhoneNumberExists || badAddressExists) {
      if (badPhoneNumberExists) {
        alert("Please enter a valid phone number.")
      } 
      if (badAddressExists) {
      alert("Please enter a valid address!")
      } 
    } else {
      $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
    
      $(".contact").last().click(function() {
        $("#show-contact").show();

        $("#show-contact h2").text(newContact.fullName());
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);

        $("ul#addresses").text("");
        newContact.addresses.forEach(function(address) {
          $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
        });
        $("ul#phoneNumbers").text("");
        newContact.phoneNumbers.forEach(function(phoneNumber) {
          $("ul#phoneNumbers").append("<li>" + phoneNumber.fullNumber() + "</li>");
        });
      });

      $(".new-address-append").remove();
      $(".new-phone-number-append").remove();

      this.reset();
    }
  });
});

