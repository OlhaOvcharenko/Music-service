Handlebars.registerHelper('categories.join', function(categories) {
  // Implement the logic to join categories (an array) into a string here.
  // For example, you can use the Array.prototype.join() method.
  return categories.join(', '); // Join categories with a comma and space.
});