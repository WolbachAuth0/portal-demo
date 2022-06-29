<template>
  <v-card class="mx-auto">
    
    <v-card-title>
      <v-avatar tile>
        <v-img :src="sheild" contain max-height="50"></v-img>
      </v-avatar>
      {{ appTitle }}
    </v-card-title>

    <v-sheet class="blue lighten-5">
    
      <div v-if="$auth.isAuthenticated">
        <v-card-subtitle>
          <v-avatar>
            <img :src="$auth.user.picture" :alt="$auth.user.name">
          </v-avatar>
          <h3>Welcome {{ $auth.user.nickname }}!</h3>
        </v-card-subtitle>
        <v-card-text>
          User ({{ $auth.user.email}}) has access to the following applications;
        </v-card-text>
      </div>
      <div v-else>
        <v-card-subtitle >
          <h3>Introduction</h3>
        </v-card-subtitle>

        <v-card-text>
          Welcome to the Okta | Auth0 Portal Demonstration application. The purpose of this application is to 
          demonstrate the single sign-on (SSO) capability of the Auth0 platform. This application behaves as gateway
          for three other independent applications. When a user logs into this portal app, he or she will be presented
          with the applications that have been assigned to the user. For each application there will be a "Login" 
          button which allows the current user to navigate to those apps without being prompted for re-authentication. 
        </v-card-text>

        <v-card-text>
          A description of the applications and users which are set up for this portal is below. After you have read
          through these docs, login to this portal to try it out.
        </v-card-text>

        <v-card-subtitle>
          <h3>Applications</h3>
        </v-card-subtitle>

        <v-card-text>
          There are three applications which this portal app behaves as a gateway. These apps are primarily examples
          just to demonstrate logging in and logging out. With the exception of the Salesforce SSO application, the 
          apps don't do anything dangerous. The Salesforce SSO application is here to demonstrate the capability of
          Auth0 to behave as a SAML identity provider (IdP) into third party SaaS applications. Please note that each
          of these applications is deployed on a free-tier of Heroku. As such, it may take a moment for them to spin up
          if they haven't been accessed in the last 20 minutes.
        </v-card-text>

        <v-list-item two-line v-for="app in applications" :key="app.name">
          <v-list-item-avatar>
              <img :src="app.logo" :alt="app.name">
            </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ app.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ app.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-subtitle>
          <h3>Users</h3>
        </v-card-subtitle>

        <v-card-text>
          There are four users provisioned to this portal. The table below describes the applications each user
          has been provisioned to. To try this out, ask your Okta Account Representative for the credentials for
          each user.
        </v-card-text>

        <v-simple-table class="rounded-lg px-5 mx-5">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  User
                </th>
                <th class="text-left">
                  Applications
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.email">
                <td>{{ user.email }}</td>
                <td>{{ user.apps.join(', ') }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>


        <v-card-text>
          In order to access a user's assigned applications, you must first login to the portal application.
        </v-card-text>
      </div>

      <v-container fluid v-if="$auth.isAuthenticated">
        <v-row dense>
          <v-col v-for="clientID of clientIDs" :key="clientID" cols="6">
            <application :clientID="clientID"></application>
          </v-col>
        </v-row>
      </v-container>

    </v-sheet>
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
      sheild: require('../assets/shield.svg'),
      applications: [
        {
          name: 'Sample React SPA',
          logo: 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg',
          description: 'A single page application based on the Auth0 React.js quickstart.'
        },
        {
          name: 'Sample NodeJS Web App',
          logo: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg',
          description: 'A regualar web application based on Node.js and Express.js using the EJS templating engine.'
        },
        {
          name: 'Salesforce SSO',
          logo: 'https://www.vectorlogo.zone/logos/salesforce/salesforce-icon.svg',
          description: 'The author\'s personal Salesforce Developer trial tenant.'
        },
      ],
      users: [
        {
          email: 'double.user@gmail.com',
          apps: [
            'Sample React SPA',
            'Sample NodeJS Web APP'
          ]
        },
        {
          email: 'node.user@gmail.com',
          apps: [
            'Sample NodeJS Web APP'
          ]
        },
        {
          email: 'react.user@gmail.com',
          apps: [
            'Sample React SPA'
          ]
        },
        {
          email: 'salesforce.user@gmail.com',
          apps: [
            'Salesforce SSO'
          ]
        },
      ]
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
