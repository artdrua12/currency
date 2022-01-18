<template>
  <div class="tables">
    <v-card>
      <v-card-title>
        CYRRENCY TODAY
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :loading="loading"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="tablesData"
        :search="search"
      >
        <template v-slot:item.Date="{ item }">
          {{
            Intl.DateTimeFormat("ru", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(item.Date))
          }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      loading: false,
      search: "",
      headers: [
        {
          text: "Дата",
          align: "start",
          sortable: false,
          value: "Date",
        },
        { text: "Код валюты", value: "Cur_Abbreviation" },
        { text: "Название", value: "Cur_Name" },
        { text: "Курс", value: "Cur_OfficialRate" },
      ],
      tablesData: [],
    };
  },
  computed: mapState({
    count: (state) => state.currency,
  }),
  async mounted() {
    this.loading = true;
    await this.getData();
    this.tablesData = this.count;
    this.loading = false;
  },
  methods: {
    ...mapActions({
      getData: "getCurrency", // проксирует `this.add()` в `this.$store.dispatch('increment')`
    }),
    async getFork(item) {
      try {
        this.loading = true;
        await this.$store.dispatch("getFork", item);
        this.forks = await this.$store.state.forks;
        this.dialog = true;
        this.loading = false;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async addFaforite(item) {
      this.loadFavor = true;
      await this.$store.dispatch("addFavorites", item);
      this.loadFavor = false;
    },
  },
};
</script>
