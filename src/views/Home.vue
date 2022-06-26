<template>
  <v-card class="mx-auto">
    <v-card-title>
      {{ appTitle }}
    </v-card-title>

    <v-card-text v-if="!$auth.isAuthenticated">
      Login into the portal app to access your third party applications.
    </v-card-text>
    <v-card-subtitle v-else>
      <v-avatar>
        <img :src="$auth.user.picture" :alt="$auth.user.name">
      </v-avatar>
      Welcome {{ $auth.user.name }}!
    </v-card-subtitle>

    <v-container fluid v-if="$auth.isAuthenticated">
      <v-row dense>
        <v-col v-for="clientID of clientIDs" :key="clientID" cols="6">
          <application :clientID="clientID"></application>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Application from '../components/Application.vue'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Home'
  },
  components: {
		Application
	},
  data() {
    return {
      appTitle: process.env.VUE_APP_TITLE,
    }
  },
  computed: {
    clientIDs () {
      if (this.$auth.isAuthenticated) {
        // return list of client ID's the user is permitted to use.
        const claim = `https://auth0-portal-demo.herokuapp.com/allowed-apps`
        return this.$auth.user[claim]
      } else {
        return []
      }
    }
  },
  methods: {
  }
}
</script>
