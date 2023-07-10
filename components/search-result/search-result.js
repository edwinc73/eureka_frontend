Component({
  properties: {
    data: {
      type: Object,
      value: {
        carbs: 60,
        category: "",
        created_at: "",
        description: "Classic Italian pasta dish with creamy sauce and bacon",
        fat: 40,
        fiber: null,
        instructions: "1. Cook the pasta in a large pot of salted boiling water until al dente.↵2. In a skillet, cook the bacon until crispy. Remove from heat and set aside.↵3. In a bowl, whisk together the eggs, grated cheese, and black pepper.↵4. Drain the pasta, reserving a small amount of the cooking water.↵5. While the pasta is still hot, add it to the skillet with the cooked bacon. Toss to combine.↵6. Gradually pour the egg mixture over the hot pasta, stirring quickly to coat the pasta evenly.↵7. If the sauce is too thick, add a small amount of the reserved cooking water to thin it out.↵8. Serve immediately with extra grated cheese on top.",
        name: "Pasta Carbonara",
        protein: 30,
        sodium: null,
        total_calories: 700,
        updated_at: "2023/07/10"
      }
    }
  },
  methods: {
    handleClick() {
      console.log('Button Clicked!');
    }
  }
});