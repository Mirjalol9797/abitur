<template>
  <div class="test-detail">
    <div class="site-container">
      <div class="test-detail__title">{{ subjectName }}</div>
      <div class="test-detail__wrap" v-if="!viewResult">
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
        <button @click="result" class="test-detail__view-result">
          Увидеть результат
        </button>
      </div>
      <div v-else>
        <div class="result-text">
          Вы решили из 30-ти {{ count }} правилного ответа
        </div>
        <div>
          <button class="test-again">Прости тест заново</button>
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
      testsDetail: [
        {
          id: "1",
          title:
            "Владением какой страны считались Филиппины в начале 20-х гг. XX в.?",
          answers: [
            {
              title: "Японии",
              isTrue: true,
            },
            {
              title: "Великобритании",
              isTrue: false,
            },
            {
              title: "США",
              isTrue: false,
            },
            {
              title: "Португалии",
              isTrue: false,
            },
          ],
        },
        {
          id: "2",
          title: "222222 22222222 2222222",
          answers: [
            {
              title: "2222222",
              isTrue: true,
            },
            {
              title: "2222222",
              isTrue: false,
            },
            {
              title: "22222222",
              isTrue: false,
            },
            {
              title: "222222222",
              isTrue: false,
            },
          ],
        },
      ],
    };
  },
  created() {
    this.testsDetail.forEach((item) => {
      this.dataResult.push({
        question: item,
        answer: null,
      });
    });
  },
  mounted() {
    console.log(this.$route.params.id);
    if (this.$route.params.id == 1) {
      this.subjectName = "История";
    } else if (this.$route.params.id == 2) {
      this.subjectName = "Английский язык";
    } else {
      this.subjectName = "Русский язык";
    }
  },
  methods: {
    result() {
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

      // await this.$store.commit("test/CHANGE_RESULT_DATA", sendData);
    },
    clickRadio(index, answer) {
      this.dataResult[index].answer = answer;
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
