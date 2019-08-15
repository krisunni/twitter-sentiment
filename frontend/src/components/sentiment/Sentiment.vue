<template>
    <div>
        <v-alert
                v-model="alert"
                dismissible
                dense
                :type="typeOfIcon"
                :icon="icon">
            {{message}}
        </v-alert>
        <v-form>
            <v-container grid-list-xl>
                <v-layout wrap>
                    <v-text-field v-model="screen_name" label="Twitter Handle"></v-text-field>
                    <div class="text-center">
                        <v-btn class="gettweets" v-bind="options" @click="getNewTweets" v-on:keyup.enter="getNewTweets">
                            Get Tweets
                        </v-btn>
                    </div>
                </v-layout>
            </v-container>
        </v-form>
        <plot :plotValues="plotValues" :plotLabels="plotLabels" :screen_name="screen_name"></plot>
        <tweets :tweets="tweets"></tweets>
    </div>
</template>

<script>
    import Tweets from '../tweets/Tweets'
    import Plot from '../plot/Plot'
    import axios from 'axios';

    axios.defaults.timeout = process.env.VUE_APP_DEFAULT_TIMEOUT;

    function setLoadingProps(message, icon, type) {
        this.disabled = true;
        this.loading = true;
        this.alert = true;
        this.typeOfIcon = type;
        this.message = message;
        this.icon = icon;
        setTimeout(() => {
            this.alert = false;
        }, process.env.VUE_APP_DEFAULT_TIMEOUT);
    }

    function getTweets() {
        setLoadingProps.call(this, "Getting Tweets", 'mdi-twitter', 'info');
        let getTweetsPath;
        if (this.lastTweetID == null) {
            getTweetsPath = `${process.env.VUE_APP_API_HOST_N_PORT}/api/tweets/${this.screen_name}`;
        } else {
            getTweetsPath = `${process.env.VUE_APP_API_HOST_N_PORT}/api/tweets/${this.screen_name}?max_id=${this.lastTweetID}`;
        }
        this.plotValues = [];
        this.plotLabels = [];
        axios
            .get(`${getTweetsPath}`)
            .then(response => {
                    let processedTweets = [];
                    let value = [];
                    let labels = [];
                    let data = response.data.tweets;
                    data.forEach(function (tweet) {
                        var processedTweet = {
                                id: tweet[0],
                                score: tweet[1].sentiment.score,
                                text: tweet[1].data.text,
                                time: tweet[1].data.created_at,
                            }
                        ;
                        value.push(processedTweet.score);
                        labels.push(processedTweet.time);
                        processedTweets.push(processedTweet);
                    });
                    this.tweets = processedTweets;
                    this.plotValues = value;
                    this.plotLabels = labels;
                }
            ).catch(function (res) {
            // setLoadingProps.call(this, 'Timeout from Backend Server', 'mdi-firework', 'error');
            if (res instanceof Error) {
                console.log(res.message);
            } else {
                console.log(res.data);
            }
        }).finally(this.resetButton.call(this)
        );
    }

    export default {
        name: 'sentiment',
        data() {
            return {
                tweets:[],
                plotValues: [],
                plotLabels: [],
                screen_name: process.env.VUE_APP_DEFAULT_SCREEN_NAME,
                loading: false,
                disabled: false,
                alert: false,
                message: "",
                icon: "",
                typeOfIcon: 'info',
            }

        },
        components: {
            Tweets,
            Plot
        },
        methods: {
            getNewTweets() {
                getTweets.call(this);
            },
            resetButton() {
                this.disabled = false;
                this.loading = false;
            }
        },
        watch: {
            'screen_name': function(val, oldVal){
                if (val < 50) {
                    this.message= 'Value Didnt Change';
                }else{
                    this.message= 'value is ok';
                }
            }
        },
        computed: {
            options() {
                const options = {
                    color: "primary",
                    loading: this.loading,
                    disabled: this.disabled,
                    height: "50px"
                };
                return options
            },

        },
        watch: {},
        created() {
            getTweets.call(this);
        }
    }

</script>

<style src="./sentiment-styles.css"></style>
