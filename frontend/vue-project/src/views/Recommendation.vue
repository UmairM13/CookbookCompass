<template>
  <div class="recipe-recommendations">
    <h1>Here are your recipe recommendations based on your BMI:</h1>
    <div v-if="loading">Loading recommendations...</div>
    <div v-else>
      <div v-if="recipes.length > 0">
        <div v-for="recipe in recipes" :key="recipe.title" class="recipe-card">
          <h2>{{ recipe.title }}</h2>
          <p>Calories: {{ recipe.calories }} kcal</p>
        </div>
      </div>
      <div v-else>
        <p>No recipes found. Please try again later.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { foodservices } from '@/services/foodservices'; // Import the service

export default {
  data() {
    return {
      recipes: [], // Stores the recipe recommendations
      loading: true, // Tracks whether data is being fetched
    };
  },
  created() {
    // Fetch recommendations when the component is created
    this.fetchRecommendations();
  },
  methods: {
    // Function to categorize BMI
    categorizeBmi(bmi) {
      if (bmi < 18.5) {
        return 'underweight';
      } else if (bmi >= 18.5 && bmi < 25) {
        return 'healthy';
      } else {
        return 'overweight';
      }
    },
    async fetchRecommendations() {
      try {
        // Get BMI from localStorage
        const bmi = parseFloat(localStorage.getItem('bmi'));

        // Check if BMI is null or undefined
        if (!bmi || isNaN(bmi)) {
          this.$router.push({ path: '/calculate-bmi' }); // Redirect to Calculate BMI page
          return;
        }

        // Categorize BMI
        const bmiCategory = this.categorizeBmi(bmi);

        // Fetch recommendations based on BMI category
        const data = await foodservices.getRecommendations(bmiCategory);
        this.recipes = data; // Store the fetched recipes
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        this.loading = false; // Stop loading state
      }
    },
  },
};
</script>

<style scoped>
.recipe-recommendations {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.recipe-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.recipe-card h2 {
  font-size: 20px;
  margin: 0 0 10px 0;
}

.recipe-card p {
  font-size: 16px;
  color: #555;
  margin: 0;
}
</style>