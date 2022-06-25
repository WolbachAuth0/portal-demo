<template>
  <v-card dark>
    <v-card-title>
      {{ appTitle }}
    </v-card-title>


  </v-card>
</template>

<script>

export default {
  name: 'Portal',
  data() {
    return {
      applications: []
    }
  },
  async beforeMount() {
    const accesstoken  = await this.$auth.getTokenSilently()
    const token = accesstoken ? this.$auth.decodeToken(accesstoken) : {}
    const clientIDs = token[`${process.env.VUE_APP_DOMAIN}/allowed-apps`]
    for (let clientID of clientIDs) {
      const response = this.getClient(clientID)
      this.applications.push(response.data)
    }
  },
  methods: {
    async getClient (clientID) {
      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).get(`/clients/${clientID}`)
      return response.data
    }
  }
}
</script>
