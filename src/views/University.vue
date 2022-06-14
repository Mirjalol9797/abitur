<template>
  <div class="university-page univer">
    <div class="site-container">
      <div class="univer-search">
        <input
          type="text"
          placeholder="Введите название ВУЗа"
          v-model="univer_search"
        />
      </div>
      <div class="univer-list">
        <div class="univer-title">Названия вузов</div>
        <router-link
          class="univer-list__item"
          v-for="(item, index) in filterBlogs"
          :key="index"
          :to="{ name: 'university-detail', params: { id: item.id } }"
        >
          <div class="univer-list__title">
            {{ item.name }}
          </div>
          <div class="univer-list__city">{{ item.city }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      univer_search: "",
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
        // 5 nest
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
        {
          id: "7", // уникал ракам бир хил буп комасин
          name: "АНДИЖАНСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ", //универ номи
          city: "Андижанская область", // кайси шахарда жойлашганлиги
          address:
            "Андижанская область, город Андижан, улица Университетская, дом 129, почтовый индекс: 170100", // адресс
          phone: "0 (374) 223 88 30", // телефон номери
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
              name: "Прикладная математика", // юналиш номи
              kod: 5130200, // юналиш коди
              grand_count: 10, // градлар сони
              kontrakt_count: 15, // контракт сони
              obshiy_count: 25, // гранд ва контрак сонлари йигиндиси
              grand_ball: 126.7, // грантга утиш балл
              kontrakt_ball: 113.6, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Архивное дело",
              kod: 5220300,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 123.5,
              kontrakt_ball: 101.7,
            },
            {
              id: 3,
              name: "Начальное образование",
              kod: 5111700,
              grand_count: 25,
              kontrakt_count: 50,
              obshiy_count: 75,
              grand_ball: 150.9,
              kontrakt_ball: 123.4,
            },
            {
              id: 4,
              name: "Физика",
              kod: 5140200,
              grand_count: 10,
              kontrakt_count: 65,
              obshiy_count: 75,
              grand_ball: 157.3,
              kontrakt_ball: 113.8,
            },
          ],
          // очный узбекский 2021-2022
          direction_type1_lang1_year2: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Прикладная математика", // юналиш номи
              kod: 5130200, // юналиш коди
              grand_count: 10, // градлар сони
              kontrakt_count: 15, // контракт сони
              obshiy_count: 25, // гранд ва контрак сонлари йигиндиси
              grand_ball: 141.8, // грантга утиш балл
              kontrakt_ball: 114.5, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Архивное дело",
              kod: 5220300,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 133.4,
              kontrakt_ball: 115.5,
            },
            {
              id: 3,
              name: "Физика",
              kod: 5140200,
              grand_count: 25,
              kontrakt_count: 50,
              obshiy_count: 75,
              grand_ball: 125.0,
              kontrakt_ball: 88.2,
            },
            {
              id: 4,
              name: "География",
              kod: 5140600,
              grand_count: 15,
              kontrakt_count: 35,
              obshiy_count: 50,
              grand_ball: 111.3,
              kontrakt_ball: 89.3,
            },
          ],
          // очный русский 2020-2021
          direction_type1_lang2_year1: [
            {
              id: 1,
              name: "Физика",
              kod: 5140200,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 82.0,
              kontrakt_ball: 63.2,
            },
            {
              id: 2,
              name: "Химия",
              kod: 5140500,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 75.4,
              kontrakt_ball: 63.1,
            },
            {
              id: 3,
              name: "Математика",
              kod: 5130100,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 104.0,
              kontrakt_ball: 63.0,
            },
          ],
          // очный русский 2021-2022
          direction_type1_lang2_year2: [
            {
              id: 1,
              name: "Биология (по отраслям)",
              kod: 5140100,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 91.4,
              kontrakt_ball: 75.6,
            },
            {
              id: 2,
              name: "Физика",
              kod: 5140200,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 85.1,
              kontrakt_ball: 64.1,
            },
            {
              id: 3,
              name: "Математика",
              kod: 5130100,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 90.3,
              kontrakt_ball: 67.2,
            },
          ],
          // Заочная узбекский 2020-2021
          direction_type2_lang1_year1: [
            {
              id: 1,
              name: "Начальное образование",
              kod: 5111700,
              grand_count: 0,
              kontrakt_count: 125,
              obshiy_count: 125,
              grand_ball: "-",
              kontrakt_ball: 101.5,
            },
            {
              id: 2,
              name: "География",
              kod: 5140600,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 81.7,
            },
          ],
          // Заочная узбекский 2021-2022
          direction_type2_lang1_year2: [
            {
              id: 1,
              name: "Биология (по направлениям)",
              kod: 5140100,
              grand_count: 0,
              kontrakt_count: 50,
              obshiy_count: 50,
              grand_ball: "-",
              kontrakt_ball: 96.6,
            },
            {
              id: 2,
              name: "География",
              kod: 5140600,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 88.2,
            },
          ],
          // Заочная русский 2020-2021
          direction_type2_lang2_year1: [
            {
              id: 1,
              name: "Начальное образование",
              kod: 5111700,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 79.0,
            },
            {
              id: 3,
              name: "Дошкольное образование",
              kod: 5111800,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 75.3,
            },
          ],
          // Заочная русский 2021-2022
          direction_type2_lang2_year2: [],
        },
        {
          id: "8", // уникал ракам бир хил буп комасин
          name: "АНДИЖАНСКИЙ МАШИНОСТРОИТЕЛЬНЫЙ ИНСТИТУТ", //универ номи
          city: "Андижанская область", // кайси шахарда жойлашганлиги
          address:
            "Андижанская область, город Андижан, проспект Бабура, дом 56, почтовый индекс: 170119", // адресс
          phone: "0 (374) 223 43 67", // телефон номери
          image:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGRgaGBoYGBoYGRkaGhgaGBgaGhocHBocIS4lHB4rIRgcJjgmKy8xNTU1HCQ7QDs0Py40NTEBDAwMEA8QHhISHjQrJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAABAgADBAUGB//EAEQQAAEDAgMFBAgEBAQFBQEAAAEAAhEDIQQSMQUiQVFhE3GBkQYUMkJSocHRYpKx8CMzguEVFkNyNFSiwtIldIOz8ST/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACERAQEBAAICAwEBAQEAAAAAAAABEQISIVExQWETA4Ei/9oADAMBAAIRAxEAPwD2EIQmUXveQiEJ0IQIQgQnhCFQkKQmhCECwhCdCECQhCchCECQhCeECFQkKJoQhAqkJkIQKQgUxQhAiiYoIFKCcpYQKgmhSECpU5CEIEUhPCWECkIQnhCECFBPCBCBIUTQohjvQpCaEIWNCqQiQpCapYQhNCEIhVCE0IIpYQhNCEIFQhMpCuoRQhNCBCapIQhWQhCaK4QhOUITUJCBCeFIV0VwhCchCECwpCaFEUkIQmhBNQsIQnhAopIQhPCCaEhAhOhCaEhCE8IQmhYUTQomjuwpCGHqse0PY4OabgjRcrG7YpOZWpsqEVG52Q0b4cIEgd7hfv5LleUi5XUaQdCD3ef1UXkdlbbZhmubXqPIBBJezezPMREkjK1v7K9ewhwDhoQCPFOPKVbxwsKQnLUMq0yWEIT5VMqCuEIVuVLkRVcIQrciGVBXCEKzKhCCuEITmOYQkcx5pphYQIRkcx5hAuHMeYTTAhAhMXN+IeYQzt+IeYTTCwlIT52/EPMIZhzHmFdMKQhCbMOY8wpI5jzTTCQhCstzQhNMVwpCeLwpkTRWQhCsLEMqaK4QhWZFMqCqEHkAEnQCT4K3KsW1Q4Na4TAfLrE7sEEEDhdS3JqybWWptqiCRnYY/EFFzf4fHDgcIgWAsNRyUXD+nL269OLk4LH1fVjTbVfkBNmmOOYjSY+6zV9sPIO87O4y5wIkkQZkX4A+CxDddF7ty2HE/omewTYxe9up5rheTfg1atUqPzPLnuNjeZuTrykn5r0LcfWADRVeIGge4QByAOi83hX5Yyl0k3g2y6mQt2CJqVmtk3zAXNrTOsjulWcsaljrev1j/q1Pzv8Auk9eq8aj/wA7ynpYJjy4B5lrspu/WAefVLU2cAWkPMEkG7oFiefT5q91/wDJXYqp8b/zvKybQxlUBoY55JNzJsB39f06rpjZ7Pj66u+6sOzWAAlxg6HeU7LvFzMPiKhAz5p4mSrC93En5ldD1GmPe4xx15fJM7Z9NphxE9Qnf8WWOaWn9gqZJ0HmFvfgKRBALZLSRDRwm4MdD5JqOEowM2ScoJljbTHTqE7fi9o5uXm35LDhXPlxcwQXEgWsIEfovT08DScSAGEgSdxv2QbQw/4NY9hmvLRTvfRecccMn3QO8A/ojl/DPcB913WYWiWl4DC0anIzh4JeyoRO5ET7DNJidOad76P6Rxez6Dy/uplnhHeB911SMPcwyBlk9mPeEt93kFY+nQAkhliB7DdTMcOhTvfS/wBI42WOE9wH1Kx4vPnZkbugkmYuYIAtwXpGCgYENu4tG4Llpg+7zKdlOiS1oDZcJbuC4Ezw/CfJO19H9I4DC46tA8j9VqYbXE9wA/Urp1KdFpIIEjXcHMDl1CpxOGpuY/K0WaCdwCzo6cina+ln+kZACeQ7wPoVHdG+MCP1WttOjIGUkk5fYJv3gW11TeqUiwvAsJ1bGnQjqpeVn0f0jHk6A9wA/UrHtEPLAGMuXtzHdBDQZMX1stDX08pBAz3NmEgT7N4vqEcNSpuAD2Q4kAQAZ+Vr81Jz2/Bf9JhmAmmZYBDxyIOYG4EiPZVTqcde4R9VvZg6ZYWtB3nN92Jyh/RYqGCohoBmQ1rjuzqBxi/tBa2+k4/6SarAPd4fYqOLuE/vxW2lsyk8uDRdtjugQb9OhRr7Kps1GpgQ0H6J2rX9Z6Yi9w4nwlZ8ViamZgZni5cZ4gWGuhv8l0hs2mSBeTIG5y14IP2dSBIOo13J16x1TtS/6cb9MrMS88XjvJ+hVOKxT87Zc/QwS50c4+QPh0W2phqTXBpHOTlaA2Ocj9ysuJp0y3dMOBIA0nkdLg8iufPnsxnlzlmSOZVeZPtDy+6iu7Ae8RPGx+yi5ObEXw4DLp0v5qx3CBMmIHX66qkEuk9f3wVBc694Hmu8YamMM5mk2bPKBF/n+yrMDixSeXlskNcBeIJt91kpVz7MuBiD3Roox4vn3mjQSRB4dOiD0novhKx/iE7j3A8L3u4zyXWrUSGMkbxe6BH4P/1cv0X2lEAvaykzdykxme8DS1zPPqultvbDNwsIflJJIJgbpEacpPgl5X4WSfIUHuc5zLy1htESQ8T32cPNY8TtLM9jGX3YJmDmiXCOEQqsJt8itneTlMy0GzQS0SI100WPbBpGtnBJpl+aRxzQXlvmeGvNO1pkeofhapmzozjLcezvSddNEcfhnmqMgMAajnC5+z/SFoe7PAbUe2A5xJbLTmi2gIaMttTHJehfXa1xadbGI4QBKdrqyTHJpYWrLC/NAY/NJm/8SJvf3VW3D1ZdkDoyNDSDF5Z1tYFd1zg4ECbiPZPEIYanlEXNgPZPAQne/JkzGLBYV4e9z5jKIk8QBJWPDYKvLZzAdoCZd7lut+Nl3y6xEG4jRQ1AImRJgTaTyCk53TrHKwuDeMO9rgc5zZRmk3a2LzzlZmYHEZI3v5bhGf3y8kceUXXc9aZzH5hyB58iD4hE4pnMfmb0PPqPMKy8vR1ji47ZzzSZlae0gZjImwg3lJi9nV8rspc6XtIGYjKAHg6mOI0XbdiGzJcIFjvNsSec6y0jwTOxLQSCQCNQXNEadfxDzCTlyn0XjK5W0dnONWm6k0huaXkED3gbjjaVRgNn1xUpF8lrQ4POedS+OMnULtOxbBq4fmbynnyEp6dYO9m8awQeJHPmCPBTtykzDrN1xMbs173VHsOsBrZjRzZMzbQqUsC9jKhfxZTAvNwGh31XcAPwn5c+9V16Zc0tgie77qd7mLOM3Xn8Hs2rmadAKuY73uyJ017lz8S97KOQuAIe5rm97W6k8LHTmvV4l7qbHPDScu8dNJvx5SvObdxDHjPTddwAIIjOBHPlMWjis8udvgnGRyTpE2yjWPaF56CJub3S4Z8VGEugB7ZJI049/szZVuYXFuWxIkiOg/RZnTDQ7TMdYmOo/us8eXnUseqwD8phzxuPaS45nNu9rY0niR4rnYwOa3MHEB7GNYQ6CSDTmL9Flp4k/wAZ2jixrrHU+sUROXpm16rBX2xLGMgSwy115tHLhZdePLlfJZMx7nYgD2veQYc8Zc3JucOnlchV7aqAN3CMzXCe4zE9NF4/Z22CSWPeQwNhrWAjfNgXEXJ49SOC341hbll4e2IDm+3umIcB36ys8ryizMdbZu0G5m9o64L3Og90NAPiq9pYtpk03awRBIjh+oXEcHZ4sJIbvaEEwZOsAEnwCRrAGgTcTN5OvIWAiVm87iY1vrOq5rHO502NrDetwG8Fkq0XkZpIjQxMgWF+c/VPT1ABdJJJI4g6ju4dU9YsMNOsExE8AfA93Nc+3lcZHOcP9MnrET8lFLjSoQOAzafNRb2DMMrR9OappuBJCqc8kWIEjUiFVBC74wvqPAVDHxPEHgVdQpscSHvymJBOk9eQ6omm0CCHOMZgRoB1Ame+eIT4MaNlYes9wNNpIDgSJAbYyMxJiFH4h2XLImTu8RA5jvIjorNh45jXNZVe9lIuOY0zDpLTkA65o8OBTbayEtfQfUe0g5y9oaG1CJIEcIP97pYZ6dv0gq4B1JgwrYe0NE7+ZwiXZ81pkeGi8/sOpTOJpDEyaObfAJktDSQLXAzZZjhKyuswTq6SO6YtzvmT4fCkM7TMyCS0Nzb4PMtjT7p+jv7UdRqYqn6mIkgva0lrRDpIbmIi0zHTqvTY6s4VS4DcyiTeAZsI14rxGxXsFUVXvyhp3QAcz3cBYQNV63aGMY0mm52++C0fEBEmRbgVi29vh0kljRT2m2YzsniN77LUzaItvt8n/ZeZZT3nHd/M3m3qloYgh9PM5l4nfZPtuFt6/DRa6sa9Z/iA0zsnuf8AZJWxVN4GdzDBkWfY9LdV56viCKuUFtrmXsB9k8CZWUVnZDvMkvN87Lbo03oScfuLb9PS1HUGgZsgHCWP5AWtyA8kvrWGEiWCLHcfbRvLoB4LneklI5GXaLAy5zQNOBJgrHidlVD6xlLBvAyalPdDnyMwLt2RzhJbfulyV6EYigeLCIn2H/7gdPxT4oVMfh3Hecwkg603yQLH3fwf9K4bMJVDsmZmYUWzvM1bSYSZmIsTMq2pst8secgAp1Cd9hsO0MiDfXhyUy+6a67cXQLXOGXLfMcjo0Mza9nHzTM2rSAzB4ANpyOvF40/FPiuVs+gTgnhpa6S+7TIuymAuY3Z1Q02ARIfUdqfhpxw71Pn5rV8Zj1zNpNJID5ImQGG0GDwWZ+36QBJq6EA7jtSCRw6Fc7Zk9viJe02fABMj+K0clw2YaaTt9ntsM7/AAbU/Cp1mpvjXrTtZj5pte4uLTYMMwRre2hXk8TVMFh1BiSBPAf9rfJdvZtACvmzNP8ACdYZp9hnTouJi6jYqvc9oLajmNYc2dwm7mwMsd5GminLj5yL9aow9QmZtAgg8Z0I+SxYrNa83PjxVrHuLWvBIEuBzRNoiY1vPkrcbRomm8mu4VQTFMU90w5oG/n3ZGY6clOPHOSX4drZW1sI3AvpGgDiCHmo8hskdoMmV5MgAlm6OLSY4rxeIdEwbmYtN+q62ysKW9s0gAmk4HeYYLalI+64k+MaLLgnUxWYatPtWDNLM/Z5rWl0yI1tyXWfLL023Np4GtQptw1DI9jWlzsga9xAGbM4XfcETPGVx8EbuDeZubjQaDwmOqd9VmUZKLaRbTa0lrpzk5TndcwTPz7llwRIOoAzTHEjie5c+fm2LFmKxGacs3PL5fqs7HugzxNhcDUcui14mlqATZxFiDBHA5dFlD7g726QbfhjVc5PpW2ix7WCq9lQNdORxYQ1+V18p0MdNFXVzgZyx7W3Ie5rmsdMS1rtCR3yrMdjqjmsYXucxgJa0ndaXSSAPEqnHbRrVKTKTqh7Jhc5jIADSSeMTq4681Zxl8ms/buFgWRwt/ZRUUsNIE1I6clFrweXRLHChTyCHQC4iAYy3k+SlNld1Omwl0B7swziOzLKYGh0s62uqow+EeYBeQ3/AHt0j4c0+EKynhn2/iu4e+I+RXbtIzizDYWq7K6mHZTQABDgBnyW1IEzxW/C4Wo6qW1M38lgMuB38lMZrG5zB9+h535+Fo1GgDtnMF90PcIudA1atGia7s8mXB9SSIECQ02mTHVY5cvpqSbrNszB4gBhbna01WF0PDZZ7071230RZQeMO1r5BL3lsuB3TTAaZBMCZV9UskkYhwEmAHvaByEZICy0CyWF9aWtLTlzuIgai7IuLJ21ZOMOzCYgtc3fvSgtLxdxqgixOuUG/wB1nODqOpua1pc8VAHjMDAymdTHL5LRVxDBE1XgwLtcZIIBF40vKwmuyTD6gMmXAmTvGCbi8QtdrU/8xtw2z3ggsH+u1wyvuKY5306LoYim/tmvZORpfn5SdJHHhwXKw9Njz/NqAzwDzb+lq6eD2ZeQ95ufaLgDyJBapbd1ZmLKdy7T8w4xwlc6pScH0g4tkFpgvYD/ADCdC6TrwXZpbMcHF2fXq0AaabvTipV2Lne173GWxEOZwJItHVb2MdbrFi6TjicwyxF99gPsHgTKpqYJ7WBrg1u9N3sHu9XdF3P8Kl+c6/7m8o71pq7MzgZ7xpdo/RqdpheNtYfSFhdRYBlmBq5oGg4kx81fiKZjGbzNKOr2W3263t4rZX2XnaGOG6BEBw0GnuLaMAyHywfxMuffcJyEEcLaLEskbvG264bmE1X7zL4Yj226+qjrp18VpHsUG5mGcPWHtC9qunMfYrpf4czMXltyzIRnMZcnZxpPspvVGQwZG7jHMbvus1+bNwv7Z1V7ROtcHAUnMwLwHNz/AMTKWuBAPZsi/BV1aT30WFhY5wLswBgRlpyQS06Lv0dnMYwsaN0z75OoAPD8ITMwLWsyNBAv7x4gDlyAWJcut3jsxwtm0wMRiDnaZFSwJJ/nM1suPgMMajHNY5hIqUyYL7DLU5t6r2dPZjGvc8N3nzm3nRvODjbvAVWF2NTpghjS2SCYc+TlBA4/iKs5TUvC5jBgacVQczZ7N1hmn+W3mF47awBqVGyBL6nHm4r6OzZzGuzgXjLcuNsoboTGgXnMf6GMe97w90ufmytj3pJu42j69E7TdOtnHHmsI0NoubmFizlaXVL6/iaFXtSm1zxJEFlNxk6ywToeZK9Az0XDG1G5KpzMAEwd5r2OHsE8GlZsdsunFMOa8DsmtdvAFrqbi1ou3Utv49E7cd1nPDPs19LLWyt3uzqPLi4T7TC7wsLLm4emHEy5rTDpkga2420Xe2Xsug0vgPvSqAy9hERJtk1ss2O2dQfUkB4zDNGZouA1vwmBxU78fnTFOHNN2cuy/wAumIJHuZGE6/hHmE4ZQMljmhwY6RI+Ag26SdEaeAa6m4Q6In2mE7z2Wuy3sj9xFtLAMe+o7I8Sx5MOYfagEDd1udSpeXHflqX8YqeIpTdwILszoO8eJEnmr8Ni2l7ntOVgYGg8BMjWIm7fNLhsDTY9rjTeQDMOyEHvsFfhMCwseyHgNY54ns7kPpkjTWG/JLePzqS4qxVSkWnKQTkDYB4ta0Tpqcrj4lSmKIYHF0s3mi9g4ju4WI70X4djKb8gfq1xJDDAZmBjL0e75Lp0disdQDXMqCHz7Dc3U5YiIy3Sdfpf+OFVFAmRUAsBEkaAD4eii7P+W6Xw1vy0lFfB59No9G8M72cR3bwJ+aLvRBnu4g+LWn6hd5mzf3mNvNqtbs8A+07z/stZ7TJ6eVreiFVxJGIYSebMv1Kof6JYgcabu6PqAvaNwjRxJ8f7K0UAD0UqdXz/APyriCQMjRBud2PG+i2Yb0MqQM72Dua5x+i9wG9EwUXrHlKPojTN3PJ1bZrQDl3evJW7L9HqMOJaDFSo0SAbNeQP0XoqIt/U75vJXL9HCS2tJJ//AKsQL8hVcAFpci4bLYLAR3WTDZzeZ81uhQptXIx+ot5nzKduCbzPmVoCk8k2niK/Vm9fM/dT1dvL5n7qwd6hPOEMJ6uz4QiKLPhHkExPVASooZG8h5BGAoWnkfJFtN3wnyKAKSg9hbqCLdUEwMShKU/vgpKYu0VErnKC+imJ2Og4A2InvCSYRn98kxdI/CMNsoHDdlvzbC49TZVD1gMuCab3xmJdZ7BN5tddsOXFrH/1Cn/7V/8A9rE6ypV3+AUgCAX5SRaW2uDrE8FezY9Js2dcQZcbiZi3cFt4d1/mB9UMynWLjINm0hpTYe+T+sqGgR7DKTfA/QBai+yDqg5jzTrEYMZgX1GFhe1rXNLXZWGbiDBLrceCR+z6rmBpxDpDnEuDACQ4NGWxEAZSZ6rodq34h5oZ2/EPNXIY4/8Agbv+Yf5v/wDNRdftBzHmip1hjxuA9Mqmd3au3NYDPZgmcsH9eS3/AOb6eaz3gHWWC3KbnqVl/wAmsBk4psTp2bvInNdVv9Em/wDOM4yezdN5/EOa6Zn05b+ukfStjXAZ3ObBMhkOm0AAwOeqFT0sp6NqPdxEMYNI5xz+S5x9FW8cYyL/AOm4HlrnKpZ6MUZ/4xk6Wpu/UuMmE/4b+u0/0vpCIe51iTuQQRprZc+l6ZvFWHncvOVgkDgb8Y4Ktvoqwn/iWERBHZvGmkXsnZ6LskAYmnP4mvFxynxUsXXYd6V0mFzCHyLjdEEkkxryjzWLYe3GMFRr3FgdVfUaYme0eXEEcIPnISP9EnP1xFOf9jz9VuZs/CYFnaPmvUOhcAGg6w1vhxzHuTKdnYwOKFUFzS8MiQ97Wta4c2k3I6wudj/SKkxwYxznunVrRlHkL+FlxcVisVjDxYydAYHS3H5rds7YzKd8pLuc/wB1rJPk7X6d9mJYRIe+OrIPkQlfiW/E75fZZQwcvmUvZjkou1orYpuXcc7NOpiAO5UjEu4v+QU7IckeyHIeSmG0PWD8R+S0UdsOY3KIO8XEnjIAiAOET4qnsxyHkEwpjkPJBa/b1XhlH9KpdtzEcHsH9A+6bJ0HkEcvRXUxir4yrUdL6ogWAa3L/wByem8j3nHqSfutUdEIPJNFXak8Slc/hmI8fur78kwlRdqhlUAb294kforBimHVh/M5OWJHNKeDatZi2Ag5AYIMEmDB0K306+GfqxzD03mjwN1y8qWSFMNruv2LmbmpOY/oSfnFwfAryO18JiqdVtQYaS0FmZo7QZXEGC0b2WWg8D1HHqMrObdpjusV1MHtx7RDxnHUCQlWV46n6RnK8mmxu7AlrhcOaTILtMsnwWWn6Su4Mo245D4Qc0cF6p2LcTJgnqGkqevP4Nb5AfomX2mvLf5lfDyGUt32oYBEcSS6LfRI30hqEe50cGNywBwmb/ZeuOLf7oaP6j9GpPWqvFw+aZ+m/jzTtrYmJaAf/jbbwhMzaOLdIh/hSjxkNXoHYqodXnwEfMyg3EO+L6/VMvs38ef9exp4VPGk7/wUXoO3Pxf9IUTL7N/GQYan8LfJWdiz4VWGBMGBdGTCmwaNCZrG8gkACaVlUyN+EKFjfhHkEQAnACCttMDgEwYOQ8kXFAFAwagXI+KCBg5MCEkJggZKjmRQEKAqICVFMe5LChKXMgcJZQa5ElAwKgKgcoUDEoIQiSghCCZAhACEESFECEJYVhCBCqEnohmPIolqBBQQk80C4oFvVAsQHOokgqIKxUTB45JcicAIhmgIylkKZggsaEcyQPU7RFEv6IZ+iUuPNEBA0qByGiMoGCdpSZlMyBi5DMhKIcgYFRJmRdW7lFWJCEnaTomz8xKBpRaVSagVjXhA0qZkhei0oLJRzIAhQkIDKBKikoiSohKMIIUIUQQAoQmSkKgJSESlhBIUUhRBma5MCVFEQQ6UYUUQGOCEQoogIT5lFEUHKBqiiBgEYUUQQm8KAqKICkfBCiiAtao5RRQQhFoUUQEhTMgogsZV6Ka3UUQGVMyiiAZkS5RRApelzFRRAM6OZRRUTMhmuoogl1FFEH//2Q==", // университет расми уни алохида битта файл киб тур
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
              name: "Автомобильный сервис", // юналиш номи
              kod: 5620600, // юналиш коди
              grand_count: 15, // градлар сони
              kontrakt_count: 60, // контракт сони
              obshiy_count: 75, // гранд ва контрак сонлари йигиндиси
              grand_ball: 88.4, // грантга утиш балл
              kontrakt_ball: 72.7, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Автомобильное и тракторное машиностроение",
              kod: 5310500,
              grand_count: 5,
              kontrakt_count: 45,
              obshiy_count: 50,
              grand_ball: 119.8,
              kontrakt_ball: 75.7,
            },
            {
              id: 3,
              name: "Экономика (по направлениям)",
              kod: 5230100,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 176.3,
              kontrakt_ball: 147.8,
            },
            {
              id: 4,
              name: "Мехатроника и робототехника",
              kod: 5312600,
              grand_count: 10,
              kontrakt_count: 15,
              obshiy_count: 25,
              grand_ball: 94.1,
              kontrakt_ball: 78.8,
            },
          ],
          // очный узбекский 2021-2022
          direction_type1_lang1_year2: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Автомобильный сервис", // юналиш номи
              kod: 5620600, // юналиш коди
              grand_count: 15, // градлар сони
              kontrakt_count: 60, // контракт сони
              obshiy_count: 75, // гранд ва контрак сонлари йигиндиси
              grand_ball: 88.4, // грантга утиш балл
              kontrakt_ball: 72.7, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Автомобильное и тракторное машиностроение",
              kod: 5310500,
              grand_count: 5,
              kontrakt_count: 45,
              obshiy_count: 50,
              grand_ball: 119.8,
              kontrakt_ball: 75.7,
            },
            {
              id: 3,
              name: "Экономика (по направлениям)",
              kod: 5230100,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 176.3,
              kontrakt_ball: 147.8,
            },
            {
              id: 4,
              name: "Мехатроника и робототехника",
              kod: 5312600,
              grand_count: 10,
              kontrakt_count: 15,
              obshiy_count: 25,
              grand_ball: 94.1,
              kontrakt_ball: 78.8,
            },
          ],
          // Заочная узбекский 2020-2021
          direction_type2_lang1_year1: [
            {
              id: 1,
              name: "Автомобильное и тракторное машиностроение",
              kod: 5620600,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 76.0,
            },
            {
              id: 2,
              name: "Электроэнергия (по сетям и маршрутам)",
              kod: 5310200,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 75.8,
            },
          ],
          // Заочная узбекский 2021-2022
          direction_type2_lang1_year2: [
            {
              id: 1,
              name: "Автомобильное и тракторное машиностроение",
              kod: 5620600,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 77.7,
            },
            {
              id: 2,
              name: "Транспортная логистика (по видам транспорта)",
              kod: 5620100,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 78.8,
            },
          ],
          // Заочная русский 2020-2021
          direction_type2_lang2_year1: [
            {
              id: 1,
              name: "Экономика (по направлениям)",
              kod: 5230100,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 106.5,
            },
            {
              id: 2,
              name: "Машиностроение (по направлениям)",
              kod: 5310600,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 66.3,
            },
          ],
          // Заочная русский 2021-2022
          direction_type2_lang2_year2: [
            {
              id: 1,
              name: "Экономика (по направлениям)",
              kod: 5230100,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 97.7,
            },
            {
              id: 2,
              name: "Машиностроение (по направлениям)",
              kod: 5310600,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 70.4,
            },
          ],
        },
        {
          id: "9", // уникал ракам бир хил буп комасин
          name: "НАМАНГАНСКИЙ ИНЖЕНЕРНО-ТЕХНОЛОГИЧЕСКИЙ ИНСТИТУТ", //универ номи
          city: "Наманганская область", // кайси шахарда жойлашганлиги
          address:
            "Наманганская область, город Наманган, улица Касансая, дом 7, почтовый индекс: 160115", // адресс
          phone: "0 (369) 225 10 07", // телефон номери
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
              name: "Бухгалтерский учет и аудит (по отраслям)", // юналиш номи
              kod: 5230900, // юналиш коди
              grand_count: 5, // градлар сони
              kontrakt_count: 95, // контракт сони
              obshiy_count: 100, // гранд ва контрак сонлари йигиндиси
              grand_ball: 154.1, // грантга утиш балл
              kontrakt_ball: 112.9, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Энергетика (по направлениям)",
              kod: 5310100,
              grand_count: 30,
              kontrakt_count: 70,
              obshiy_count: 100,
              grand_ball: 98.6,
              kontrakt_ball: 75.5,
            },
            {
              id: 3,
              name: "Экономика (по отраслям)",
              kod: 5230100,
              grand_count: 3,
              kontrakt_count: 72,
              obshiy_count: 75,
              grand_ball: 164.0,
              kontrakt_ball: 125.0,
            },
          ],
          // очный узбекский 2021-2022
          direction_type1_lang1_year2: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Маркетинг (по отраслям)", // юналиш номи
              kod: 5230400, // юналиш коди
              grand_count: 5, // градлар сони
              kontrakt_count: 45, // контракт сони
              obshiy_count: 50, // гранд ва контрак сонлари йигиндиси
              grand_ball: 151.2, // грантга утиш балл
              kontrakt_ball: 92.4, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Менеджмент (по отраслям)",
              kod: 5230200,
              grand_count: 5,
              kontrakt_count: 95,
              obshiy_count: 100,
              grand_ball: 149.1,
              kontrakt_ball: 79.8,
            },
            {
              id: 3,
              name: "Технологии и оборудование легкой промышленности (по видам производства)",
              kod: 5321500,
              grand_count: 15,
              kontrakt_count: 35,
              obshiy_count: 50,
              grand_ball: 84.0,
              kontrakt_ball: 69.3,
            },
          ],
          // очный русский 2020-2021
          direction_type1_lang2_year1: [
            {
              id: 1,
              name: "Экономика (по отраслям)",
              kod: 5230100,
              grand_count: 2,
              kontrakt_count: 23,
              obshiy_count: 25,
              grand_ball: 163.4,
              kontrakt_ball: 125.5,
            },
            {
              id: 2,
              name: "Технологические машины и оборудование (по отраслям)",
              kod: 5320300,
              grand_count: 6,
              kontrakt_count: 19,
              obshiy_count: 25,
              grand_ball: 75.5,
              kontrakt_ball: 63.2,
            },
          ],
          // очный русский 2021-2022
          direction_type1_lang2_year2: [
            {
              id: 1,
              name: "Экономика (по отраслям)",
              kod: 5230100,
              grand_count: 1,
              kontrakt_count: 24,
              obshiy_count: 25,
              grand_ball: 162.8,
              kontrakt_ball: 114.5,
            },
            {
              id: 2,
              name: "Технологические машины и оборудование (по отраслям)",
              kod: 5320300,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 75.6,
              kontrakt_ball: 63.0,
            },
          ],
          // Заочная узбекский 2020-2021
          direction_type2_lang1_year1: [
            {
              id: 1,
              name: "Бухгалтерский учет и аудит (по отраслям)",
              kod: 5230900,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 104.3,
            },
            {
              id: 2,
              name: "Маркетинг (по отраслям)",
              kod: 5230400,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 103.4,
            },
          ],
          // Заочная узбекский 2021-2022
          direction_type2_lang1_year2: [
            {
              id: 1,
              name: "Бухгалтерский учет и аудит (по отраслям)",
              kod: 5230900,
              grand_count: 0,
              kontrakt_count: 50,
              obshiy_count: 50,
              grand_ball: "-",
              kontrakt_ball: 91.4,
            },
            {
              id: 2,
              name: "Экономика (по отраслям)",
              kod: 5230100,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 97.7,
            },
          ],
        },
        {
          id: "10", // уникал ракам бир хил буп комасин
          name: "НАМАНГАНСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ", //универ номи
          city: "Наманганская область", // кайси шахарда жойлашганлиги
          address:
            "Наманганская область, город Наманган, улица Уйчинская, дом 316, почтовый индекс: 160119", // адресс
          phone: "0 (369) 227 07 61", // телефон номери
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
              name: "Прикладная математика", // юналиш номи
              kod: 5130200, // юналиш коди
              grand_count: 20, // градлар сони
              kontrakt_count: 30, // контракт сони
              obshiy_count: 50, // гранд ва контрак сонлари йигиндиси
              grand_ball: 151.3, // грантга утиш балл
              kontrakt_ball: 132.8, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Археология",
              kod: 5120400,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 145.2,
              kontrakt_ball: 139.3,
            },
            {
              id: 3,
              name: "Начальное образование",
              kod: 5111700,
              grand_count: 25,
              kontrakt_count: 50,
              obshiy_count: 75,
              grand_ball: 154.9,
              kontrakt_ball: 132.1,
            },
          ],
          // очный узбекский 2021-2022
          direction_type1_lang1_year2: [
            {
              id: 1, // уникал ракам бир хил буп комасин
              name: "Архивное дело", // юналиш номи
              kod: 5220300, // юналиш коди
              grand_count: 5, // градлар сони
              kontrakt_count: 20, // контракт сони
              obshiy_count: 25, // гранд ва контрак сонлари йигиндиси
              grand_ball: 137.6, // грантга утиш балл
              kontrakt_ball: 114.5, // контрактга утиш балл
            },
            {
              id: 2,
              name: "Лечебное дело",
              kod: 5510100,
              grand_count: 0,
              kontrakt_count: 20,
              obshiy_count: 20,
              grand_ball: "-",
              kontrakt_ball: 137.6,
            },
            {
              id: 3,
              name: "Физика",
              kod: 5140200,
              grand_count: 25,
              kontrakt_count: 75,
              obshiy_count: 100,
              grand_ball: 130.6,
              kontrakt_ball: 84.0,
            },
          ],
          // очный русский 2020-2021
          direction_type1_lang2_year1: [
            {
              id: 1,
              name: "Физика",
              kod: 5140200,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 69.3,
              kontrakt_ball: 57.1,
            },
            {
              id: 2,
              name: "Химия (на направлениям)",
              kod: 5140500,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 72.4,
              kontrakt_ball: 60.1,
            },
          ],
          // очный русский 2021-2022
          direction_type1_lang2_year2: [
            {
              id: 1,
              name: "Физика",
              kod: 5140200,
              grand_count: 10,
              kontrakt_count: 15,
              obshiy_count: 25,
              grand_ball: 89.3,
              kontrakt_ball: 65.1,
            },
            {
              id: 2,
              name: "Математика",
              kod: 5130100,
              grand_count: 5,
              kontrakt_count: 20,
              obshiy_count: 25,
              grand_ball: 109.2,
              kontrakt_ball: 63.0,
            },
          ],
          // Заочная узбекский 2020-2021
          direction_type2_lang1_year1: [
            {
              id: 1,
              name: "География",
              kod: 5140600,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 78.9,
            },
            {
              id: 2,
              name: "Математика",
              kod: 5130100,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 101.2,
            },
          ],
          // Заочная узбекский 2021-2022
          direction_type2_lang1_year2: [
            {
              id: 1,
              name: "Музыкальное обучение",
              kod: 5111100,
              grand_count: 0,
              kontrakt_count: 50,
              obshiy_count: 50,
              grand_ball: "-",
              kontrakt_ball: 77.9,
            },
            {
              id: 2,
              name: "Педагогика и психология",
              kod: 5110900,
              grand_count: 0,
              kontrakt_count: 50,
              obshiy_count: 50,
              grand_ball: "-",
              kontrakt_ball: 96.6,
            },
          ],
          // Заочная русский 2020-2021
          direction_type2_lang2_year1: [
            {
              id: 1,
              name: "Начальное образование",
              kod: 5111700,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 75.8,
            },
            {
              id: 2,
              name: "Дошкольное образование",
              kod: 5111800,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 75.8,
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
              kontrakt_ball: 78.8,
            },
            {
              id: 2,
              name: "Дошкольное образование",
              kod: 5111800,
              grand_count: 0,
              kontrakt_count: 25,
              obshiy_count: 25,
              grand_ball: "-",
              kontrakt_ball: 72.5,
            },
          ],
        },
      ],
    };
  },
  // mounted() {
  //   axios.get(`http://localhost:3000/univer_list`).then((res) => {
  //     this.univers = res.data;
  //   });
  // },
  computed: {
    filterBlogs() {
      return this.univers.filter((item) => {
        return item.name.toUpperCase().match(this.univer_search.toUpperCase());
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.univer {
  &-search {
    input {
      width: 100%;
      height: 40px;
      outline: none;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 40px;
      padding: 0 12px;
      border: 1px solid #333;
      border-radius: 6px;
    }
  }
  &-title {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 32px;
    text-align: center;
    font-weight: 500;
  }
  &-list {
    &__item {
      box-shadow: 0 3px 16px 0 rgba(114, 114, 114, 0.2);
      border-radius: 8px;
      margin: 0 0 20px;
      display: inline-block;
      width: 100%;
      padding: 20px;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.015);
      }
    }
    &__title {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 10px;
      color: #333;
    }
  }
}
</style>
