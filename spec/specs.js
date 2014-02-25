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
      testAddress.fullAddress().should.equal("123 4th Ave, Portland, Oregon")
    });
  });
});
