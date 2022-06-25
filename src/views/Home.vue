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
  async change () {
    if (this.$auth.isAuthenticated) {
      const accesstoken  = await this.$auth.getTokenSilently()
      console.log(accesstoken)
    }
  },
  methods: {
   
  }
}
</script>