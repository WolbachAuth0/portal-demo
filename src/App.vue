<template>
	<v-app id="app">
		<navigation></navigation>
		
		<v-fade-transition mode="out-in" duration type="animation">
			<v-main dark>		
				<v-container fluid>
					<v-layout align-center justify-center>
						<v-flex>
        			<router-view :key="$route.fullPath"></router-view>
						</v-flex>
					</v-layout>
				</v-container>
			</v-main>
		</v-fade-transition>
		
		<v-footer app>
			<span></span>
		</v-footer>
	</v-app>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
	name: 'app',
	components: {
		Navigation
	},
	metaInfo: {
		titleTemplate: `${process.env.VUE_APP_TITLE} | %s`
	},
	data() {
		return {
		}
	},
	mounted() {
		if (process.env.VUE_APP_MODE === 'development') {
			console.log('node_env: ', process.env.NODE_ENV)
			console.log('clientid: ', process.env.VUE_APP_AUTH0_CLIENT_ID)
			console.log('auth0 domain: ', process.env.VUE_APP_AUTH0_DOMAIN)
			console.log('vue app api host: ', process.env.VUE_APP_API_HOST)
			console.log('vue app domain: ', process.env.VUE_APP_DOMAIN)
			console.log('vue app audience: ', process.env.VUE_APP_AUTH0_AUDIENCE)
		}
	},
	methods: {
	}
}
</script>

<style scoped>
	main {
		background: #797979;
	}
</style>