<template>
    <v-data-table v-if="tweets && tweets.length"
                  :headers="headers"
                  :items="tweets"
                  :single-expand="singleExpand"
                  :expanded.sync="expanded"
                  item-key="id"
                  show-expand
                  class="elevation-1">
        <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length">{{item.text}}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "tweets",
        props: {
            tweets: {
                type: Array,
                default() {
                    return [];
                }
            },
        },
        data: () => ({
            expanded: [],
            singleExpand: false,
            headers: [
                {
                    text: 'Tweet ID',
                    align: 'left',
                    sortable: false,
                    value: 'id',
                },
                {text: 'Sentiment Score', value: 'score'},
                {text: 'DateTime', alight: 'left', sortable: true, value: 'time'}
            ]
        })
    }
</script>
