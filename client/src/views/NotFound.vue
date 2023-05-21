<template>
  <app-page title="Такой страницы не сушествует">
    <div class="container">
      <div class="py-4">
        <h4 class="text-center mb-2">Ошибка 404</h4>
        <p class="text-center">Такой страницы не существует</p>
        <p class="text-center">
          <router-link class="text-center" to="/"
            >Вернуться на главную</router-link
          >
        </p>
      </div>
    </div>
  </app-page>
</template>

<script>
import AppPage from "../components/ui/AppPage.vue";
export default {
  components: { AppPage },
};
</script>

<style></style>
