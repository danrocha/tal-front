<template>
  <div class="w-1/3">
    <vue-headful title="Sorry! - TAL" />

    <h1 class="my-6">Uh-Oh!</h1>
    <h3 class="my-6">
      It looks you're experiencing some network issues, please click the back button and try again.
    </h3>

    <router-link class="my-6" :to="{ name: 'home' }">Or go back to the event list</router-link>
  </div>
</template>
