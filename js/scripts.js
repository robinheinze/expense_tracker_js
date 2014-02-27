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
  },

  totalSpent: function() {
    var sum = 0;
    this.purchases.forEach(function(purchase) {
      sum += purchase.amount;
    });
    return sum;
  },

  totalSpendEverywhere: function() {
    var sum = 0;
    Category.all.forEach(function(category) {
      sum += category.totalSpent();
    });
    return sum;
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

    $("table#all-category-list").append("<tr class='category-clickable'>" +
                                            "<td>" + newCategory.name + "</td>" +
                                            "<td class='" + newCategory.name +"-category-spend'></td>" +
                                            "<td class='"+ newCategory.name +"-category-percent'></td>" +
                                          "</tr>");

    $(".appended-row").remove();

    $("#add-purchase-section").show();
    $("#show-purchases-section").show();

    $(".category-clickable").last().click(function() {   
      currentCategory = Category.all[$(this).index()-1];

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
    inputtedAmount = parseFloat($("input#new-purchase-amount").val());

    newPurchase = currentCategory.createPurchase(inputtedAmount, inputtedDescription);

    $(".appended-row").remove();
    currentCategory.purchases.forEach(function(purchase) {
        $("#purchases-table").append("<tr class='appended-row'><td>" + purchase.description + "</td><td>" + purchase.amount + "</td></tr>");
    });

    Category.all.forEach(function(category) {
      var percent = ((category.totalSpent()/category.totalSpendEverywhere())*100).toFixed(0);
      var total = (category.totalSpent()).toFixed(2);
      $("."+category.name +"-category-spend").text(total);
      $("."+category.name +"-category-percent").text(percent+"%");
    })

    this.reset();
  });

  // $("#append-table-rows").text("");
  // currentCategory.purchases.forEach(function(purchase) {
  //   $("#append-table-rows").append("<tr><td>" + purchase.description + "</td><td>" + purchase.amount + "</td></tr>");
  // });

});