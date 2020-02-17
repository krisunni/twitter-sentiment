<template>
    <div>
        <v-container>
            <v-row dense>
                <v-col cols="12">
                    <v-card class="mx-auto">
                        <v-list-item two-line>
                            <v-list-item-content>
                                <v-list-item-title class="headline">{{ name }} {{ surname }}</v-list-item-title>
                                <v-list-item-subtitle>{{address}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-text>
                            <blockquote class="blockquote">{{ aboutMe }}</blockquote>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="mx-2" fab dark large color="primary" target="_blank"
                                   v-bind:href="`mailto:` + email">
                                <v-icon large> mdi-email</v-icon>
                            </v-btn>
                            <v-btn class="mx-2" fab dark large color="primary" target="_blank"
                                   href="https://www.linkedin.com/in/kunnikannan">
                                <v-icon large> mdi-linkedin</v-icon>
                            </v-btn>
                            <v-btn class="mx-2" fab dark large color="primary" target="_blank" href="https://github.com/krisunni">
                                <v-icon large> mdi-github-box</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-divider></v-divider>
                        <v-card flat>
                            <v-card-text>
                                <v-container fluid class="pa-0">
                                    <v-row>
                                        <v-col cols="12">
                                            <p>Applications</p>
                                        </v-col>

                                        <v-col cols="12" sm="3">
                                            <v-btn text icon color="blue">
                                                <v-icon large>mdi-twitter-box</v-icon>
                                            </v-btn>
                                        </v-col>

                                        <v-col cols="12" sm="3">
                                            <v-btn text icon color="indigo">
                                                <v-icon large>mdi-star</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                </v-col>
            </v-row>
        </v-container>


    </div>
</template>

<script>
    import resume from './../../../public/portfolio.json';

    export default {
        name: 'sentiment',
        data() {
            return resume

        },
        components: {},

        created() {
        }
    }

</script>

<style src="./home-styles.css"></style>
