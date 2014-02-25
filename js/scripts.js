var Contact = {
    fullName: function() {
      return this.firstName + " " + this.lastName;
    }
};

var Address = {
  fullAddress: function() {
    return this.street + ", " + this.city + ", " + this.state;
  }
};


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

    newContact.phoneNumbers.push(inputtedPhoneNumber);

    $(".new-phone-number-append").each(function() {
      var inputtedPhoneNumber = $(this).find("input.new-phone-number").val();
      newContact.phoneNumbers.push(inputtedPhoneNumber);
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


    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();

      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".phone-number").text(newContact.phoneNumbers[0]);

      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
      $("ul#phoneNumbers").text("");
      newContact.phoneNumbers.forEach(function(phoneNumber) {
        $("ul#phoneNumbers").append("<li>" + phoneNumber + "</li>");
      });
    });

    $(".new-address-append").remove();
    $(".new-phone-number-append").remove();

    this.reset();
  });
});

