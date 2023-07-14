Component({
  properties: {
    data: {
      category: "Main Dish",
      created_at: "2023-07-13",
      description: "Classic Italian pasta dish with creamy sauce and bacon",
      id: 1,
      instructions: "1. Cook the pasta in a large pot of salted boiling water until al dente.↵2. In a skillet, cook the bacon until crispy. Remove from heat and set aside.↵3. In a bowl, whisk together the eggs, grated cheese, and black pepper.↵4. Drain the pasta, reserving a small amount of the cooking water.↵5. While the pasta is still hot, add it to the skillet with the cooked bacon. Toss to combine.↵6. Gradually pour the egg mixture over the hot pasta, stirring quickly to coat the pasta evenly.↵7. If the sauce is too thick, add a small amount of the reserved cooking water to thin it out.↵8. Serve immediately with extra grated cheese on top.",
      name: "Pasta Carbonara",
      nutritious: {fat: 38.02, protein: 22.79, carbs: 31.23, fiber: 3, sodium: 340},
      photos: "https://www.cookingclassy.com/wp-content/uploads/2020/10/spaghetti-carbonara-01.jpg",
      portion: 2.6,
      rating: 3.9,
      total_calories: 535,
      updated_at: "2023-07-13",
      user_favourite: false
      }
  },
  methods: {
    handleClick() {
      console.log('Button Clicked!');
    }
  }
});