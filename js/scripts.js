var Contact = {
    fullName: function() {
      return this.firstName + " " + this.lastName;
    }
};

var Address = {
  fullAddress: function() {
    return this.street + ", " + this.city + ", " + this.state;
  },
  valid: function() {
    return !((/[^a-zA-Z]/g).test(this.state) || (/[^a-zA-Z]/g).test(this.city) || (/\D/).test(this.street.charAt(0)) || this.street === "" || this.city === "" || this.state === "" );
  }
};

var PhoneNumber = {
  fullNumber: function() {
    return this.areaCode + "-" + this.firstThree + "-" + this.secondFour;
  },
  valid: function() {
    return !((/[^\(\)\-\d\s]/g).test(this.string) || this.string.replace((/\D/g), "").length !== 10);
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

    var newContact = Object.create(Contact);
    newContact.firstName = inputtedFirstName;
    newContact.lastName = inputtedLastName;

    newContact.addresses = [];
    newContact.phoneNumbers = [];

    var inputtedStreet = $("div.new-address input.new-street").val();
    var inputtedCity = $("div.new-address input.new-city").val();
    var inputtedState = $("div.new-address input.new-state").val();

    var newAddress = Object.create(Address);
    newAddress.street = inputtedStreet;
    newAddress.city = inputtedCity;
    newAddress.state = inputtedState;

    newContact.addresses.push(newAddress);

    var inputtedPhoneNumber = $("input#new-phone-number").val();

    var newPhoneNumber = Object.create(PhoneNumber);
    newPhoneNumber.string = inputtedPhoneNumber; 

    var scrubbedPhoneNumber = inputtedPhoneNumber.replace(/\D/g, "");
    newPhoneNumber.areaCode = scrubbedPhoneNumber.slice(0,3);
    newPhoneNumber.firstThree = scrubbedPhoneNumber.slice(3,6);
    newPhoneNumber.secondFour = scrubbedPhoneNumber.slice(6,10);


    newContact.phoneNumbers.push(newPhoneNumber);

    $(".new-phone-number-append").each(function() {
      var inputtedPhoneNumber = $(this).find("input.new-phone-number").val().replace(/\D/g, "");

      var inputtedAreaCode = inputtedPhoneNumber.slice(0,3);
      var inputtedFirstThree = inputtedPhoneNumber.slice(3,6);
      var inputtedSecondFour = inputtedPhoneNumber.slice(6,10);

      var newPhoneNumber = Object.create(PhoneNumber);
      newPhoneNumber.areaCode = inputtedAreaCode;
      newPhoneNumber.firstThree = inputtedFirstThree;
      newPhoneNumber.secondFour = inputtedSecondFour;

      newContact.phoneNumbers.push(newPhoneNumber);
    });


    $(".new-address-append").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();

      var newAddress = Object.create(Address);
      newAddress.street = inputtedStreet;
      newAddress.city = inputtedCity;
      newAddress.state = inputtedState;

      newContact.addresses.push(newAddress);
    });
    if (!newPhoneNumber.valid() || !newAddress.valid()) {
      if (!newPhoneNumber.valid()) {
        alert("Please enter a valid phone number.")
      } 
      if (!newAddress.valid()) {
      alert("Please enter a valid address!")
      } 
    } else {
      $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
    }
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
  });
});

