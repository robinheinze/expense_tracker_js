beforeEach(function() {
  Contact.all = [];
  Address.all = [];
  PhoneNumber.all = [];
});

describe('Contact', function() {
  describe('fullName', function() {
    it("returns the full name with a space in between", function() {
      var testContact = Object.create(Contact);
      testContact.firstName = "Robin";
      testContact.lastName = "Miller";
      testContact.fullName().should.equal("Robin Miller")
    });
  });

  describe('initialize', function() {
    it('sets the first and last name for a contact', function() {
      var testContact = Object.create(Contact);
      testContact.initialize("Robin", "Miller");
      testContact.firstName.should.equal("Robin");
      testContact.lastName.should.equal("Miller");
    });

    it('creates the empty addresses array', function() {
      var testContact = Object.create(Contact);
      testContact.initialize();
      testContact.addresses.should.eql([]);
    });

    it('creates the empty phone numbers array', function() {
      var testContact = Object.create(Contact);
      testContact.initialize();
      testContact.phoneNumbers.should.eql([]);
    });
  });

  describe('create', function() {
    it('creates a new instance of object type Contact', function() {
      var testContact = Contact.create();
      Contact.isPrototypeOf(testContact).should.equal(true);
    });

    it('initializes the contact', function() {
      var testContact = Contact.create();
      testContact.addresses.should.eql([]);
    });

    it('should add the .all property to the contact', function() {
      var testContact = Contact.create();
      Contact.all.should.eql([testContact]);
    });
  });

  describe('createAddress', function() {
    it('should create an address object', function() {
      var testContact = Contact.create();
      var testAddress = testContact.createAddress();
      Address.isPrototypeOf(testAddress).should.equal(true);
    });

    it('should initialze the address object', function() {
      var testContact = Contact.create();
      var testAddress = testContact.createAddress("123 Main", "Portland", "OR");
      testAddress.street.should.equal("123 Main");
    })

    it('should add the created address to the address property of the contact', function() {
      var testContact = Contact.create();
      var testAddress = testContact.createAddress();
      testContact.addresses.should.eql([testAddress]);
    });
  });

  describe('createPhoneNumber', function() {
    it('should create a phoneNumber object', function() {
      var testContact = Contact.create();
      var testPhoneNumber = testContact.createPhoneNumber("5417606978");
      PhoneNumber.isPrototypeOf(testPhoneNumber).should.equal(true);
    });

    it('initializes phone number object', function() {
      var testContact = Contact.create();
      var testPhoneNumber = testContact.createPhoneNumber("5417606978");
      testPhoneNumber.areaCode.should.equal("541");
    });

    it('adds the phone number to the phone number property of the contact', function() {
      var testContact = Contact.create();
      var testPhoneNumber = testContact.createPhoneNumber("5417606978");
      testContact.phoneNumbers.should.eql([testPhoneNumber]);
    });
  }); 
});


describe('Address', function() {
  describe('initialize', function() {
    it('sets the street city and state properties', function() {
      var testAddress = Object.create(Address);
      testAddress.initialize("123 4th Ave", "Portland", "OR");
      testAddress.street.should.equal("123 4th Ave");
      testAddress.city.should.equal("Portland");
      testAddress.state.should.equal("OR");
    });
  });

  describe('create', function() {
    it('creates a new address object', function() {
      var testAddress = Address.create();
      Address.isPrototypeOf(testAddress).should.equal(true);
    });

    it('should initialize the address', function() {
      var testAddress = Address.create("123 street", "City", "ST");
      testAddress.street.should.equal("123 street");
    });

    it('should add the address to the .all property', function() {
      var testAddress = Address.create();
      Address.all.should.eql([testAddress]);
    });
  });

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
  describe('create', function() {
    it('should create a new PhoneNumber object', function() {
      var testPhoneNumber = PhoneNumber.create("5417606978");
      PhoneNumber.isPrototypeOf(testPhoneNumber).should.equal(true);
    });

    it('should initialize the PhoneNumber object', function() {
      var testPhoneNumber = PhoneNumber.create("5417606978");
      testPhoneNumber.string.should.equal("5417606978");
    });

    it('should add the object to the .add property', function() {
      var testPhoneNumber = PhoneNumber.create("5417606978");
      PhoneNumber.all.should.eql([testPhoneNumber]);
    });
  });

  describe('initialize', function() {
    it('sets the string, area-code, exchange, and subscriber number', function() {
      var testPhoneNumber = Object.create(PhoneNumber);
      testPhoneNumber.initialize("5417606978");
      testPhoneNumber.string.should.equal("5417606978");
      testPhoneNumber.areaCode.should.equal("541");
      testPhoneNumber.firstThree.should.equal("760");
      testPhoneNumber.secondFour.should.equal("6978");
    });
  });

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
