<template>
  <div class="pt-8 container mx-auto md:w-auto md:mr-6 md:ml-56">
    <vue-headful title="About - TAL" />
    <div class="flex items-center">
      <div class="w-1/2">
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
      <div class="w-1/3">
        <img src="../assets/images/about/ideas.png" alt="Team Work" />
      </div>
    </div>
    <div class="flex items-start pt-32">
      <div class="w-1/3 mr-6">
        <img src="../assets/images/about/teamwork.png" alt="Team Work" />
      </div>
      <div class="w-1/2">
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
            >public roadmap</a
          >
          for some of the many ideas floating around, and to see what we are currently up to. You
          can also help out by voting or getting in touch!
        </p>
        <p>
          You can also subscribe to our little newsletter. We'll promise only to bother you about
          important updates on the site (email frequency of about once or twice a month).
        </p>
        <div id="mc_embed_signup">
          <form
            action="https://thearchitecturelist.us15.list-manage.com/subscribe/post?u=220ad385d5f90b6e7c5e808ba&amp;id=33a8852c1b"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate"
            target="_blank"
            novalidate
          >
            <div id="mc_embed_signup_scroll" class="p-4 border rounded">
              <base-input
                label="Subscribe to our mailing list"
                type="email"
                target-class="input-large"
                placeholder="email address"
                id="mce-EMAIL"
                name="EMAIL"
              />
              <div id="mergeRow-gdpr" class="mt-4">
                <div class="content__gdpr text-sm">
                  <base-label>Marketing Permissions (GDPR)</base-label>
                  <p class="text-sm">
                    Please select all the ways you would like to hear from The Architecture List:
                  </p>
                  <fieldset class="flex justify-start flex-col" name="interestgroup_field">
                    <label class="flex items-center" for="gdpr_8717">
                      <input
                        type="checkbox"
                        id="gdpr_8717"
                        name="gdpr[8717]"
                        value="Y"
                        class="av-checkbox gdpr"
                        checked
                      />
                      <span class="pl-2">Email</span>
                    </label>
                    <label class="flex items-center" for="gdpr_8721">
                      <input
                        type="checkbox"
                        id="gdpr_8721"
                        name="gdpr[8721]"
                        value="Y"
                        class="av-checkbox gdpr"
                        checked
                      />
                      <span class="pl-2">Direct Mail</span>
                    </label>
                  </fieldset>
                  <p>
                    You can unsubscribe at any time by clicking the link in the footer of our
                    emails. For information about our privacy practices, please visit our
                    <router-link to="privacy" class="link link-inline">Privacy Policy</router-link>.
                  </p>
                </div>
                <div class="content__gdprLegal">
                  <p class="text-sm">
                    We use Mailchimp as our marketing platform. By clicking below to subscribe, you
                    acknowledge that your information will be transferred to Mailchimp for
                    processing.
                    <a href="https://mailchimp.com/legal/" target="_blank" class="link link-inline"
                      >Learn more about Mailchimp's privacy practices here.</a
                    >
                  </p>
                </div>
              </div>
              <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px;" aria-hidden="true">
                <input
                  type="text"
                  name="b_220ad385d5f90b6e7c5e808ba_33a8852c1b"
                  tabindex="-1"
                  value
                />
              </div>
              <div class="clear">
                <button
                  aria-label="subscribe"
                  class="btn btn-primary"
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!--End mc_embed_signup-->
    <div class="flex items-start pt-32">
      <div class="w-1/2">
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
      <div class="w-1/3">
        <img src="../assets/images/about/help.png" alt="Team Work" />
      </div>
    </div>
    <div class="flex justify-start pt-32">
      <div class="flex w-1/3 justify-center">
        <div class="w-1/2 px-2 mx-2">
          <img class src="../assets/images/about/daniel.jpg" />
        </div>
        <div class="w-1/2 px-2 mx-2">
          <img class src="../assets/images/about/antoine.jpg" />
        </div>
      </div>
      <div class="w-1/2">
        <h2>Who are we?</h2>

        <p>
          We are
          <a class="link link-inline" href="http://richardantoine.de/" target="_blank">Antoine</a>
          and <a class="link link-inline" href="http://ddrocha.com/" target="_blank">Daniel</a>,
          French and Brazilian architects based in Berlin. We met long ago via
          <a class="link link-inline" href="https://www.couchsurfing.com/" target="_blank"
            >Couchsurfing</a
          >, ended up working at the same office, and now we are trying to create this together.
          Antoine is currently working fulltime at
          <a class="link link-inline" href="http://studioo.cc/" target="_blank">studio o</a>, and
          Daniel is an associate architect at
          <a class="link link-inline" href="http://henn.com" target="_blank">HENN Berlin</a>.
        </p>
      </div>
    </div>
    <div class="pt-32">
      <tos-privacy-links class="border-t" />
    </div>
  </div>
</template>
<script>
import TosPrivacyLinks from '@/components/TosPrivacyLinks.vue';

export default {
  name: 'about',
  components: {
    TosPrivacyLinks,
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
