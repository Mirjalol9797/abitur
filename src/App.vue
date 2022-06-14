<template>
  <div id="app">
    <header class="header">
      <div class="site-container header-wrap">
        <router-link to="/" class="site-logo">
          <img src="@/assets/images/logo.png" alt="" />
        </router-link>
        <div class="site-nav">
          <router-link :to="{ name: 'test' }">Тесты</router-link>
          <router-link :to="{ name: 'university' }">ВУЗы</router-link>
          <router-link :to="{ name: 'quota2022' }">Прием 2021</router-link>
          <router-link to="/">Новости</router-link>
        </div>
      </div>
    </header>
    <router-view />
    <footer class="footer">
      <div class="footer-wrap site-container">
        <div class="footer__top">
          <div class="footer-social">
            <a href="#" class="email social-item">
              <b-icon icon="telegram"></b-icon>
              <span>Telegram</span>
            </a>
            <a href="mailto:info@abitur.uz" class="telegram social-item">
              <b-icon icon="mailbox"></b-icon>
              <span>info@abitur.uz</span>
            </a>
          </div>
          <div class="footer-nav">
            <router-link to="">Тесты</router-link>
            <router-link :to="{ name: 'university' }">ВУЗы</router-link>
            <router-link :to="{ name: 'quota2022' }">Кабул 2022</router-link>
            <router-link to="/">Новости</router-link>
          </div>
        </div>
        <div class="footer__bottom">
          <div class="copyright">
            Copyright © 2020-2022. Система было разработана Исломовом Ш.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
