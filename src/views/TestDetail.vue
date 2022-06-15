<template>
  <div class="test-detail">
    <div class="site-container">
      <div class="test-detail__title">{{ subjectName }}</div>

      <div class="test-detail__wrap" v-if="!viewResult">
        <!-- английский старт -->
        <template v-if="this.$route.params.id == 1">
          <div
            class="test-detail__item"
            v-for="(item, index) in testsDetail"
            :key="index"
          >
            <h5>
              <span>{{ item.id }}.</span> {{ item.title }}
            </h5>
            <label v-for="(answer, i) in item.answers" :key="i">
              <input
                type="radio"
                @change="clickRadio(index, answer)"
                :name="'answer' + index"
              />
              <span>{{ answer.title }}</span>
            </label>
          </div>
          <button @click="resultEnglish" class="test-detail__view-result">
            Увидеть результат
          </button>
        </template>
        <!-- английский финиш -->

        <!-- история старт -->
        <template v-if="this.$route.params.id == 2">
          <div
            class="test-detail__item"
            v-for="(item, index) in testsDetailHistory"
            :key="index"
          >
            <h5>
              <span>{{ item.id }}.</span> {{ item.title }}
            </h5>
            <label v-for="(answer, i) in item.answers" :key="i">
              <input
                type="radio"
                @change="clickRadio(index, answer)"
                :name="'answer' + index"
              />
              <span>{{ answer.title }}</span>
            </label>
          </div>
          <button @click="resultHistory" class="test-detail__view-result">
            Увидеть результат
          </button>
        </template>
        <!-- история финиш -->

        <!-- география старт -->
        <template v-if="this.$route.params.id == 3">
          <div
            class="test-detail__item"
            v-for="(item, index) in testsDetailGeografiya"
            :key="index"
          >
            <h5>
              <span>{{ item.id }}.</span> {{ item.title }}
            </h5>
            <label v-for="(answer, i) in item.answers" :key="i">
              <input
                type="radio"
                @change="clickRadio(index, answer)"
                :name="'answer' + index"
              />
              <span>{{ answer.title }}</span>
            </label>
          </div>
          <button @click="resultGeografiya" class="test-detail__view-result">
            Увидеть результат
          </button>
        </template>
        <!-- география финиш -->
      </div>
      <div v-else>
        <div class="result-text">
          Правильные ответы: {{ count }} из 30 тестов
        </div>
        <div>
          <button class="test-again" @click="againTest">
            Прости тест заново
          </button>
          <router-link to="/" class="link-page">Главная страница</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectAnswer: "",
      dataResult: [],
      viewResult: null,
      count: 0,
      subjectName: "История",
      // английский старт
      testsDetail: [
        {
          title:
            "Use the required tense instead of the infinitives in brackets : My mother (to have) a bad headache.",
          id: 1,
          answers: [
            {
              title: "am",
              isTrue: false,
            },
            {
              title: "has",
              isTrue: true,
            },
            {
              title: "has got",
              isTrue: false,
            },
            {
              title: "have got",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Use the required tense instead of the infinitives in brackets : my friend (to study) two foreign languages?",
          id: 2,
          answers: [
            {
              title: "Do study ...",
              isTrue: false,
            },
            {
              title: "Does my friend studies ...",
              isTrue: false,
            },
            {
              title: "Do my friend studys ...",
              isTrue: false,
            },
            {
              title: "Does my friend study ...",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Use the required tense instead of the infinitives in brackets : The teacher (to point) at the blackboard when he (to want) to explain something",
          id: 3,
          answers: [
            {
              title:
                "The teacher points at the blackboard when he wants to explain something",
              isTrue: true,
            },
            {
              title:
                "The teacher point at the blackboard when he want to explain something",
              isTrue: false,
            },
            {
              title:
                "The teacher pointed at the blackboard when he wanted to explain something",
              isTrue: false,
            },
            {
              title:
                "The teacher pointed to the blackboard when he wanted to explain something",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Use the required tense instead of the infinitives in brackets : The teacher (to give out) us English magazines at every lesson.",
          id: 4,
          answers: [
            {
              title: "gives out",
              isTrue: true,
            },
            {
              title: "give out",
              isTrue: false,
            },
            {
              title: "will give out",
              isTrue: false,
            },
            {
              title: "gave out",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Use the required tense instead of the infinitives in brackets : Every morning, she (to hurry) to the University.",
          id: 5,
          answers: [
            {
              title: "hurry",
              isTrue: false,
            },
            {
              title: "hurries",
              isTrue: true,
            },
            {
              title: "will hurry",
              isTrue: false,
            },
            {
              title: "hurried",
              isTrue: false,
            },
          ],
        },
        {
          title: "you any time to help me? - Sony, I",
          id: 6,
          answers: [
            {
              title: "Have you got, am not;",
              isTrue: false,
            },
            {
              title: "Do you have, have got;",
              isTrue: false,
            },
            {
              title: "Do you have, have got you;",
              isTrue: false,
            },
            {
              title: "Do you have, don't;",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Use the required tense instead of the infinitives in brackets : On Mondays, I always (to do) physical exercise.",
          id: 7,
          answers: [
            {
              title: "do does",
              isTrue: false,
            },
            {
              title: "has do",
              isTrue: false,
            },
            {
              title: "do",
              isTrue: true,
            },
            {
              title: "does",
              isTrue: false,
            },
          ],
        },
        {
          title: "I (not/understand) that man because I (not/know) English.",
          id: 8,
          answers: [
            {
              title: "don't understand, don’t know;",
              isTrue: true,
            },
            {
              title: "not understand, don't know;",
              isTrue: false,
            },
            {
              title: "don't understand, not know;",
              isTrue: false,
            },
            {
              title: "do not understand, not know;",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Use the required tense instead of the infinitives in brackets : The sun (to rise) every day",
          id: 9,
          answers: [
            {
              title: "The sun rise every day",
              isTrue: false,
            },
            {
              title: "The sun rised every day",
              isTrue: false,
            },
            {
              title: "The sun rising every day",
              isTrue: false,
            },
            {
              title: "The sun rises every day",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Every day I help my Mom about the house, but last week I was very busy with my exam. So I (not help) her much.",
          id: 10,
          answers: [
            {
              title: "not helped",
              isTrue: false,
            },
            {
              title: "didn't helped",
              isTrue: false,
            },
            {
              title: "don’t helped",
              isTrue: false,
            },
            {
              title: "didn't help",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Use the Present Indefinite or the Present Continuous instead of the infinitive in brackets: You can’t have the book now because my brother (to read) it.",
          id: 11,
          answers: [
            {
              title:
                "You can't have the book now because my brother reading it",
              isTrue: false,
            },
            {
              title: "You can't have the book now because my brother read it",
              isTrue: false,
            },
            {
              title: "You can't have the book now because my brother readed it",
              isTrue: false,
            },
            {
              title:
                "You can't have the book now because my brother is reading it",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Use Present Continuous of the infinitive in brackets : He (to plant) new trees in the orchard now.",
          id: 12,
          answers: [
            {
              title: "are planting",
              isTrue: false,
            },
            {
              title: "is planting",
              isTrue: true,
            },
            {
              title: "am planting",
              isTrue: false,
            },
            {
              title: "are plant",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Use the Present Indefinite or the Present Continuous instead of the infinitive in brackets: Do not go out; it (to rain) heavily.",
          id: 13,
          answers: [
            {
              title: "Do not go out; it raining heavily",
              isTrue: false,
            },
            {
              title: "Do not go out; it is raining heavily",
              isTrue: true,
            },
            {
              title: "Do not go out; it is rain heavily",
              isTrue: false,
            },
            {
              title: "Don’t go out; it is rain heavily",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Use the Present Indefinite or the Present Continuous instead of the infinitive in brackets: They still (to discuss) where to go now.",
          id: 14,
          answers: [
            {
              title: "They still discussing where to go now",
              isTrue: false,
            },
            {
              title: "They are still discuss where to go now",
              isTrue: false,
            },
            {
              title: "There are still discuss where to go now",
              isTrue: false,
            },
            {
              title: "They are still discussing where to go now",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Use Present Continuous of the infinitive in brackets : Go and see what the children (to do)g",
          id: 15,
          answers: [
            {
              title: "Go and see what the children are doing",
              isTrue: true,
            },
            {
              title: "Go and see what the children to did",
              isTrue: false,
            },
            {
              title: "Go and see what the children doing",
              isTrue: false,
            },
            {
              title: "Go and see what the children to do",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Use Present Continuous of the infinitive in brackets : Look! He (to ride) a new bicycle.",
          id: 16,
          answers: [
            {
              title: "are riding",
              isTrue: false,
            },
            {
              title: "is riding",
              isTrue: true,
            },
            {
              title: "am riding",
              isTrue: false,
            },
            {
              title: "is ride",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Use the Present Indefinite or the Present Continuous instead of the infinitive in brackets : Very often I (to go) to the University by Metro, but today I (to go) by bus.",
          id: 17,
          answers: [
            {
              title: "go; am going",
              isTrue: true,
            },
            {
              title: "is going; go",
              isTrue: false,
            },
            {
              title: "go; is going",
              isTrue: false,
            },
            {
              title: "am going; go",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Use the Present Indefinite or the Present Continuous instead of die infinitive in brackets : I (not to think) he (to take) his Physics exam now.",
          id: 18,
          answers: [
            {
              title: "are not thinking; takes",
              isTrue: false,
            },
            {
              title: "does not think; is taking",
              isTrue: false,
            },
            {
              title: "do not think; is taking",
              isTrue: true,
            },
            {
              title: "do not think; are taking",
              isTrue: false,
            },
          ],
        },
        {
          title: "Why you (put on) the coat? It’s sunny today.",
          id: 19,
          answers: [
            {
              title: "are you putting on;",
              isTrue: true,
            },
            {
              title: "do you put on;",
              isTrue: false,
            },
            {
              title: "are you puting on;",
              isTrue: false,
            },
            {
              title: "will you put on;",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Use the Present Indefinite or the Present Continuous instead of the infinitive in brackets : Mother (to cook) breakfast in the kitchen; she always (to cook) in the morning.",
          id: 20,
          answers: [
            {
              title:
                "Mother is cook breakfast in the kitchen; she always cooks in the morning",
              isTrue: false,
            },
            {
              title:
                "Mother is cooking breakfast in the kitchen; she always cooks in the morning",
              isTrue: true,
            },
            {
              title:
                "Mother cook breakfast in the kitchen; she always cooks in the morning",
              isTrue: false,
            },
            {
              title:
                "Mother cooked breakfast in the kitchen; she always cooks in the morning",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Write questions in present perfect simple. I have been in my room.",
          id: 21,
          answers: [
            {
              title: "Have I ever been in my room?;",
              isTrue: true,
            },
            {
              title: "Where have you be?;",
              isTrue: false,
            },
            {
              title: "Where have you been?;",
              isTrue: false,
            },
            {
              title: "Where have been you?;",
              isTrue: false,
            },
          ],
        },
        {
          title: "She put on the red dress, which she _______for ages.",
          id: 22,
          answers: [
            {
              title: "had not worn;",
              isTrue: true,
            },
            {
              title: "has not worn;",
              isTrue: false,
            },
            {
              title: "not had worn;",
              isTrue: false,
            },
            {
              title: "haven’t wear;",
              isTrue: false,
            },
          ],
        },
        {
          title: "We the camp by 10 o'clock, I believe.",
          id: 23,
          answers: [
            {
              title: "reached;",
              isTrue: false,
            },
            {
              title: "were reaching;",
              isTrue: false,
            },
            {
              title: "be reached;",
              isTrue: false,
            },
            {
              title: "will have reached;",
              isTrue: true,
            },
          ],
        },
        {
          title: "By the end of August we'll",
          id: 24,
          answers: [
            {
              title: "have moved;",
              isTrue: true,
            },
            {
              title: "move;",
              isTrue: false,
            },
            {
              title: "will move;",
              isTrue: false,
            },
            {
              title: "moved",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Put the adverbs of Indefinite tune in their proper place: Have you made the beds, Ann (already)?",
          id: 25,
          answers: [
            {
              title: "Have you made aheadv the beds, Ann?",
              isTrue: false,
            },
            {
              title: "Have you made aheadv the beds, Ann?",
              isTrue: false,
            },
            {
              title: "Have already you made the beds, Ann?",
              isTrue: false,
            },
            {
              title: "Have you already made the beds, Ann?",
              isTrue: true,
            },
          ],
        },
        {
          title: "We'll decorating the room before you get back.",
          id: 26,
          answers: [
            {
              title: "finish;",
              isTrue: false,
            },
            {
              title: "have finished;",
              isTrue: true,
            },
            {
              title: "finished;",
              isTrue: false,
            },
            {
              title: "finishing;",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "By that time I'll from the University and will a well-paid job, I hope.",
          id: 27,
          answers: [
            {
              title: "graduate, have got;",
              isTrue: false,
            },
            {
              title: "graduate, get;",
              isTrue: false,
            },
            {
              title: "have graduated, get;",
              isTrue: false,
            },
            {
              title: "have graduated, have got;",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Put the adverbs of Indefinite time in their proper place: We have been there before (never)",
          id: 28,
          answers: [
            {
              title: "We never have been there before",
              isTrue: false,
            },
            {
              title: "We have never been there before",
              isTrue: true,
            },
            {
              title: "We never had been there before",
              isTrue: false,
            },
            {
              title: "We never has been there before",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Put the adverbs of Indefinite time in their proper place: She hasn’t finished doing the room (yet)",
          id: 29,
          answers: [
            {
              title: "She hasn't finished doing the room yet",
              isTrue: true,
            },
            {
              title: "She yet hasn't finished doing the room",
              isTrue: false,
            },
            {
              title: "She hasn't finished yet doing the room",
              isTrue: false,
            },
            {
              title: "She haven't finished yet doing the room",
              isTrue: false,
            },
          ],
        },
        {
          title: "I _______ the key that he had given to me.",
          id: 30,
          answers: [
            {
              title: "had lost;",
              isTrue: false,
            },
            {
              title: "losing;",
              isTrue: false,
            },
            {
              title: "losted;",
              isTrue: false,
            },
            {
              title: "lost;",
              isTrue: true,
            },
          ],
        },
      ],
      // английский финиш
      // история старт
      testsDetailHistory: [
        {
          title:
            "Первая в истории человечества эпоха, характеризующаяся коллективным трудом и потреблением – это:",
          id: 1,
          answers: [
            {
              title: "первобытнообщинный строй",
              isTrue: true,
            },
            {
              title: "рабовладельческий строй",
              isTrue: false,
            },
            {
              title: "матриархат",
              isTrue: false,
            },
            {
              title: "патриархат",
              isTrue: false,
            },
          ],
        },
        {
          title: "Родиной первичных цивилизаций являлись:",
          id: 2,
          answers: [
            {
              title: "горы",
              isTrue: false,
            },
            {
              title: "лесные массивы",
              isTrue: false,
            },
            {
              title: "степные равнины",
              isTrue: false,
            },
            {
              title: "долины рек",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Наиболее продолжительный этап в истории человеческого общества.",
          id: 3,
          answers: [
            {
              title: "палеолит",
              isTrue: true,
            },
            {
              title: "мезолит",
              isTrue: false,
            },
            {
              title: "бронзовый век",
              isTrue: false,
            },
            {
              title: "железный век",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Крупнейший памятник эпохи раннего палеолита на территории Узбекистана.",
          id: 4,
          answers: [
            {
              title: "Кульбулак",
              isTrue: true,
            },
            {
              title: "Айртам",
              isTrue: false,
            },
            {
              title: "Тешик-Таш",
              isTrue: false,
            },
            {
              title: "Фаяз-тепа",
              isTrue: false,
            },
          ],
        },
        {
          title: "Наиболее распространенные орудия труда раннего палеолита.",
          id: 5,
          answers: [
            {
              title: "рубила",
              isTrue: false,
            },
            {
              title: "чопперы",
              isTrue: true,
            },
            {
              title: "остроконечники",
              isTrue: false,
            },
            {
              title: "топоры",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Cтоянка, где были обнаружены останки «фергантропа» - древнего человека, обитавшего на территории Средней Азии?",
          id: 6,
          answers: [
            {
              title: "Канка",
              isTrue: false,
            },
            {
              title: "Халчаян",
              isTrue: false,
            },
            {
              title: "Топрак-кала",
              isTrue: false,
            },
            {
              title: "Селенгур",
              isTrue: true,
            },
          ],
        },
        {
          title: "Главное достижение эпохи мустье:",
          id: 7,
          answers: [
            {
              title: "появление религиозных верований",
              isTrue: false,
            },
            {
              title: "возникновение изобразительного искусства",
              isTrue: false,
            },
            {
              title: "искусственное добывание огня",
              isTrue: true,
            },
            {
              title: "строительство наземных жилищ",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Что не является характерной чертой материнской родовой общины?",
          id: 8,
          answers: [
            {
              title: "кочевой образ жизни",
              isTrue: true,
            },
            {
              title: "высокое положение женщины в обществе",
              isTrue: false,
            },
            {
              title: "коллективное владение орудиями и средствами производства",
              isTrue: false,
            },
            {
              title: "разделение труда по признаку пола",
              isTrue: false,
            },
          ],
        },
        {
          title: "В чем состоит сущность «неолитической революции»?",
          id: 9,
          answers: [
            {
              title: "возникновение земледелия и скотоводства",
              isTrue: false,
            },
            {
              title: "переход от матриархата к патриархату",
              isTrue: false,
            },
            {
              title: "формирование человека современного типа",
              isTrue: false,
            },
            {
              title: "переход от присваивающего к производящему хозяйству",
              isTrue: true,
            },
          ],
        },
        {
          title: "В какую эпоху в Средней Азии появляется ирригация?",
          id: 10,
          answers: [
            {
              title: "энеолита",
              isTrue: false,
            },
            {
              title: "неолита",
              isTrue: false,
            },
            {
              title: "железа",
              isTrue: false,
            },
            {
              title: "бронзы",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "По какой главной причине произошел переход от матриархата к патриархату?",
          id: 11,
          answers: [
            {
              title: "возникновение торговли",
              isTrue: false,
            },
            {
              title: "участившиеся набеги кочевых племен",
              isTrue: false,
            },
            {
              title: "появление ремесленного производства",
              isTrue: false,
            },
            {
              title: "отделение скотоводства от земледелия",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Первый металл, использовавшийся человеком для изготовления орудий труда.",
          id: 12,
          answers: [
            {
              title: "железо",
              isTrue: false,
            },
            {
              title: "медь",
              isTrue: true,
            },
            {
              title: "бронза",
              isTrue: false,
            },
            {
              title: "свинец",
              isTrue: false,
            },
          ],
        },
        {
          title: "Главная роль, которую сыграло применение железа.",
          id: 13,
          answers: [
            {
              title: "рост численности населения",
              isTrue: false,
            },
            {
              title: "разрушение первобытнообщинного строя",
              isTrue: true,
            },
            {
              title: "развитие металлургического производства",
              isTrue: false,
            },
            {
              title: "прогресс в развитии земледелия",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Что не являлось характерной чертой развития народов Средней Азии в древности?",
          id: 14,
          answers: [
            {
              title: "поливное земледелие",
              isTrue: false,
            },
            {
              title: "раннее развитие торговли",
              isTrue: false,
            },
            {
              title: "наличие устойчивой общины",
              isTrue: false,
            },
            {
              title: "появление частной собственности на землю",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Как называлась предписьменность, возникшая в Средней Азии в эпоху мезолита?",
          id: 15,
          answers: [
            {
              title: "пиктография",
              isTrue: true,
            },
            {
              title: "руническое письмо",
              isTrue: false,
            },
            {
              title: "клинопись",
              isTrue: false,
            },
            {
              title: "петроглифы",
              isTrue: false,
            },
          ],
        },
        {
          title: "Древнейший источник изучения истории Узбекистана.",
          id: 16,
          answers: [
            {
              title: "Бехистунская надпись",
              isTrue: false,
            },
            {
              title: "Авеста",
              isTrue: true,
            },
            {
              title: "Коран",
              isTrue: false,
            },
            {
              title: "Орхоно-Енисейские надписи",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Первая религиозная система, пришедшая на смену примитивным верованиям на территории Средней Азии.",
          id: 17,
          answers: [
            {
              title: "зороастризм",
              isTrue: true,
            },
            {
              title: "манихейство",
              isTrue: false,
            },
            {
              title: "маздакизм",
              isTrue: false,
            },
            {
              title: "буддизм",
              isTrue: false,
            },
          ],
        },
        {
          title: "Родина зороастризма и «Авесты».",
          id: 18,
          answers: [
            {
              title: "Мидия",
              isTrue: false,
            },
            {
              title: "Бактрия",
              isTrue: false,
            },
            {
              title: "Хорезм",
              isTrue: true,
            },
            {
              title: "Фергана",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Кто впервые перевел священную книгу «Авесту» на один из европейских языков?",
          id: 19,
          answers: [
            {
              title: "Дюперрон",
              isTrue: true,
            },
            {
              title: "Бойс",
              isTrue: false,
            },
            {
              title: "Рихтгофен",
              isTrue: false,
            },
            {
              title: "Шлиман",
              isTrue: false,
            },
          ],
        },
        {
          title: "Верховный бог в зороастризме – это:",
          id: 20,
          answers: [
            {
              title: "Ахриман",
              isTrue: false,
            },
            {
              title: "Ахурамазда",
              isTrue: true,
            },
            {
              title: "Митра",
              isTrue: false,
            },
            {
              title: "Хумо",
              isTrue: false,
            },
          ],
        },
        {
          title: "Сколько книг по сведениям Беруни включала в себя «Авеста»?",
          id: 21,
          answers: [
            {
              title: "21",
              isTrue: true,
            },
            {
              title: "35",
              isTrue: false,
            },
            {
              title: "5",
              isTrue: false,
            },
            {
              title: "17",
              isTrue: false,
            },
          ],
        },
        {
          title: "Какая часть «Авесты» является наиболее древней?",
          id: 22,
          answers: [
            {
              title: "Гаты",
              isTrue: true,
            },
            {
              title: "Видевдат",
              isTrue: false,
            },
            {
              title: "Виспрат",
              isTrue: false,
            },
            {
              title: "Яшты",
              isTrue: false,
            },
          ],
        },
        {
          title: "Как назывался в «Авесте» род?",
          id: 23,
          answers: [
            {
              title: "нмана",
              isTrue: false,
            },
            {
              title: "занту",
              isTrue: false,
            },
            {
              title: "дахъю",
              isTrue: false,
            },
            {
              title: "вис",
              isTrue: true,
            },
          ],
        },
        {
          title: "Какой термин употреблялся в «Авесте» для обозначения рабов?",
          id: 24,
          answers: [
            {
              title: "вира",
              isTrue: true,
            },
            {
              title: "асна",
              isTrue: false,
            },
            {
              title: "азата",
              isTrue: false,
            },
            {
              title: "шудра",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Возникновение древних государств на территории Средней Азии связано с:",
          id: 25,
          answers: [
            {
              title: "отделением скотоводства от земледелия",
              isTrue: true,
            },
            {
              title: "разделением труда по признаку пола",
              isTrue: false,
            },
            {
              title: "отделением ремесла от земледелия",
              isTrue: false,
            },
            {
              title: "развитием ирригации",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Какой тип хозяйственный деятельности характерен для периода возникновения государственности?",
          id: 26,
          answers: [
            {
              title: "присваивающее хозяйство",
              isTrue: false,
            },
            {
              title: "производящее хозяйство",
              isTrue: true,
            },
            {
              title: "домашнее хозяйство",
              isTrue: false,
            },
            {
              title: "натуральное хозяйство",
              isTrue: false,
            },
          ],
        },
        {
          title: "Государство – это:",
          id: 27,
          answers: [
            {
              title: "форма правления",
              isTrue: false,
            },
            {
              title: "форма политического режима",
              isTrue: false,
            },
            {
              title: "форма политического устройства",
              isTrue: false,
            },
            {
              title: "форма политической власти",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "В какой сфере наиболее широко применялся рабский труд в Средней Азии?",
          id: 28,
          answers: [
            {
              title: "земледелие",
              isTrue: false,
            },
            {
              title: "домашнее хозяйство",
              isTrue: true,
            },
            {
              title: "скотоводство",
              isTrue: false,
            },
            {
              title: "ремесленное производство",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Один из центров формирования древнехорезмийской государственности?",
          id: 29,
          answers: [
            {
              title: "Кюзелигыр",
              isTrue: true,
            },
            {
              title: "Афрасиаб",
              isTrue: false,
            },
            {
              title: "Зариаспа",
              isTrue: false,
            },
            {
              title: "Кызылтепа",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Древнегреческий автор, в трудах которого имеются сведения о Древнебактрийском царстве.",
          id: 30,
          answers: [
            {
              title: "Страбон",
              isTrue: false,
            },
            {
              title: "Геродот",
              isTrue: false,
            },
            {
              title: "Курций Руф",
              isTrue: false,
            },
            {
              title: "Ктесий",
              isTrue: true,
            },
          ],
        },
      ],
      // история финиш
      // география старт
      testsDetailGeografiya: [
        {
          title: "В международной практике слово «суб регион» обозначает:",
          id: 1,
          answers: [
            {
              title: "несколько регионов с общими особенностями развития",
              isTrue: true,
            },
            {
              title: "часть региона, объединяющую несколько соседних стран",
              isTrue: false,
            },
            {
              title: "несколько частей света",
              isTrue: false,
            },
            {
              title: "патриархат",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "На современной политической карте мира насчитывается _______ государств:",
          id: 2,
          answers: [
            {
              title: "230",
              isTrue: false,
            },
            {
              title: "200",
              isTrue: false,
            },
            {
              title: "130",
              isTrue: false,
            },
            {
              title: "250",
              isTrue: true,
            },
          ],
        },
        {
          title: "Правильное утверждение «страны «удобного флага» – это»:",
          id: 3,
          answers: [
            {
              title: "Кипр, Панама, Либерия",
              isTrue: true,
            },
            {
              title: "Великобритания, Либерия, ФРГ",
              isTrue: false,
            },
            {
              title: "Япония, Кипр, Панама",
              isTrue: false,
            },
            {
              title: "Франция, Мальта, Либерия",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "На протяжении многих лет выясняют проблему принадлежности Гибралтара:",
          id: 4,
          answers: [
            {
              title: "Великобритания и Испания",
              isTrue: true,
            },
            {
              title: "Франция и Испания",
              isTrue: false,
            },
            {
              title: "Великобритания и Франция",
              isTrue: false,
            },
            {
              title: "Фаяз-тепа",
              isTrue: false,
            },
          ],
        },
        {
          title: "Россия занимает первое место в мире по запасам:",
          id: 5,
          answers: [
            {
              title: "калийных солей",
              isTrue: false,
            },
            {
              title: "нефти",
              isTrue: true,
            },
            {
              title: "золота",
              isTrue: false,
            },
            {
              title: "бокситов",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Объективной основой выделения макро регионов являются границы:",
          id: 6,
          answers: [
            {
              title: "материков",
              isTrue: false,
            },
            {
              title: "цивилизаций",
              isTrue: false,
            },
            {
              title: "частей света",
              isTrue: false,
            },
            {
              title: "государств",
              isTrue: true,
            },
          ],
        },
        {
          title:
            "Группа, в которой содержатся только верные утверждения в парах «страна – столица этой страны»:",
          id: 7,
          answers: [
            {
              title: "Бразилия – Сан-Паулу, Египет – Каир, Ирак – Багдад",
              isTrue: false,
            },
            {
              title: "Индия – Дели, Австралия – Сидней, Румыния – Бухарест",
              isTrue: false,
            },
            {
              title: "Испания – Мадрид, Португалия – Лиссабон, Мьянма – Янгон",
              isTrue: true,
            },
            {
              title: "Украина – Киев, Словения – Братислава, Германия – Бонн",
              isTrue: false,
            },
          ],
        },
        {
          title: "Группа стран, граничащих с Россией:",
          id: 8,
          answers: [
            {
              title: "Молдавия, Украина, Казахстан",
              isTrue: true,
            },
            {
              title: "Белоруссия, Болгария, Литва",
              isTrue: false,
            },
            {
              title: "Грузия, Азербайджан, Армения",
              isTrue: false,
            },
            {
              title:
                "Норвегия, Корейская Народно-Демократическая Республика, Грузия",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Приграничные конфликты в штатах Джамму и Кашмир происходят между государствами:",
          id: 9,
          answers: [
            {
              title: "Ираном и Ираком",
              isTrue: false,
            },
            {
              title: "Турцией и Ираном",
              isTrue: false,
            },
            {
              title: "Израилем и Палестиной",
              isTrue: false,
            },
            {
              title: "Индией и Пакистаном",
              isTrue: true,
            },
          ],
        },
        {
          title: "По запасам нефти Россия уступает только:",
          id: 10,
          answers: [
            {
              title: "США и Китаю",
              isTrue: false,
            },
            {
              title: "Ираку и Кувейту",
              isTrue: false,
            },
            {
              title: "Ираку и Ирану",
              isTrue: false,
            },
            {
              title: "ОАЭ и Саудовской Аравии",
              isTrue: true,
            },
          ],
        },
        {
          title: "Классификация народов по языку носит название:",
          id: 11,
          answers: [
            {
              title: "географическая",
              isTrue: false,
            },
            {
              title: "конфессиональная",
              isTrue: false,
            },
            {
              title: "демографическая",
              isTrue: false,
            },
            {
              title: "лингвистическая",
              isTrue: true,
            },
          ],
        },
        {
          title: "Регион с максимальной долей городского населения:",
          id: 12,
          answers: [
            {
              title: "Латинская Америка",
              isTrue: false,
            },
            {
              title: "Азия",
              isTrue: true,
            },
            {
              title: "Европа",
              isTrue: false,
            },
            {
              title: "Северная Америка",
              isTrue: false,
            },
          ],
        },
        {
          title: "Объектом исследования экономической географии является:",
          id: 13,
          answers: [
            {
              title: "религиозный состав населения",
              isTrue: false,
            },
            {
              title: "территориальная структура хозяйства",
              isTrue: true,
            },
            {
              title: "трудовые ресурсы",
              isTrue: false,
            },
            {
              title: "размещение природных ресурсов",
              isTrue: false,
            },
          ],
        },
        {
          title: "Регионалистика – это свод знаний:",
          id: 14,
          answers: [
            {
              title: "о макро регионах",
              isTrue: false,
            },
            {
              title: "о суб регионах",
              isTrue: false,
            },
            {
              title: "о регионах",
              isTrue: false,
            },
            {
              title: "об экономических районах",
              isTrue: true,
            },
          ],
        },
        {
          title: "Крупнейшим мировым объединением государств является:",
          id: 15,
          answers: [
            {
              title: "Европейский союз",
              isTrue: true,
            },
            {
              title: "Северо-Атлантический договор (НАТО)",
              isTrue: false,
            },
            {
              title: "Организация Объединенных Наций",
              isTrue: false,
            },
            {
              title: "Организация экономического сотрудничества и развития",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Космические, климатические и геотермальные природные ресурсы относятся к группе:",
          id: 16,
          answers: [
            {
              title: "возобновимых",
              isTrue: false,
            },
            {
              title: "неисчерпаемых",
              isTrue: true,
            },
            {
              title: "невозобновимых",
              isTrue: false,
            },
            {
              title: "исчерпаемых",
              isTrue: false,
            },
          ],
        },
        {
          title: "Экономически активное население – это:",
          id: 17,
          answers: [
            {
              title: "занятые и безработные",
              isTrue: true,
            },
            {
              title: "трудовые ресурсы и пенсионеры",
              isTrue: false,
            },
            {
              title: "занятые и пенсионеры",
              isTrue: false,
            },
            {
              title: "занятые и лица до трудоспособного возраста",
              isTrue: false,
            },
          ],
        },
        {
          title: "Группа рудных полезных ископаемых:",
          id: 18,
          answers: [
            {
              title: "апатиты, калийные соли",
              isTrue: false,
            },
            {
              title: "железная руда, нефть",
              isTrue: false,
            },
            {
              title: "бокситы, полиметаллы",
              isTrue: true,
            },
            {
              title: "железная руда, уголь",
              isTrue: false,
            },
          ],
        },
        {
          title: "Группа нерудных полезных ископаемых:",
          id: 19,
          answers: [
            {
              title: "калийные соли, нефелины, уголь",
              isTrue: false,
            },
            {
              title: "нефть, бокситы, фосфориты",
              isTrue: false,
            },
            {
              title: "апатиты, бокситы, уголь",
              isTrue: false,
            },
            {
              title: "фосфориты, апатиты, асбест",
              isTrue: true,
            },
          ],
        },
        {
          title: "Третья по численности приверженцев мировая религия:",
          id: 20,
          answers: [
            {
              title: "христианство",
              isTrue: false,
            },
            {
              title: "ислам",
              isTrue: true,
            },
            {
              title: "синтоизм",
              isTrue: false,
            },
            {
              title: "буддизм",
              isTrue: false,
            },
          ],
        },
        {
          title: "Миграционный поток, идущий в страну – это:",
          id: 21,
          answers: [
            {
              title: "иммиграция",
              isTrue: true,
            },
            {
              title: "эмиграция",
              isTrue: false,
            },
            {
              title: "сезонная миграция",
              isTrue: false,
            },
            {
              title: "миграция",
              isTrue: false,
            },
          ],
        },
        {
          title: "Государство с монархической формой правления:",
          id: 22,
          answers: [
            {
              title: "Дания",
              isTrue: true,
            },
            {
              title: "Турция",
              isTrue: false,
            },
            {
              title: "Индия",
              isTrue: false,
            },
            {
              title: "Португалия",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Группа государств, входящих в состав Содружества, возглавляемого Великобританией:",
          id: 23,
          answers: [
            {
              title: "Австралия, Индия, Бельгия",
              isTrue: false,
            },
            {
              title: "Дания, Канада, ЮАР",
              isTrue: false,
            },
            {
              title: "Канада, Алжир, Индия",
              isTrue: false,
            },
            {
              title: "Канада, Ирландия, Австралия",
              isTrue: true,
            },
          ],
        },
        {
          title: "К главным капиталистическим странам относятся – США:",
          id: 24,
          answers: [
            {
              title: "Япония, ФРГ",
              isTrue: true,
            },
            {
              title: "Япония, Россия",
              isTrue: false,
            },
            {
              title: "Италия, Испания",
              isTrue: false,
            },
            {
              title: "Канада, Португалия",
              isTrue: false,
            },
          ],
        },
        {
          title: "Правильное утверждение «ключевые страны – это» Бразилия:",
          id: 25,
          answers: [
            {
              title: "Мексика, Китай",
              isTrue: true,
            },
            {
              title: "Таиланд, Йемен",
              isTrue: false,
            },
            {
              title: "Индия, ОАЭ",
              isTrue: false,
            },
            {
              title: "Мексика, Индия",
              isTrue: false,
            },
          ],
        },
        {
          title:
            "Какой тип хозяйственный деятельности характерен для периода возникновения государственности?",
          id: 26,
          answers: [
            {
              title: "присваивающее хозяйство",
              isTrue: false,
            },
            {
              title: "производящее хозяйство",
              isTrue: true,
            },
            {
              title: "домашнее хозяйство",
              isTrue: false,
            },
            {
              title: "натуральное хозяйство",
              isTrue: false,
            },
          ],
        },
        {
          title: "Государство – это:",
          id: 27,
          answers: [
            {
              title: "форма правления",
              isTrue: false,
            },
            {
              title: "форма политического режима",
              isTrue: false,
            },
            {
              title: "форма политического устройства",
              isTrue: false,
            },
            {
              title: "форма политической власти",
              isTrue: true,
            },
          ],
        },
        {
          title:
            " Форма правления государства, при которой законодательная власть принадлежит парламенту, а исполнительная – правительству:",
          id: 28,
          answers: [
            {
              title: "федерация",
              isTrue: false,
            },
            {
              title: "республика",
              isTrue: true,
            },
            {
              title: "монархия абсолютная",
              isTrue: false,
            },
            {
              title: "монархия конституционная",
              isTrue: false,
            },
          ],
        },
        {
          title: "В РФ преобладает форма сельского расселения:",
          id: 29,
          answers: [
            {
              title: "групповая (деревенская)",
              isTrue: true,
            },
            {
              title: "хуторская",
              isTrue: false,
            },
            {
              title: "рассеянная (фермерская)",
              isTrue: false,
            },
            {
              title: "пригородная",
              isTrue: false,
            },
          ],
        },
        {
          title: "Город Палана является центром:",
          id: 30,
          answers: [
            {
              title: "Республики Тыва",
              isTrue: false,
            },
            {
              title: "Республики Коми",
              isTrue: false,
            },
            {
              title: "Ненецкого автономного округа",
              isTrue: false,
            },
            {
              title: "Корякского автономного округа",
              isTrue: true,
            },
          ],
        },
      ],
      // география финиш
    };
  },
  created() {},
  mounted() {
    if (this.$route.params.id == 1) {
      this.subjectName = "Английский язык";
    } else if (this.$route.params.id == 2) {
      this.subjectName = "История";
    } else if (this.$route.params.id == 3) {
      this.subjectName = "География";
    } else {
      this.subjectName = "Русский язык";
    }
    // английский старт
    if (this.$route.params.id == 1) {
      this.testsDetail.forEach((item) => {
        this.dataResult.push({
          question: item,
          answer: null,
        });
      });
    }
    // английский финиш

    // история старт
    if (this.$route.params.id == 2) {
      this.testsDetailHistory.forEach((item) => {
        this.dataResult.push({
          question: item,
          answer: null,
        });
      });
    }
    // история финиш

    // история старт
    if (this.$route.params.id == 3) {
      this.testsDetailGeografiya.forEach((item) => {
        this.dataResult.push({
          question: item,
          answer: null,
        });
      });
    }
    // история финиш
  },
  methods: {
    // английский старт
    resultEnglish() {
      let sendData = [];

      this.dataResult.forEach((item, index) => {
        let answer = item.answer;

        let ritem = {
          title: item.question.title,
          isTrue: true,
          answer: answer,
          trueAnswer: null,
        };

        let trueAnswer;
        trueAnswer = this.testsDetail[index].answers.find(
          (item) => item.isTrue === true
        );

        if (!(answer == null)) {
          // for type test one select
          if (!answer.isTrue) {
            ritem.isTrue = false;
          }
        } else {
          ritem.isTrue = false;
          ritem.answer = null;
        }

        ritem.trueAnswer = trueAnswer;

        sendData.push(ritem);
      });

      this.viewResult = sendData;

      this.viewResult.forEach((item) => {
        if (item.isTrue) {
          this.count++;
        }
      });
    },
    // английский финиш
    // история старт
    resultHistory() {
      let sendData = [];

      this.dataResult.forEach((item, index) => {
        let answer = item.answer;

        let ritem = {
          title: item.question.title,
          isTrue: true,
          answer: answer,
          trueAnswer: null,
        };

        let trueAnswer;
        trueAnswer = this.testsDetailHistory[index].answers.find(
          (item) => item.isTrue === true
        );

        if (!(answer == null)) {
          // for type test one select
          if (!answer.isTrue) {
            ritem.isTrue = false;
          }
        } else {
          ritem.isTrue = false;
          ritem.answer = null;
        }

        ritem.trueAnswer = trueAnswer;

        sendData.push(ritem);
      });

      this.viewResult = sendData;

      this.viewResult.forEach((item) => {
        if (item.isTrue) {
          this.count++;
        }
      });
    },

    resultGeografiya() {
      let sendData = [];

      this.dataResult.forEach((item, index) => {
        let answer = item.answer;

        let ritem = {
          title: item.question.title,
          isTrue: true,
          answer: answer,
          trueAnswer: null,
        };

        let trueAnswer;
        trueAnswer = this.testsDetailGeografiya[index].answers.find(
          (item) => item.isTrue === true
        );

        if (!(answer == null)) {
          // for type test one select
          if (!answer.isTrue) {
            ritem.isTrue = false;
          }
        } else {
          ritem.isTrue = false;
          ritem.answer = null;
        }

        ritem.trueAnswer = trueAnswer;

        sendData.push(ritem);
      });

      this.viewResult = sendData;

      this.viewResult.forEach((item) => {
        if (item.isTrue) {
          this.count++;
        }
      });
    },
    // история финиш
    clickRadio(index, answer) {
      this.dataResult[index].answer = answer;
    },
    againTest() {
      this.viewResult = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.test-detail {
  margin-bottom: 80px;
  &__title {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 40px;
    font-weight: 500;
  }
  h5 {
    margin-bottom: 20px;
  }
  label {
    width: 100%;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin: 0 0 0 10px;
    }
  }
  &__item {
    margin-bottom: 20px;
  }
  &__view-result,
  .test-again {
    background-color: #fdc100;
    border: 0;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    outline: none;
    border-radius: 10px;
    color: #333;
    padding: 12px 24px;
    margin-top: 40px;
  }
  .result-text {
    font-size: 18px;
    line-height: 24px;
  }
  .link-page {
    display: block;
    margin-top: 20px;
  }
}
</style>
