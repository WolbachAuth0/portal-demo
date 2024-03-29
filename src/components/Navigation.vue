<template>
	<div>
		<!-- Application bar -->
		<v-app-bar app clipped-left dark class="primary accent-4">
			<a id="logo" :href="oktahomeURL" target="__blank">
				<v-img :src="logo" contain max-height="50" max-width="225"></v-img>
			</a>

      <v-toolbar-title >
				Pre-Sales Demonstration
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-toolbar-title>
				<a id="auth0docs" :href="auth0docsURL" target="__blank">
					<v-img :src="auth0docs" contain max-height="64"></v-img>
				</a>
			</v-toolbar-title>
		</v-app-bar>

		<!-- Navigation Drawer -->
		<v-navigation-drawer app floating :clipped="true" permanent dark class="primary accent-4">
			
			<v-list>
				<!-- The user avatar, or empty avatar with login  -->
				<v-list-item v-if="$auth.isAuthenticated" class="px-2" link to="/profile">
					<v-list-item-avatar>
						<img :src="$auth.user.picture" :alt="$auth.user.name">
					</v-list-item-avatar>					
					<v-list-item-content v-if="$auth.isAuthenticated">
						<v-list-item-title class="text-h6">
							{{ $auth.user.name }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ $auth.user.email}}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-list-item v-else class="px-2" link @click="authenticate()" >
					<v-list-item-avatar color="secondary">
						<v-icon x-large>{{ mdiAccountCircle }}</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="text-h6">
							<!-- Login -->
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<!-- Login / Logout button -->
				<v-list-item @click="authenticate()">
					<v-list-item-icon>
						<v-icon>{{ signInOut.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ signInOut.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

			</v-list>

			<v-divider></v-divider>

			<v-list dense nav>
				<v-list-item v-for="item in routes" :key="item.title" :to="item.to">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import {
	mdiCogOutline,
	mdiHomeCircle,
	// mdiApplicationParenthesesOutline,
	mdiLogoutVariant,
	mdiLoginVariant,
	mdiAccountCircle, 
} from '@mdi/js'

export default {
	name: 'Navigation',
	data: () => ({
		appTitle: process.env.VUE_APP_TITLE,
		logo: require('../assets/okta-logo-white.svg'),
		auth0docs: require('../assets/auth0docs.svg'),
		oktahomeURL: 'https://www.okta.com/',
		auth0docsURL: 'https://auth0.com/docs'
	}),
	computed: {
		routes() {
			let routes = [
				{ title: 'Home', icon: mdiHomeCircle, to: '/', auth: false },
				{ title: 'Tokens', icon: mdiCogOutline, to: '/debug', auth: true }
			]
			return this.$auth.isAuthenticated ? routes : routes.filter(x => !x.auth)
		},
		signInOut() {
			return {
				icon: this.$auth.isAuthenticated ? mdiLogoutVariant : mdiLoginVariant,
				title: this.$auth.isAuthenticated ? 'Log Out' : 'Log In',
			}
		},
		mdiAccountCircle() {
			return mdiAccountCircle
		}
	},
	methods: {
		// https://auth0.com/blog/complete-guide-to-vue-user-authentication/#Add-User-Authentication
		async authenticate() {
			if (this.$auth.isAuthenticated) {
				// https://auth0.github.io/auth0-spa-js/interfaces/logoutoptions.html
				this.$auth.logout({ returnTo: process.env.VUE_APP_DOMAIN })
        this.$router.push({ path: '/' })
			} else {
				// https://auth0.github.io/auth0-spa-js/interfaces/redirectloginoptions.html
				const scopes = [ 'openid', 'profile', 'email' ]
				this.$auth.loginWithRedirect({ scope: scopes.join(' ') })
			}
		}
	}
}
</script>