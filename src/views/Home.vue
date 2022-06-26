<template>
  <v-card class="mx-auto">
    <v-card-title>
      {{ appTitle }}
    </v-card-title>

    <v-card-subtitle v-if="$auth.isAuthenticated">
      <v-avatar>
        <img :src="$auth.user.picture" :alt="$auth.user.name">
      </v-avatar>
      Welcome {{ $auth.user.nickname }}!
    </v-card-subtitle>
    <v-card-subtitle v-else>
      Please Login
    </v-card-subtitle>

    <v-card-text v-if="$auth.isAuthenticated">
      User ({{ $auth.user.email}}) has access to the following applications.
    </v-card-text>
    <v-card-text v-else>
      In order to access a user's assigned applications, the must first login to the portal application.
    </v-card-text>

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
