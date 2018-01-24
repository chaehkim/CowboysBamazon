var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes MySQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dallas28",
  database: "cowboysbamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  getAllProducts();
});

console.log("Welcome to the Dallas Cowboys Jersey Store!")

// Load and Display Products
function getAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    userBuy(res);
  });
}

// Get Product to Buy from User
function userBuy(inventory) {
   inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Which Cowboys Jersey do you want to buy? [Quit with Q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      // Check if the user wants to quit the program
      checkQuit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);
      if (product) {
        buyQuantity(product);
      }
      else {
        console.log("\nSorry. That jersey is not in the inventory.");
        getAllProducts();
      }
    });
}

// Prompt the customer for a product quantity
function buyQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many jerseys do you want to pruchase? [Quit with Q]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      checkQuit(val.quantity);
      var quantity = parseInt(val.quantity);
      if (quantity > product.stock_quantity) {
        console.log("\nSorry.  We don't have that many jerseys in-stock.");
        getAllProducts();
      }
      else {
        completeSale(product, quantity);
      }
    });
}

// Purchase the desired quanity of the desired item
function completeSale(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nCongrats!  You just purchsed " + quantity + " " + product.product_name + " jerseys!");
      getAllProducts();
    }
  );
}

// Validate product is in inventory.
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}

// Function to Quit the program
function checkQuit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Come again soon!");
    process.exit(0);
  }
}
