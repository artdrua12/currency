<template>
  <div class="tables">
    <v-card>
      <v-card-title>
        Текущие валюты
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :loading="loading"
        loading-text="Загрузка... Пожалуста подождите"
        :headers="headers"
        :items="currency"
        :search="search"
      >
        <template v-slot:item.Date="{ item }">
          {{
            Intl.DateTimeFormat("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(item.Date))
          }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data> Добавте данные кнопочкой ADD </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      initCurrency: ["USD", "EUR", "RUB"],
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
        { text: "", value: "actions", sortable: false },
      ],
    };
  },
  async mounted() {
    this.loading = true;
    await this.getAllCurrency();
    for (let abbreviation of this.initCurrency) {
      const findItem = this.allCurrency.find(
        (item) => item.Cur_Abbreviation == abbreviation
      );
      if (findItem) {
        this.isDublicate(findItem); // проверка на дубликат перед добавлением
      }
    }
    this.loading = false;
  },
  computed: {
    currency() {
      return this.$store.getters.get("currency");
    },
    allCurrency() {
      return this.$store.getters.get("allCurrency");
    },
  },
  methods: {
    ...mapActions(["getAllCurrency", "isDublicate"]),
    deleteItem(itemDelete) {
      const position = this.currency.findIndex((item) => item == itemDelete);
      if (position || position == 0) {
        this.currency.splice(position, 1);
        
        this.$store.commit("set", {
          name: "currency",
          value: this.currency,
        });
      }
    },
  },
};
</script>

