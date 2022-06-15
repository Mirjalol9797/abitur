<template>
  <div class="home-page">
    <div class="site-wrapper">
      <main class="main">
        <div class="site-container">
          <!-- университеты -->
          <section class="main-universe home-wrap">
            <div class="home-top">
              <div class="home-title">Университеты</div>
              <router-link :to="{ name: 'university' }">Все ВУЗы</router-link>
            </div>
            <carousel
              class="site-slider"
              :responsive="{
                0: { items: 1 },
                567: { items: 2 },
                992: { items: 3 },
              }"
              :margin="20"
              :nav="false"
              :loop="true"
              :autoplay="true"
              :autoplaySpeed="300"
              :autoplayTimeout="4000"
            >
              <router-link
                class="site-slider__item"
                v-for="(item, index) in univers"
                :key="index"
                :to="{ name: 'university-detail', params: { id: item.id } }"
              >
                <div class="site-slider__img">
                  <img :src="`${item.image}`" />
                </div>
                <div class="site-slider__title">
                  {{ item.name }}
                </div>
              </router-link>
            </carousel>
          </section>
          <!-- тесты -->
          <section class="main-tests home-wrap">
            <div class="home-top">
              <div class="home-title">Тесты по предметам</div>
              <router-link :to="{ name: 'test' }">Все предметы</router-link>
            </div>
            <div class="tests-wrap">
              <router-link
                :to="{ name: 'test-detail', params: { id: 1 } }"
                class="tests-item"
                >Английский язык</router-link
              >
              <router-link
                :to="{ name: 'test-detail', params: { id: 2 } }"
                class="tests-item"
                >История</router-link
              >
              <router-link to="/" class="tests-item">Математика</router-link>

              <router-link
                :to="{ name: 'test-detail', params: { id: 3 } }"
                class="tests-item"
                >География</router-link
              >
              <router-link to="/" class="tests-item">Биология</router-link>
              <router-link to="/" class="tests-item"
                >Русский язык и литература</router-link
              >
            </div>
          </section>
          <!-- новости -->
          <section class="main-news home-wrap">
            <div class="home-top">
              <div class="home-title">Hовости</div>
              <router-link to="/">Смотреть все</router-link>
            </div>
            <carousel
              class="site-slider"
              :responsive="{
                0: { items: 1 },
                567: { items: 2 },
                992: { items: 3 },
              }"
              :margin="20"
              :nav="false"
              :loop="true"
              :autoplay="true"
              :autoplaySpeed="300"
              :autoplayTimeout="4000"
            >
              <div class="site-slider__item">
                <div class="site-slider__img">
                  <img src="@/assets/images/university/tatu.jpg" />
                </div>
                <div class="site-slider__title">
                  Выпускники Президентских школ, обучающиеся в зарубежных вузах,
                  получат субсидии
                </div>
              </div>
              <div class="site-slider__item">
                <div class="site-slider__img">
                  <img src="@/assets/images/university/andu.jpg" />
                </div>
                <div class="site-slider__title">
                  Стало известно, сколько молодых людей в этом году оканчивают
                  школы
                </div>
              </div>
              <div class="site-slider__item">
                <div class="site-slider__img">
                  <img src="@/assets/images/university/tatu.jpg" />
                </div>
                <div class="site-slider__title">
                  Абитуриентам может быть предоставлена ​​возможность подавать
                  документы на несколько форм обучения одновременно
                </div>
              </div>
              <div class="site-slider__item">
                <div class="site-slider__img">
                  <img src="@/assets/images/university/anduagrar.jpg" />
                </div>
                <div class="site-slider__title">
                  С 1 июня вырастут штрафы, налоги и госпошлина. А как насчет
                  стипендий и контрактов?
                </div>
              </div>
            </carousel>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
