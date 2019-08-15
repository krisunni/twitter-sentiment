<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item @click="show=!show">
                    <v-list-item-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Twitter Sentiment</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex>
                        <sentiment v-if="show"></sentiment>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>

        <v-footer app>
            <span>&copy; Inspirante 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    import Sentiment from "./components/sentiment/Sentiment";


    export default {
        components: {
            Sentiment
        },
        props: {
            source: String,
        },

        data: () => ({
            drawer: null,
            show: true
        }),

        created() {
            this.$vuetify.theme.dark = true
        },
    }
</script>
