<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <span class="mr-2">UPDATE CYRRENCY</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="cyrrency cyrrency_padding">
      <CurrentCurrency class="cyrrency__currentcyrency" />
      <AllCurrency class="cyrrency__allcyrency" />
    </div>
    <v-snackbar
      v-model="snackbar.run"
      :color="snackbar.color"
      :timeout="3000"
      right="right"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar.run = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import AllCurrency from "./components/AllCurrency";
import CurrentCurrency from "./components/CurrentCurrency";

export default {
  name: "App",

  components: {
    AllCurrency,
    CurrentCurrency,
  },

  data: () => ({
    //
  }),
  computed: {
    snackbar: {
      get() {
        return this.$store.getters.get("message");
      },
      set() {
        this.$store.commit("setMessange", { color: "", text: "", run: false });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.cyrrency {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 10px;
  background-color: rgba(116, 122, 120, 0.507);
  &_padding {
    padding: 56px 0px 0px 0px;
  }
}
</style>

