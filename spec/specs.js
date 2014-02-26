beforeEach(function() {
  Category.all = [];
})

describe('Purchase', function(){
  describe('initialize', function() {
    it('should set the amount and description properties', function() {
      var testPurchase = Object.create(Purchase);
      testPurchase.initialize(5.99, "cold medicine");
      testPurchase.amount.should.equal(5.99);
      testPurchase.description.should.equal("cold medicine");
    });
  });

  describe('create', function() {
    it('creates a new purchase object', function() {
      var testPurchase = Purchase.create();
      Purchase.isPrototypeOf(testPurchase).should.equal(true);
    });

    it('initializes the new purchase object', function() {
      var testPurchase = Purchase.create(5.99, "cold medicine");
      testPurchase.amount.should.equal(5.99);
      testPurchase.description.should.equal("cold medicine");
    });
  });
});

describe('Category', function() {
  describe('initialize', function() {
    it('sets the name of the category', function() {
      var testCategory = Object.create(Category);
      testCategory.initialize("Food");
      testCategory.name.should.equal("Food");
    });

    it('creates the empty purchases array', function() {
      var testCategory = Object.create(Category);
      testCategory.initialize("Food");
      testCategory.purchases.should.eql([]);
    });
  });

  describe('create', function() {
    it('should create a category object', function() {
      var testCategory = Category.create();
      Category.isPrototypeOf(testCategory).should.equal(true);
    });
    it('should initialize the category object', function() {
      var testCategory = Category.create();
      testCategory.purchases.should.eql([]);
    });
    it('adds the category to the .add property', function() {
      var testCategory = Category.create();
      Category.all.should.eql([testCategory]);
    });
  });

  describe('createPurchase', function() {
    it('creates a purchase object', function() {
      var testCategory = Category.create();
      var testPurchase = testCategory.createPurchase();
      Purchase.isPrototypeOf(testPurchase).should.equal(true);
    });

    it('initializes the purchase object', function() {
      var testCategory = Category.create();
      var testPurchase = testCategory.createPurchase(1.99, "bread");
      testPurchase.amount.should.equal(1.99);
      testPurchase.description.should.equal("bread");
    });

    it('pushes the purchase object to the purcheses array of the Category', function() {
      var testCategory = Category.create();
      var testPurchase = testCategory.createPurchase();
      testCategory.purchases.should.eql([testPurchase]);
    });
  });
});
