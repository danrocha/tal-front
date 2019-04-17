<template>
  <footer class="bg-gray-200 mt-16">
    <div class="py-8 w-auto px-8 md:pl-0 md:pr-8 md:ml-56">
      <div id="footer-content">
        <div id="menu" class="mb-8 md:m-0">
          <ul id="menu-list" class="font-mono uppercase">
            <li>
              <router-link to="/add" class="link -ml-4" active-class="link-active">
                <strong>+</strong>&nbsp;ADD OFFICE
              </router-link>
            </li>
            <li>
              <router-link to="/" class="link" active-class="link-active" exact>Home</router-link>
            </li>
            <li>
              <router-link to="/about" class="link" active-class="link-active">About</router-link>
            </li>
            <li v-if="user">
              <router-link to="/dashboard" class="link" active-class="link-active"
                >Dashboard</router-link
              >
            </li>
            <li v-if="user">
              <logout>
                <button slot-scope="{ logout }" class="link uppercase font-mono" @click="logout">
                  Logout
                </button>
              </logout>
            </li>
            <li v-if="!user">
              <router-link to="/auth" class="link" active-class="link-active"
                >Login/Signup</router-link
              >
            </li>
          </ul>
        </div>
        <div id="extra" class="text-sm">
          <logo class="mb-4" />
          <p>
            We are still in the very early days of TAL. A lot of work is happening in the
            background, and we need your help!
          </p>
          <p>
            Drop us a line at
            <strong>contact@thearchitecturelist.com</strong> if you have comments, ideas,
            complaints, etc.
          </p>
          <p>
            And if you wanna receive updates about the project, sign up to our
            <strong>mailing list</strong>:
          </p>
          <mc-simple-form class="mb-2" />
          <p>
            We promise to keep your privacy and only occasionally get in touch! And you can
            unsubscribe anytime.
          </p>
          <p class="pt-8 text-gray-700">
            Made with
            <font-awesome-icon icon="heart" class="text-yellow-500" />by Daniel and Antoine, in
            Berlin.
          </p>
        </div>
      </div>
      <tos-privacy-links class="pt-8" />
    </div>
  </footer>
</template>
<script>
import { mapState } from 'vuex';
import Logo from '@/components/Logo.vue';
import McSimpleForm from '@/components/McSimpleForm.vue';
import Logout from '@/components/Logout.vue';
import TosPrivacyLinks from '@/components/TosPrivacyLinks.vue';

export default {
  name: 'MainFooter',
  components: {
    Logo,
    McSimpleForm,
    Logout,
    TosPrivacyLinks,
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      route: state => state.route,
    }),
  },
};
</script>
<style scoped>
#footer-content {
  @apply flex flex-col;
}

@screen md {
  #footer-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }
}
@screen lg {
  #footer-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }
}
#extra > p {
  @apply mb-2;
}
</style>
