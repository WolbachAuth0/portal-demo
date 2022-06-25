<template>
  <v-card dark>
    <v-card-title>
      {{ appTitle }}
    </v-card-title>

  </v-card>
</template>

<script>
export default {
  name: 'Home',
  metaInfo: {
    title: 'Welcome',
  },
  data () {
    return {
      appTitle: process.env.VUE_APP_TITLE,
      tab: null,
      selectedOrg: 0,
      organizations: []
    }
  },
  async mounted () {
    const orgs = await this.getOrganizations()
    this.organizations = orgs.data

    if (process.env.VUE_APP_MODE === 'development') {
      console.log('mounted: Home')
      console.log(orgs)
    }
  },
  methods: {
    async getOrganizations () {
      const response = await this.$http(null).get(`/organizations`)
      return response.data
    },
    // https://auth0.com/blog/complete-guide-to-vue-user-authentication/#Add-User-Authentication
		async authenticate(organization) {
			if (this.$auth.isAuthenticated) {
        this.$router.push({ path: '/' })
			} else {
				// https://auth0.github.io/auth0-spa-js/interfaces/redirectloginoptions.html
				const scope = [ 'openid', 'profile', 'email' ].join(' ')
				this.$auth.loginWithRedirect({ scope, organization })
			}
		}
  }
}
</script>