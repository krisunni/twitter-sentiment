<template>
    <div v-if="plotValues">

        <v-card class="mt-4 mx-auto">
            <v-sparkline
                    :value="plotValues"
                    :gradient="gradient"
                    :smooth="radius || false"
                    :padding="padding"
                    :line-width="lineWidth"
                    :stroke-linecap="lineCap"
                    :gradient-direction="gradientDirection"
                    :fill="fill"
                    :type="type"
                    :auto-line-width="autoLineWidth"
                    auto-draw
                    :show-labels="showLabels"
                    :label-size="labelSize">
            </v-sparkline>

            <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">{{screen_name}} Tweet Trend</div>
                <div class="subheading font-weight-light grey--text">Tweet sentiment plotted against time.</div>
                <v-divider class="my-2"></v-divider>
                <v-icon class="mr-2" small> mdi-clock</v-icon>
                <span class="caption grey--text font-weight-light">last tweet was at {{plotLabels[0]| formatDate}}</span>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
    const gradients = [
        ['#222'],
        ['#42b3f4'],
        ['red', 'orange', 'yellow'],
        ['purple', 'violet'],
        ['#00c6ff', '#F0F', '#FF0'],
        ['#f72047', '#ffd200', '#1feaea'],
    ]

    export default {
        name: "plot",
        props: {
            screen_name: String,
            last_tweet: String,
            plotValues: {
                type: Array,
                default() {
                    return [];
                }
            },
            plotLabels: {
                type: Array,
                default() {
                    return [];
                }
            },
        },
        data: () => ({
            showLabels: false,
            lineWidth: 2,
            labelSize: 7,
            radius: 10,
            padding: 8,
            lineCap: 'round',
            gradient: gradients[5],
            gradientDirection: 'bottom',
            gradients,
            fill: false,
            type: 'trend',
            autoLineWidth: false,
        }),
    }
</script>

<style src="./plot-styles.css"></style>
