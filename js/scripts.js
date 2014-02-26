var Category = {
  all: [],
  initialize: function(name) {
    this.name = name;
    this.purchases = [];
  },

  create: function(name) {
    var category = Object.create(Category);
    category.initialize(name);
    Category.all.push(category);
    return category;
  },

  createPurchase: function(amount, description) {
    var purchase = Purchase.create(amount, description);
    this.purchases.push(purchase);
    return purchase;
  }
};

var Purchase = {
  create: function(amount, description) {
    var purchase = Object.create(Purchase);
    purchase.initialize(amount, description);
    return purchase;
  },

  initialize: function(amount, description) {
    this.amount = amount;
    this.description = description;
  }
};

$(document).ready(function() {
  var currentCategory;

  $("form#new-category").submit(function(event) {
    event.preventDefault();

    inputtedCategory = $("input#new-category-name").val();

    newCategory = Category.create(inputtedCategory);

    $("ul#all-category-list").append("<li class='category-clickable'>" + newCategory.name + "</li>");

    $(".appended-row").remove();

    $("#add-purchase-section").show();
    $("#show-purchases-section").show();

    $(".category-clickable").last().click(function() {   
      currentCategory = Category.all[$(this).index()];

      $(".appended-row").remove();
      if (currentCategory.purchases.length > 0) {
        currentCategory.purchases.forEach(function(purchase) {
        $("#purchases-table").append("<tr class='appended-row'><td>" + purchase.description + "</td><td>" + purchase.amount + "</td></tr>");
        });
      }

    });
    currentCategory = newCategory;
    this.reset();
  });

  $("form#new-purchase").submit(function(event) {
    event.preventDefault();

    inputtedDescription = $("input#new-purchase-description").val();
    inputtedAmount = parseFloat($("input#new-purchase-amount").val()).toFixed(2);

    newPurchase = currentCategory.createPurchase(inputtedAmount, inputtedDescription);

    $(".appended-row").remove();
    currentCategory.purchases.forEach(function(purchase) {
        $("#purchases-table").append("<tr class='appended-row'><td>" + purchase.description + "</td><td>" + purchase.amount + "</td></tr>");
    });
    this.reset();
  });

  // $("#append-table-rows").text("");
  // currentCategory.purchases.forEach(function(purchase) {
  //   $("#append-table-rows").append("<tr><td>" + purchase.description + "</td><td>" + purchase.amount + "</td></tr>");
  // });

});