describe('Contact', function() {
  describe('fullName', function() {
    it("returns the full name with a space in between", function() {
      var testContact = Object.create(Contact);
      testContact.firstName = "Robin";
      testContact.lastName = "Miller";
      testContact.fullName().should.equal("Robin Miller")
    });
  });
});


describe('Address', function() {
  describe('fullAddress', function() {
    it("returns the full address with nice formatting", function() {
      var testAddress = Object.create(Address);
      testAddress.street = "123 4th Ave";
      testAddress.city = "Portland";
      testAddress.state = "Oregon";
      testAddress.fullAddress().should.equal("123 4th Ave, Portland, Oregon");
    });
  });
  describe('valid', function() {
    it("should return false if the state field contains anything but letters", function() {
      var testAddress = Object.create(Address);
      testAddress.state = "Or3gon";
      testAddress.city = "Portland";
      testAddress.street = "1234 main st";
      testAddress.valid().should.equal(false);
    });
    it("should return false if the city field contains anything but letters", function() {
      var testAddress = Object.create(Address);
      testAddress.state = "Oregon";
      testAddress.city = "P0rtland";
      testAddress.street = "1234 main st";
      testAddress.valid().should.equal(false);
    });
    it("should return false if the first character of the street field is not a number", function() {
      var testAddress = Object.create(Address);
      testAddress.state = "Oregon";
      testAddress.city = "Portland";
      testAddress.street = "I234 main st";
      testAddress.valid().should.equal(false);
    });
  });
});

describe('PhoneNumber', function() {
  describe('fullNumber', function() {
    it("returns the three parts formatted with dashes in between", function() {
      var testPhoneNumber = Object.create(PhoneNumber);
      testPhoneNumber.areaCode = "503";
      testPhoneNumber.firstThree = "123";
      testPhoneNumber.secondFour = "1234";
      testPhoneNumber.fullNumber().should.equal("503-123-1234")
    });
  });
  describe('valid', function() {
    it("return false if the input contains any non digit characters", function() {
      var testPhoneNumber = Object.create(PhoneNumber);
      testPhoneNumber.string = "503thisisbadstuff1231234";
      testPhoneNumber.areaCode = "503thisisbadstuff";
      testPhoneNumber.firstThree = "123";
      testPhoneNumber.secondFour = "1234";
      testPhoneNumber.valid().should.equal(false);
    });

    it("return true if the input contains only numbers", function() {
      var testPhoneNumber = Object.create(PhoneNumber);
      testPhoneNumber.string = "(503) 123-1234";
      testPhoneNumber.areaCode = "503";
      testPhoneNumber.firstThree = "123";
      testPhoneNumber.secondFour = "1234";
      testPhoneNumber.valid().should.equal(true);
    });
  });
});
