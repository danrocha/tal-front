<template>
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
              You can unsubscribe at any time by clicking the link in the footer of our emails. For
              information about our privacy practices, please visit our
              <router-link to="privacy" class="link link-inline">Privacy Policy</router-link>.
            </p>
          </div>
          <div class="content__gdprLegal">
            <p class="text-sm">
              We use Mailchimp as our marketing platform. By clicking below to subscribe, you
              acknowledge that your information will be transferred to Mailchimp for processing.
              <a href="https://mailchimp.com/legal/" target="_blank" class="link link-inline"
                >Learn more about Mailchimp's privacy practices here.</a
              >
            </p>
          </div>
        </div>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true">
          <input type="text" name="b_220ad385d5f90b6e7c5e808ba_33a8852c1b" tabindex="-1" value />
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
</template>
<script>
export default {
  name: 'McFullForm',
};
</script>
