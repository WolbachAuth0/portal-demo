<template>
  <v-card>
    <v-card-title>
      {{ appTitle }}
    </v-card-title>

    <v-list>
      <v-list-item v-for="app in applications" :key="app.client_id">
        <v-avatar>
          <img :src="app.logo_uri" :alt="app.name">
        </v-avatar>
        <v-list-item-content>
            <v-list-item-title v-text="app.name"></v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-card>
</template>

<script>

export default {
  name: 'Portal',
  data() {
    return {
      appTitle: process.env.VUE_APP_TITLE,
      applications: []
    }
  },
  async beforeMount() {
    const accesstoken  = await this.$auth.getTokenSilently()
    const token = accesstoken ? this.$auth.decodeToken(accesstoken) : {}
    const clientIDs = token[`https://auth0-portal-demo.herokuapp.com/allowed-apps`]
    for (let clientID of clientIDs) {
      
      const response = await this.getClient(clientID)
      console.log(response)
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
