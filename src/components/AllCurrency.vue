<template>
  <div class="tables">
    <v-card>
      <v-card-title>
        Все валюты
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
        :items="allCurrency"
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
          <v-btn color="primary" @click="addItem(item)"> add</v-btn>
        </template>
        <template v-slot:no-data>
          Произошла ошибка при загрузке данных, нажмите GET ALL CURRENCY.
        </template>
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
  computed: {
    allCurrency() {
      return this.$store.getters.get("allCurrency");
    },
  },
  methods: {
    ...mapActions(["isDublicate"]),
    addItem(item) {
      this.isDublicate(item);
    },
  },
};
</script>

