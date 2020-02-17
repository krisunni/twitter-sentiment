<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="me.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-title>Portfolio</v-list-item-title>
                    <v-btn icon @click.stop="drawer = !drawer">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                </v-list-item>
                <v-divider></v-divider>
                <v-list dense>
                    <v-list-item v-for="item in items" :key="item.title" link  @click.stop="switchShowContent(item)" >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{ showContent.title }}</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <v-container class="fill-height">
                <v-layout align-center justify-center>
                    <v-flex>
                        <sentiment v-show="switchContentOn('sentiment')"></sentiment>
                        <house  v-show="switchContentOn('house')"></house>
                        <home  v-if="switchContentOn('home')"></home>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app>
            <span>Inspirante 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    import Sentiment from "./components/sentiment/Sentiment";
    import House from "./components/house/House";
    import Home from "./components/home/Home";

    export default {
        components: {
            Sentiment,
            House,
            Home
        },
        props: {
            source: String,
        },
        data() {
            return {
                drawer: false,
                items: [
                    {title: 'Home', icon: 'mdi-home-city', content: 'home'},
                    {title: 'Twitter Sentiment', icon: 'mdi-twitter-box', content: 'sentiment'},
                    {title: 'Kijiji Housing Prices', icon: 'mdi-home-modern', content: 'house'},
                ],
                showContent:  {title: 'Home', icon: 'mdi-home-city', content: 'home'}
            }
        },
        methods: {
            switchContentOn: function (content) {
                return this.showContent.content === content;
            },
            switchShowContent: function (item) {
                this.showContent = item;
                this.drawer = !this.drawer
            }
        },
        created() {
            this.$vuetify.theme.dark = true
        },
    }
</script>
