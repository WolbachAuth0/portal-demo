<template>
  <v-card>
    <v-card-title>
      <v-avatar tile v-if="logoIsAvailable">
        <img :src="logo_uri" :alt="name" />
      </v-avatar>
      <v-avatar tile v-else>
        <v-progress-circular :size="40" color="primary" indeterminate></v-progress-circular>
      </v-avatar>
      {{ name }}
    </v-card-title>

    <v-card-actions>
      <v-btn class="primary" :href="deployment_url" target="_blank">Login</v-btn>
      <v-btn class="secondary" @click="toggleShowJSON(clientID)">
        {{ showJSON ? `Hide App Data` : `Show App Data` }}
      </v-btn>
    </v-card-actions>

    <v-divider></v-divider>

    <v-card-text v-if="showJSON">
      <pre class="json">
{{ JSON.stringify(data) | pretty }}
      </pre>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Application',
  data() {
    return {
      showJSON: false,
      app_type: 'app_type',
      tenant: 'tenant-name',
      name: 'app-name',
      logo_uri: 'logo-uri',
      deployment_url: '#',
      data: {}
    }
  },
  props: {
    clientID: { type: String, required: true }
  },
  filters: {
    pretty: function(value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
  },
  computed: {
    logoIsAvailable () {
      return this.logo_uri !== 'logo-uri'
    } 
  },
  async beforeMount () {
    const response = await this.getClient()
    if (response.status == 200) { 
      this.data = response.data
      this.app_type = response.data.app_type
      this.tenant = response.data.tenant
      this.name = response.data.name
      this.logo_uri = response.data.logo_uri
      this.deployment_url = response.data.client_metadata.deployment_url    
    }
  },
  methods: {
    async getClient () {
      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).get(`/clients/${this.clientID}`)
      return response.data
    },
    toggleShowJSON() {
      this.showJSON = !this.showJSON
    }
  }

}
</script>

<style scoped>
  pre.json {
    font-family: monospace, monospace;
    display: block;
    overflow: scroll;
    padding: 0.5em;
    color: white;
    background: #282a36;
  }
</style>