export default {
  name: "Home",
  components: { carousel },
  data() {
    return {
      univers: [
        {
          id: "1", // уникал ракам бир хил буп комасин
          name: "ТАШКЕНТСКИЙ УНИВЕРСИТЕТ ИНФОРМАЦИОННЫХ ТЕХНОЛОГИЙ", //универ номи
          city: "город Ташкент", // кайси шахарда жойлашганлиги
          address:
            "г. Ташкент, Юнусабадский район, пр. Амира Темура, 108, почтовый индекс: 100202", // адресс
          phone: "0 (371) 238 64 20", // телефон номери
          image:
            "data:image/jpeg;base64,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", // университет расми уни алохида битта файл киб тур
          type: [
            {
              id: 1,
              name: "ochniy",
            },
            {
              id: 2,
              name: "zauchniy",
            },
          ],
          lang: [
            {
              id: 1,
              name: "rus",
            },
            {
              id: 2,
              name: "uzbek",
            },
          ],
          year: [
            {
              id: 1,
              name: "2020-2021",
            },
            {
              id: 2,
              name: "2021-2022",
            },
          ],
          // очный узбекский 2020-2021
          direction_type1_lang1_year1: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Axborot xavfsizligi (sohalar bo‘yicha)", // юналиш номи
              kod: 5330300, // юналиш коди
              grand_count: 15, // градлар сони
              kontrakt_count: 60, // контракт сони
              obshiy_count: 75, // гранд ва контрак сонлари йигиндиси
              grand_ball: 182.8, // грантга утиш балл
              kontrakt_ball: 164.0, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Axborot-kommunikatsiya texnologiyalari sohasida iqtisodiyot va menejment",
              kod: 5350300,
              grand_count: 3,
              kontrakt_count: 25,
              obshiy_count: 28,
              grand_ball: 173.2,
              kontrakt_ball: 157.3,
            },
            {
              id: 3,
              name: "Kompyuter injiniringi: “Kompyuter injiniringi”",
              kod: 5330501,
              grand_count: 30,
              kontrakt_count: 70,
              obshiy_count: 100,
              grand_ball: 173.0,
              kontrakt_ball: 160.2,
            },
          ],
          // очный узбекский 2021-2022
          direction_type1_lang1_year2: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Axborot xavfsizligi (sohalar bo‘yicha)", // юналиш номи
              kod: 5330300, // юналиш коди
              grand_count: 20, // градлар сони
              kontrakt_count: 80, // контракт сони
              obshiy_count: 100, // гранд ва контрак сонлари йигиндиси
              grand_ball: 168, // грантга утиш балл
              kontrakt_ball: 125, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Axborot-kommunikatsiya texnologiyalari sohasida iqtisodiyot va menejment",
              kod: 5350300,
              grand_count: 14,
              kontrakt_count: 40,
              obshiy_count: 54,
              grand_ball: 172.2,
              kontrakt_ball: 138.6,
            },
            {
              id: 3,
              name: "Kompyuter injiniringi: “Kompyuter injiniringi”",
              kod: 5330501,
              grand_count: 30,
              kontrakt_count: 75,
              obshiy_count: 105,
              grand_ball: 160.7,
              kontrakt_ball: 113.4,
            },
          ],
          // очный русский 2020-2021
          direction_type1_lang2_year1: [
            {
              id: 1,
              name: "Информационная безопасность (по отраслям)",
              kod: 5330300,
              grand_count: 5,
              kontrakt_count: 45,
              obshiy_count: 50,
              grand_ball: 173.3,
              kontrakt_ball: 106.9,
            },
            {
              id: 2,
              name: "Экономика и менеджмент в сфере информационно-коммуникационных технологий",
              kod: 5350300,
              grand_count: 2,
              kontrakt_count: 20,
              obshiy_count: 22,
              grand_ball: 179.4,
              kontrakt_ball: 153.8,
            },
            {
              id: 3,
              name: "Компьютер инжиниринг: Компьютер инжиниринг",
              kod: 5330501,
              grand_count: 10,
              kontrakt_count: 40,
              obshiy_count: 50,
              grand_ball: 126.8,
              kontrakt_ball: 85.6,
            },
          ],
          // очный русский 2021-2022
          direction_type1_lang2_year2: [
            {
              id: 1,
              name: "Информационная безопасность (по отраслям)",
              kod: 5330300,
              grand_count: 10,
              kontrakt_count: 15,
              obshiy_count: 25,
              grand_ball: 138.6,
              kontrakt_ball: 101.9,
            },
            {
              id: 2,
              name: "Экономика и менеджмент в сфере информационно-коммуникационных технологий",
              kod: 5350300,
              grand_count: 6,
              kontrakt_count: 15,
              obshiy_count: 21,
              grand_ball: 158.6,
              kontrakt_ball: 135.5,
            },
            {
              id: 3,
              name: "Компьютер инжиниринг: Компьютер инжиниринг",
              kod: 5330501,
              grand_count: 20,
              kontrakt_count: 25,
              obshiy_count: 45,
              grand_ball: 120.8,
              kontrakt_ball: 91.4,
            },
          ],
          // Заочная узбекский 2020-2021
          direction_type2_lang1_year1: [
            {
              id: 1,
              name: "Axborot xavfsizligi (sohalar bo‘yicha)",
              kod: 5330300,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 132.8,
            },
            {
              id: 2,
              name: "Elektron tijorat",
              kod: 5232800,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 125.0,
            },
          ],
          // Заочная узбекский 2021-2022
          direction_type2_lang1_year2: [
            {
              id: 1,
              name: "Axborot xavfsizligi (sohalar bo‘yicha)",
              kod: 5330300,
              grand_count: 0,
              kontrakt_count: 35,
              obshiy_count: 35,
              grand_ball: "-",
              kontrakt_ball: 121.8,
            },
            {
              id: 2,
              name: "Axborot-kommunikatsiya texnologiyalari sohasida kasb ta’limi",
              kod: 5350400,
              grand_count: 0,
              kontrakt_count: 17,
              obshiy_count: 17,
              grand_ball: "-",
              kontrakt_ball: 88.2,
            },
          ],
          // Заочная русский 2020-2021
          direction_type2_lang2_year1: [
            {
              id: 1,
              name: "Информационная безопасность (по отраслям)",
              kod: 5330300,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 72.7,
            },
            {
              id: 2,
              name: "Электронная коммерция",
              kod: 5232800,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 112.4,
            },
          ],
          // Заочная русский 2021-2022
          direction_type2_lang2_year2: [
            {
              id: 1,
              name: "Информационная безопасность (по отраслям)",
              kod: 5330300,
              grand_count: 0,
              kontrakt_count: 15,
              obshiy_count: 15,
              grand_ball: "-",
              kontrakt_ball: 85.1,
            },
            {
              id: 2,
              name: "Электронная коммерция",
              kod: 5232800,
              grand_count: 0,
              kontrakt_count: 15,
              obshiy_count: 15,
              grand_ball: "-",
              kontrakt_ball: 79.8,
            },
          ],
        },
        {
          id: "2", // уникал ракам бир хил буп комасин
          name: "ФЕРГАНСКИЙ ФИЛИАЛ ТАШКЕНТСКОГО УНИВЕРСИТЕТА ИНФОРМАЦИОННЫХ ТЕХНОЛОГИЙ", //универ номи
          city: "Ферганская область", // кайси шахарда жойлашганлиги
          address:
            "Ферганская область, город Фергана, улица Мустакиллик, дом 185, почтовый индекс: 150118", // адресс
          phone: "0 (373) 226 82 09", // телефон номери
          image:
            "data:image/jpeg;base64,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", // университет расми уни алохида битта файл киб тур
          type: [
            {
              id: 1,
              name: "ochniy",
            },
            {
              id: 2,
              name: "zauchniy",
            },
          ],
          lang: [
            {
              id: 1,
              name: "rus",
            },
            {
              id: 2,
              name: "uzbek",
            },
          ],
          year: [
            {
              id: 1,
              name: "2020-2021",
            },
            {
              id: 2,
              name: "2021-2022",
            },
          ],
          // очный узбекский 2020-2021
          direction_type1_lang1_year1: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Axborot xavfsizligi (sohalar bo‘yicha)", // юналиш номи
              kod: 5330300, // юналиш коди
              grand_count: 5, // градлар сони
              kontrakt_count: 20, // контракт сони
              obshiy_count: 25, // гранд ва контрак сонлари йигиндиси
              grand_ball: 167.3, // грантга утиш балл
              kontrakt_ball: 137.9, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Dasturiy injiniring",
              kod: 5330600,
              grand_count: 15,
              kontrakt_count: 60,
              obshiy_count: 75,
              grand_ball: 157.7,
              kontrakt_ball: 79.1,
            },
            {
              id: 3,
              name: "Kompyuter injiniringi: “Kompyuter injiniringi”",
              kod: 5330501,
              grand_count: 10,
              kontrakt_count: 65,
              obshiy_count: 75,
              grand_ball: 145.3,
              kontrakt_ball: 116.6,
            },
          ],
          // очный узбекский 2021-2022
          direction_type1_lang1_year2: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Axborot xavfsizligi (sohalar bo‘yicha)", // юналиш номи
              kod: 5330300, // юналиш коди
              grand_count: 10, // градлар сони
              kontrakt_count: 15, // контракт сони
              obshiy_count: 25, // гранд ва контрак сонлари йигиндиси
              grand_ball: 152.3, // грантга утиш балл
              kontrakt_ball: 112.4, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Dasturiy injiniring",
              kod: 5330600,
              grand_count: 10,
              kontrakt_count: 20,
              obshiy_count: 30,
              grand_ball: 154.4,
              kontrakt_ball: 109.2,
            },
            {
              id: 3,
              name: "Kompyuter injiniringi: “Kompyuter injiniringi”",
              kod: 5330501,
              grand_count: 20,
              kontrakt_count: 140,
              obshiy_count: 160,
              grand_ball: 138.6,
              kontrakt_ball: 84.0,
            },
          ],
          // очный русский 2020-2021
          direction_type1_lang2_year1: [
            {
              id: 1,
              name: "Программный инжиниринг",
              kod: 5330600,
              grand_count: 5,
              kontrakt_count: 45,
              obshiy_count: 50,
              grand_ball: 123.0,
              kontrakt_ball: 69.5,
            },
            {
              id: 2,
              name: "Компьютер инжиниринг: (АТ-сервис)",
              kod: 5350502,
              grand_count: 3,
              kontrakt_count: 22,
              obshiy_count: 25,
              grand_ball: 110.9,
              kontrakt_ball: 69.3,
            },
            {
              id: 3,
              name: "Компьютер инжиниринг: Компьютер инжиниринг",
              kod: 5330501,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 116.9,
              kontrakt_ball: 72.3,
            },
          ],
          // очный русский 2021-2022
          direction_type1_lang2_year2: [
            {
              id: 1,
              name: "Программный инжиниринг",
              kod: 5330600,
              grand_count: 5,
              kontrakt_count: 15,
              obshiy_count: 20,
              grand_ball: 113.4,
              kontrakt_ball: 75.6,
            },
            {
              id: 2,
              name: "Компьютер инжиниринг: (АТ-сервис)",
              kod: 5350502,
              grand_count: 5,
              kontrakt_count: 15,
              obshiy_count: 20,
              grand_ball: 88.2,
              kontrakt_ball: 69.3,
            },
            {
              id: 3,
              name: "Компьютер инжиниринг: Компьютер инжиниринг",
              kod: 5330501,
              grand_count: 5,
              kontrakt_count: 15,
              obshiy_count: 20,
              grand_ball: 88.2,
              kontrakt_ball: 69.3,
            },
          ],
          // Заочная узбекский 2020-2021
          direction_type2_lang1_year1: [
            {
              id: 1,
              name: "Kompyuter injiniringi: “Kompyuter injiniringi”",
              kod: 53300501,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 91.4,
            },
            {
              id: 2,
              name: "Telekommunikatsiya texnologiyalari (“Telekommunikatsiyalar”)",
              kod: 5350101,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 81.4,
            },
          ],
          // Заочная узбекский 2021-2022
          direction_type2_lang1_year2: [
            {
              id: 1,
              name: "Kompyuter injiniringi: “Kompyuter injiniringi”",
              kod: 5330501,
              grand_count: 0,
              kontrakt_count: 30,
              obshiy_count: 30,
              grand_ball: "-",
              kontrakt_ball: 92.4,
            },
            {
              id: 2,
              name: "Telekommunikatsiya texnologiyalari (“Telekommunikatsiyalar”)",
              kod: 5350101,
              grand_count: 0,
              kontrakt_count: 30,
              obshiy_count: 30,
              grand_ball: "-",
              kontrakt_ball: 85.1,
            },
          ],
          // Заочная русский 2020-2021
          direction_type2_lang2_year1: [
            {
              id: 1,
              name: "Компьютер инжиниринг",
              kod: 5330501,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 69.3,
            },
            {
              id: 2,
              name: "Телекоммуникационные технологии («Телекоммуникации»)",
              kod: 5232800,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 66.4,
            },
          ],
          // Заочная русский 2021-2022
          direction_type2_lang2_year2: [
            {
              id: 1,
              name: "Телекоммуникационные технологии («Телекоммуникации»)",
              kod: 5350101,
              grand_count: 0,
              kontrakt_count: 20,
              obshiy_count: 20,
              grand_ball: "-",
              kontrakt_ball: 74.6,
            },
            {
              id: 2,
              name: "Компьютер инжиниринг",
              kod: 5330501,
              grand_count: 0,
              kontrakt_count: 20,
              obshiy_count: 20,
              grand_ball: "-",
              kontrakt_ball: 74.6,
            },
          ],
        },
        {
          id: "3", // уникал ракам бир хил буп комасин
          name: "ФЕРГАНСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ", //универ номи
          city: "Ферганская область", // кайси шахарда жойлашганлиги
          address:
            "Ферганская область, город Фергана, улица Мураббийлар, дом 19, почтовый индекс: 150100", // адресс
          phone: "0 (373) 244 44 02", // телефон номери
          image:
            "data:image/jpeg;base64,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", // университет расми уни алохида битта файл киб тур
          type: [
            {
              id: 1,
              name: "ochniy",
            },
            {
              id: 2,
              name: "zauchniy",
            },
          ],
          lang: [
            {
              id: 1,
              name: "rus",
            },
            {
              id: 2,
              name: "uzbek",
            },
          ],
          year: [
            {
              id: 1,
              name: "2020-2021",
            },
            {
              id: 2,
              name: "2021-2022",
            },
          ],
          // очный узбекский 2020-2021
          direction_type1_lang1_year1: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Agronomiya: anorchilik", // юналиш номи
              kod: 5410215, // юналиш коди
              grand_count: 5, // градлар сони
              kontrakt_count: 20, // контракт сони
              obshiy_count: 25, // гранд ва контрак сонлари йигиндиси
              grand_ball: 141.6, // грантга утиш балл
              kontrakt_ball: 110.6, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Amaliy matematika",
              kod: 5130200,
              grand_count: 20,
              kontrakt_count: 30,
              obshiy_count: 50,
              grand_ball: 157.7,
              kontrakt_ball: 129.5,
            },
            {
              id: 3,
              name: "Buxgalteriya hisobi va audit (tarmoqlar bo‘yicha)",
              kod: 5230900,
              grand_count: 1,
              kontrakt_count: 24,
              obshiy_count: 25,
              grand_ball: 160.3,
              kontrakt_ball: 116.6,
            },
            {
              id: 4,
              name: "Filologiya va tillarni o‘qitish: ingliz tili",
              kod: 5120112,
              grand_count: 17,
              kontrakt_count: 33,
              obshiy_count: 50,
              grand_ball: 179.7,
              kontrakt_ball: 167.3,
            },
          ],
          // очный узбекский 2021-2022
          direction_type1_lang1_year2: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Agronomiya: anorchilik", // юналиш номи
              kod: 5410215, // юналиш коди
              grand_count: 5, // градлар сони
              kontrakt_count: 20, // контракт сони
              obshiy_count: 25, // гранд ва контрак сонлари йигиндиси
              grand_ball: 85.1, // грантга утиш балл
              kontrakt_ball: 70.4, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Amaliy matematika",
              kod: 5130200,
              grand_count: 20,
              kontrakt_count: 30,
              obshiy_count: 50,
              grand_ball: 154.4,
              kontrakt_ball: 120.8,
            },
            {
              id: 3,
              name: "Arxivshunoslik",
              kod: 5220300,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 134.4,
              kontrakt_ball: 115.5,
            },
          ],
          // очный русский 2020-2021
          direction_type1_lang2_year1: [
            {
              id: 1,
              name: "Биология (по видам)",
              kod: 5140100,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 123.0,
              kontrakt_ball: 88.5,
            },
            {
              id: 2,
              name: "Физика",
              kod: 5140200,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 101.3,
              kontrakt_ball: 63.0,
            },
            {
              id: 3,
              name: "Математика",
              kod: 5130100,
              grand_count: 10,
              kontrakt_count: 15,
              obshiy_count: 25,
              grand_ball: 107.8,
              kontrakt_ball: 78.7,
            },
          ],
          // очный русский 2021-2022
          direction_type1_lang2_year2: [
            {
              id: 1,
              name: "Биология (по видам)",
              kod: 5140100,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 91.4,
              kontrakt_ball: 71.4,
            },
            {
              id: 2,
              name: "Бухгалтерский учет и аудит (по отраслям)",
              kod: 5230900,
              grand_count: 2,
              kontrakt_count: 23,
              obshiy_count: 25,
              grand_ball: 153.3,
              kontrakt_ball: 111.3,
            },
            {
              id: 3,
              name: "Математика",
              kod: 5130100,
              grand_count: 10,
              kontrakt_count: 15,
              obshiy_count: 25,
              grand_ball: 95.6,
              kontrakt_ball: 71.4,
            },
          ],
          // Заочная узбекский 2020-2021
          direction_type2_lang1_year1: [
            {
              id: 1,
              name: "Биология”",
              kod: 5110400,
              grand_count: 0,
              kontrakt_count: 50,
              obshiy_count: 50,
              grand_ball: "-",
              kontrakt_ball: 101.2,
            },
            {
              id: 2,
              name: "Начальное образование",
              kod: 5350101,
              grand_count: 0,
              kontrakt_count: 175,
              obshiy_count: 175,
              grand_ball: "-",
              kontrakt_ball: 101.4,
            },
          ],
          // Заочная узбекский 2021-2022
          direction_type2_lang1_year2: [
            {
              id: 1,
              name: "Биология",
              kod: 5110400,
              grand_count: 0,
              kontrakt_count: 50,
              obshiy_count: 50,
              grand_ball: "-",
              kontrakt_ball: 94.5,
            },
            {
              id: 2,
              name: "Социальная работа (органы самоуправления граждан)",
              kod: 5520103,
              grand_count: 0,
              kontrakt_count: 100,
              obshiy_count: 100,
              grand_ball: "-",
              kontrakt_ball: 56.7,
            },
          ],
          // Заочная русский 2020-2021
          direction_type2_lang2_year1: [
            {
              id: 1,
              name: "Дошкольное образование",
              kod: 5111800,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 72.6,
            },
            {
              id: 2,
              name: "Начальное образование",
              kod: 5111700,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 78.3,
            },
          ],
          // Заочная русский 2021-2022
          direction_type2_lang2_year2: [
            {
              id: 1,
              name: "Начальное образование",
              kod: 5111700,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 76.7,
            },
            {
              id: 2,
              name: "Дошкольное образование",
              kod: 5111800,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 75.6,
            },
          ],
        },
        {
          id: "4", // уникал ракам бир хил буп комасин
          name: "ФЕРГАНСКИЙ ПОЛИТЕХНИЧЕСКИЙ ИНСТИТУТ", //универ номи
          city: "Ферганская область", // кайси шахарда жойлашганлиги
          address:
            "Ферганская область, город Фергана, улица Фергана, дом 86, почтовый индекс: 150107", // адресс
          phone: "0 (373) 241 12 06", // телефон номери
          image:
            "data:image/jpeg;base64,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", // университет расми уни алохида битта файл киб тур
          type: [
            {
              id: 1,
              name: "ochniy",
            },
            {
              id: 2,
              name: "zauchniy",
            },
          ],
          lang: [
            {
              id: 1,
              name: "rus",
            },
            {
              id: 2,
              name: "uzbek",
            },
          ],
          year: [
            {
              id: 1,
              name: "2020-2021",
            },
            {
              id: 2,
              name: "2021-2022",
            },
          ],
          // очный узбекский 2020-2021
          direction_type1_lang1_year1: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Архитектура (по направлениям)", // юналиш номи
              kod: 5340100, // юналиш коди
              grand_count: 5, // градлар сони
              kontrakt_count: 20, // контракт сони
              obshiy_count: 25, // гранд ва контрак сонлари йигиндиси
              grand_ball: 120.1, // грантга утиш балл
              kontrakt_ball: 91.7, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Энергетика (по направлениям)",
              kod: 5310100,
              grand_count: 5,
              kontrakt_count: 45,
              obshiy_count: 50,
              grand_ball: 132.2,
              kontrakt_ball: 85.7,
            },
            {
              id: 3,
              name: "Экономика (по отраслям)",
              kod: 5230100,
              grand_count: 3,
              kontrakt_count: 22,
              obshiy_count: 25,
              grand_ball: 176.3,
              kontrakt_ball: 150.6,
            },
            {
              id: 4,
              name: "Менеджмент ( по отраслям)",
              kod: 5230200,
              grand_count: 5,
              kontrakt_count: 45,
              obshiy_count: 50,
              grand_ball: 169.9,
              kontrakt_ball: 125.0,
            },
          ],
          // очный узбекский 2021-2022
          direction_type1_lang1_year2: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Архитектура (по направлениям)", // юналиш номи
              kod: 5340100, // юналиш коди
              grand_count: 10, // градлар сони
              kontrakt_count: 20, // контракт сони
              obshiy_count: 30, // гранд ва контрак сонлари йигиндиси
              grand_ball: 121.8, // грантга утиш балл
              kontrakt_ball: 96.6, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Энергетика (по направлениям)",
              kod: 5310100,
              grand_count: 20,
              kontrakt_count: 30,
              obshiy_count: 50,
              grand_ball: 102.9,
              kontrakt_ball: 77.7,
            },
            {
              id: 3,
              name: "Экономика (по отраслям)",
              kod: 5230100,
              grand_count: 4,
              kontrakt_count: 36,
              obshiy_count: 40,
              grand_ball: 167.0,
              kontrakt_ball: 112.4,
            },
            {
              id: 4,
              name: "Менеджмент ( по отраслям)",
              kod: 5230200,
              grand_count: 4,
              kontrakt_count: 36,
              obshiy_count: 40,
              grand_ball: 149.1,
              kontrakt_ball: 102.9,
            },
          ],
          // очный русский 2020-2021
          direction_type1_lang2_year1: [
            {
              id: 1,
              name: "Архитектура (по отраслям)",
              kod: 5340100,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 104.3,
              kontrakt_ball: 71.9,
            },
            {
              id: 2,
              name: "Экономика (по отраслям)",
              kod: 5230100,
              grand_count: 2,
              kontrakt_count: 23,
              obshiy_count: 25,
              grand_ball: 163.9,
              kontrakt_ball: 125.9,
            },
            {
              id: 3,
              name: "Химическая технология (по видам производства)",
              kod: 5320400,
              grand_count: 4,
              kontrakt_count: 21,
              obshiy_count: 25,
              grand_ball: 81.7,
              kontrakt_ball: 63.2,
            },
          ],
          // очный русский 2021-2022
          direction_type1_lang2_year2: [
            {
              id: 1,
              name: "Архитектура (по отраслям)",
              kod: 5340100,
              grand_count: "-",
              kontrakt_count: 20,
              obshiy_count: 20,
              grand_ball: "-",
              kontrakt_ball: 70.4,
            },
            {
              id: 2,
              name: "Бухгалтерский учет и аудит (по отраслям)",
              kod: 5230900,
              grand_count: 1,
              kontrakt_count: 9,
              obshiy_count: 10,
              grand_ball: 150.2,
              kontrakt_ball: 117.6,
            },
            {
              id: 3,
              name: "Энергетика (по отраслям)",
              kod: 5310100,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 79.8,
              kontrakt_ball: 60.9,
            },
          ],
          // Заочная узбекский 2020-2021
          direction_type2_lang1_year1: [
            {
              id: 1,
              name: "Электроэнергия (по отраслям и направлениям)",
              kod: 5310200,
              grand_count: 0,
              kontrakt_count: 50,
              obshiy_count: 50,
              grand_ball: "-",
              kontrakt_ball: 79.1,
            },
            {
              id: 2,
              name: "Пищевая технология (по типу продукта)",
              kod: 5321000,
              grand_count: 0,
              kontrakt_count: 50,
              obshiy_count: 50,
              grand_ball: "-",
              kontrakt_ball: 72.4,
            },
          ],
          // Заочная узбекский 2021-2022
          direction_type2_lang1_year2: [
            {
              id: 1,
              name: "Строительство зданий и сооружений (по видам)",
              kod: 5340200,
              grand_count: 0,
              kontrakt_count: 50,
              obshiy_count: 50,
              grand_ball: "-",
              kontrakt_ball: 79.8,
            },
            {
              id: 2,
              name: "Геодезия, картография и кадастр (по функциям)",
              kod: 5311500,
              grand_count: 0,
              kontrakt_count: 50,
              obshiy_count: 50,
              grand_ball: "-",
              kontrakt_ball: 86.1,
            },
          ],
          // Заочная русский 2020-2021
          direction_type2_lang2_year1: [
            {
              id: 1,
              name: "Производство строительных материалов, изделий и конструкций",
              kod: 5340500,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 69.5,
            },
          ],
          // Заочная русский 2021-2022
          direction_type2_lang2_year2: [],
        },
        {
          id: "6", // уникал ракам бир хил буп комасин
          name: "ФЕРГАНСКИЙ МЕДИЦИНСКИЙ ИНСТИТУТ ОБЩЕСТВЕННОГО ЗДОРОВЬЯ", //универ номи
          city: "Ферганская область", // кайси шахарда жойлашганлиги
          address:
            "Ферганская область, город Фергана, улица Янги Турон, дом 2а, почтовый индекс: 150100", // адресс
          phone: "0 (373) 243 06 62", // телефон номери
          image:
            "data:image/jpeg;base64,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", // университет расми уни алохида битта файл киб тур
          type: [
            {
              id: 1,
              name: "ochniy",
            },
            {
              id: 2,
              name: "zauchniy",
            },
          ],
          lang: [
            {
              id: 1,
              name: "rus",
            },
            {
              id: 2,
              name: "uzbek",
            },
          ],
          year: [
            {
              id: 1,
              name: "2020-2021",
            },
            {
              id: 2,
              name: "2021-2022",
            },
          ],
          // очный узбекский 2020-2021
          direction_type1_lang1_year1: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Биомедицинская инженерия", // юналиш номи
              kod: 5313000, // юналиш коди
              grand_count: 12, // градлар сони
              kontrakt_count: 13, // контракт сони
              obshiy_count: 25, // гранд ва контрак сонлари йигиндиси
              grand_ball: 135.1, // грантга утиш балл
              kontrakt_ball: 128.7, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Лечебное дело",
              kod: 5510100,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 169.9,
            },
            {
              id: 3,
              name: "Лечебное дело (город Фергана)",
              kod: 5510100039,
              grand_count: 2,
              kontrakt_count: 0,
              obshiy_count: 2,
              grand_ball: 179.5,
              kontrakt_ball: "-",
            },
          ],
          // очный узбекский 2021-2022
          direction_type1_lang1_year2: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Биомедицинская инженерия", // юналиш номи
              kod: 5313000, // юналиш коди
              grand_count: 10, // градлар сони
              kontrakt_count: 15, // контракт сони
              obshiy_count: 25, // гранд ва контрак сонлари йигиндиси
              grand_ball: 128.1, // грантга утиш балл
              kontrakt_ball: 122.9, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Лечебное дело",
              kod: 5510100,
              grand_count: 12,
              kontrakt_count: 60,
              obshiy_count: 72,
              grand_ball: 157.5,
              kontrakt_ball: 132.3,
            },
            {
              id: 3,
              name: "Педиатрическая работа",
              kod: 5510200,
              grand_count: 2,
              kontrakt_count: 18,
              obshiy_count: 20,
              grand_ball: 147.3,
              kontrakt_ball: 128.1,
            },
          ],
          // очный русский 2020-2021
          direction_type1_lang2_year1: [
            {
              id: 1,
              name: "Высшая сестринское дело",
              kod: 5510700,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 69.4,
              kontrakt_ball: 56.7,
            },
            {
              id: 2,
              name: "Лечебная профилактика",
              kod: 5510300,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 87.9,
              kontrakt_ball: 75.3,
            },
          ],
          // очный русский 2021-2022
          direction_type1_lang2_year2: [
            {
              id: 1,
              name: "Лечебное дело",
              kod: 5340100,
              grand_count: 8,
              kontrakt_count: 15,
              obshiy_count: 23,
              grand_ball: 116.6,
              kontrakt_ball: 98.7,
            },
            {
              id: 2,
              name: "Лечебная профилактика",
              kod: 5510300,
              grand_count: 6,
              kontrakt_count: 15,
              obshiy_count: 21,
              grand_ball: 106.1,
              kontrakt_ball: 98.7,
            },
          ],
        },
      ],
    };
  },
};
</script>
