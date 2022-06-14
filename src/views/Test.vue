<template>
  <div class="solution-test">
    <div class="site-container">
      <div class="solution-test__title">Тесты по всем предметам</div>
      <div class="solution-test__wrap row">
        <router-link
          v-for="(item, index) in tests"
          :key="index"
          :to="{ name: 'test-detail', params: { id: item.id } }"
          class="solution-test__item col col-md-4"
        >
          <div class="solution-test__img">
            <img src="@/assets/images/test/history.jpg" alt="" />
          </div>
          <div class="solution-test__info">
            <div class="solution-test__name">{{ item.title }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tests: [
        {
          id: 1,
          image: "",
          title: "История",
        },
        {
          id: 2,
          image: "",
          title: "Английский язык",
        },
        {
          id: 3,
          image: "",
          title: "Русский язык",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.solution-test {
  margin-bottom: 40px;
  &__title {
    margin-bottom: 40px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
  }
  &__img {
    margin-bottom: 15px;
    border-radius: 10px;
    height: 200px;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__name {
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    color: #333;
  }
}
</style>
