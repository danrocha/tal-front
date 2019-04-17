<template>
  <div>
    <vue-headful title="About - TAL"/>
    <div class="flex flex-col md:flex-row md:items-start">
      <div class="md:w-1/2">
        <h2>What's this?</h2>
        <p>
          Its all started with a
          <strong>simple spreadsheet</strong> with a list of architecture practices around the
          world, shared between friends. Every time someone we knew was looking for a job, we
          pointed them to the list.
        </p>
        <p>
          We quickly saw the potential to make this an awesome resource for our fellow architects,
          students, and clients. That's when The Architecture List started.
        </p>
        <p>
          From the beginning we wanted to make it
          <strong>crowd-sourced</strong>. A list for us, by us. It would turn it into a living
          organism, with much more life and information than a simple curated list.
        </p>
      </div>
      <div class="md:w-1/3 md:ml-6">
        <img src="../assets/images/about/ideas.png" alt="Team Work">
      </div>
    </div>
    <div class="flex flex-col-reverse md:flex-row md:items-start pt-32">
      <div class="md:w-1/3 md:mr-6">
        <img src="../assets/images/about/teamwork.png" alt="Team Work">
      </div>
      <div class="md:w-1/2">
        <h2 class="pt-8">What's the goal?</h2>
        <p>
          As a start, we just want to give it back to the architecture community. We know how hard
          it is to find jobs in our area, so we want to help you find the offices you'll want to
          apply to.
        </p>
        <p>
          Ultimately, we would love to create a
          <strong>community</strong> around this list. Check our
          <a
            class="link link-inline"
            href="https://trello.com/b/w2ifjdkO/tal-roadmap"
            target="_blank"
          >public roadmap</a>
          for some of the many ideas floating around, and to see what we are currently up to. You
          can also help out by voting or getting in touch!
        </p>
        <p>
          You can also subscribe to our little newsletter. We'll promise only to bother you about
          important updates on the site (email frequency of about once or twice a month).
        </p>
        <mc-simple-form/>
      </div>
    </div>
    <div class="flex flex-col md:flex-row md:items-start pt-32">
      <div class="md:w-1/2">
        <h2>How to help?</h2>
        <p>
          Just
          <strong>use it and share it</strong>. The more you share, the better it gets. Also, try
          some of these ideas:
        </p>
        <ul>
          <li>
            If you know an office,
            <router-link class="link link-inline" to="add">add it to the list</router-link>
          </li>
          <li>
            If you see an office you are a fan of,
            <strong>vote it up</strong> to help it with its ranking
          </li>
          <li>If you see some incorrect information, it should be easy to fix it</li>
        </ul>
      </div>
      <div class="md:w-1/3">
        <img src="../assets/images/about/help.png" alt="Team Work">
      </div>
    </div>
    <div class="flex flex-col-reverse md:flex-row md:items-start pt-32">
      <div class="flex md:w-1/3 justify-center">
        <div class="w-1/2 px-2 mx-2">
          <img class src="../assets/images/about/daniel.jpg">
        </div>
        <div class="w-1/2 px-2 mx-2">
          <img class src="../assets/images/about/antoine.jpg">
        </div>
      </div>
      <div class="md:w-1/2">
        <h2>Who are we?</h2>

        <p>
          We are
          <a class="link link-inline" href="http://richardantoine.de/" target="_blank">Antoine</a>
          and
          <a class="link link-inline" href="http://ddrocha.com/" target="_blank">Daniel</a>, French
          and Brazilian architects based in Berlin. We met long ago via
          <a
            class="link link-inline"
            href="https://www.couchsurfing.com/"
            target="_blank"
          >Couchsurfing</a>, ended up working at the same office, and now we are trying to create this together.
          Antoine is currently working fulltime at
          <a
            class="link link-inline"
            href="http://studioo.cc/"
            target="_blank"
          >studio o</a>, and
          Daniel is an associate architect at
          <a
            class="link link-inline"
            href="http://henn.com"
            target="_blank"
          >HENN Berlin</a>.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import McSimpleForm from '../components/McSimpleForm.vue';
export default {
  name: 'about',
  components: {
    McSimpleForm,
  },
};
</script>
<style scoped>
p {
  @apply my-4;
  @apply leading-loose;
}
li::before {
  content: '•';
  color: #f2d024;
  @apply pr-2;
}
li {
  @apply py-2;
  @apply pl-6;
}
</style>
