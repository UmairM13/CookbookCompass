<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 class="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
        <p class="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
      </div>
      <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <form @submit.prevent="handleLogin">
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <div class="relative mb-4">
            <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
            <input
              type="text"
              id="password"
              v-model="password"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <button
            type="submit"
            class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Login
          </button>
          <p class="text-xs text-gray-500 mt-3">
            Don't have an account? <router-link to="/Signup" class="text-indigo-500 hover:text-indigo-600">Signup</router-link>
          </p>
          <div v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import { userServices } from '@/services/userservices';

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "", // To display error messages
    };
  },
  methods: {
    async handleLogin() {
      this.error = ""; // Clear any previous error

      // Validate inputs
      if (!this.email || !this.password) {
        this.error = "Please fill in all fields.";
        return;
      }

      try {
        // Call the login method from userServices
        const response = await userServices.login(this.email, this.password);


        localStorage.setItem("session_token", response.session_token); 
        window.dispatchEvent(new Event('storage'));


        console.log(response.session_token);
        this.error = ""; 

        // Handle successful login
        if (response) {
          alert("Login successful!");
          this.$router.push({ path: "/" }); // Redirect to dashboard or home page
        }
      } catch (err) {
        // Handle login error
        this.error = "Invalid email or password. Please try again.";
        console.error("Login error:", err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>