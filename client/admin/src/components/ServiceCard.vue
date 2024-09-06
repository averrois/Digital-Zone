<template>
  <div class="relative p-4 bg-white shadow-xl rounded-xl">
    <!-- Image -->
    <div class="flex items-center justify-center mx-auto">
      <img
        class="h-full rounded-lg"
        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="Sample Image"
      />
    </div>

    <!-- Content -->
    <div class="mt-5 text-center">
      <h3 class="text-lg font-medium text-gray-800">Blog post published</h3>

      <p class="mt-2 text-gray-500">This blog post has been published. Team members will be able to edit this post.</p>
    </div>

    <!-- Buttons -->
    <div class="flex justify-between mt-5">
      <button class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors duration-300">Edit</button>
      <button class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition-colors duration-300">Delete</button>
    </div>
  </div>
</template>
