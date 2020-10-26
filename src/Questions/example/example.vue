<template>
  <div class="main-container">
    <lbd-questions
      ref="questions"
      :questions="questions"
      answer-primary-key="sort"
      answer-order-key="order"
      @requiredToast="toast"
      @submit="handleSubmit"
    />

    <button @click="$refs['questions'].resetQuestions()">重置</button>
    <button @click="$refs['questions'].forceOverQuestion()">强制结束本题</button>
  </div>
</template>

<script>
import Question from '../Questions'
const QuestionTypes = {
  //单选
  SINGLE: 1,
  //多选
  MULTI: 2
}
export default {
  name: 'example',
  data: () => ({
    questions: [
      {
        id: 1,
        title: '测试问题1',
        type: QuestionTypes.SINGLE,
        trueAnswers: [1],
        answers: [
          {
            sort: 1,
            order: 'A',
            title: '测试答案测试答案测试答案测试答案测试答案测试答案测试答案测试答案'
          },
          {
            sort: 2,
            order: 'B',
            title: '测试答案测试答案测试答案测试答案测试答案测试答案测试答案测试答案'
          },
          {
            sort: 3,
            order: 'C',
            title: '测试答案测试答案测试答案测试答案测试答案测试答案测试答案测试答案'
          },
          {
            sort: 4,
            order: 'D',
            title: '测试答案测试答案测试答案测试答案测试答案测试答案测试答案测试答案'
          }
        ]
      },
      {
        id: 2,
        title: '测试问题2',
        type: QuestionTypes.MULTI,
        trueAnswers: [1, 2],
        answers: [
          {
            sort: 1,
            order: 'A',
            title: '测试答案测试答案测试答案测试答案测试答案测试答案测试答案测试答案'
          },
          {
            sort: 2,
            order: 'B',
            title: '测试答案测试答案测试答案测试答案测试答案测试答案测试答案测试答案'
          },
          {
            sort: 3,
            order: 'C',
            title: '测试答案测试答案测试答案测试答案测试答案测试答案测试答案测试答案'
          },
          {
            sort: 4,
            order: 'D',
            title: '测试答案测试答案测试答案测试答案测试答案测试答案测试答案测试答案'
          }
        ]
      }
    ]
  }),
  components: {
    [Question.name]: Question
  },
  methods: {
    toast(message) {
      alert(message)
    },
    handleSubmit(data, counts) {
      console.log(data, counts)
    }
  }
}
</script>

<style lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

body {
  margin: 0;
  padding: 0;
}

.plate {
  width: 6rem;
  height: 6rem;
}

.start {
  width: 1.6rem;
}

button {
  margin-top: .2rem;
  font-size: .35rem;
}
</style>
