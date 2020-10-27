/**
* @fileOverview Question
* @platform WEB
* @author 齐皓
* @date 2020/10/26
*/
<template>
  <div
    class="lbd-question-container"
    :style="{
      'color': primaryColor,
      'background-color': backgroundColor
    }"
    v-if="questions"
  >
    <div class="question-container">
      <div class="question-title">
        {{ showQuestionIndex ? `${currentQuestionIndex + 1}.` : '' }}
        {{ currentQuestion[questionTitleKey] }}
      </div>
    </div>
    <div class="divider" :style="{'background-color': dividerColor}"></div>
    <div class="answer-list">
      <div
        class="answer-item"
        :style="{
          'color': selectedAnswers[currentQuestion[questionPrimaryKey]].includes(answer[answerPrimaryKey])
          ? activeColor
          : primaryColor
        }"
        v-for="answer in currentQuestion[answersKey]"
        :key="answer[answerPrimaryKey]"
        @click="selectAnswer(answer)"
      >
        {{ answerOrderKey && `${answer[answerOrderKey]}.` }}
        {{ answer[answerTitleKey] }}
      </div>
    </div>
    <div
      class="answer-tip"
      :style="{'color': tipText === successText ? successColor : errorColor}"
      v-if="isShowTip()"
    >
      {{ tipText }}
      {{ showSuccessAnswer ? trueOrder : '' }}
    </div>
    <div class="button-list">
      <div v-if="isShowNext()" @click="nextQuestion">
        <slot name="next">
          <button class="next-button">下一题</button>
        </slot>
      </div>
      <div v-if="isShowSubmit()" @click="submit">
        <slot name="submit" >
          <button class="next-button">提交</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
const QuestionStates = {
  //未作答
  PENDING: 1,
  //已作答
  DONE: 1 << 1
}
export default {
  name: 'LbdQuestions',
  props: {
    //问题数组
    questions: {
      type: Array,
      required: true
    },
    //问题标题key
    questionTitleKey: {
      type: String,
      default: 'title'
    },
    //问题类型key(单选多选)
    questionTypeKey: {
      type: String,
      default: 'type'
    },
    //答案数组key
    answersKey: {
      type: String,
      default: 'answers'
    },
    //答案标题key
    answerTitleKey: {
      type: String,
      default: 'title'
    },
    //正确答案key
    trueAnswersKey: {
      type: String,
      default: 'trueAnswers'
    },
    //答案序号key(A,B,C,D)
    answerOrderKey: {
      type: String,
      default: 'order'
    },
    //问题主键key
    questionPrimaryKey: {
      type: String,
      default: 'id'
    },
    //答案主键key
    answerPrimaryKey: {
      type: String,
      default: 'id'
    },
    //单选类型
    singleType: {
      type: Number,
      default: 1
    },
    //多选类型
    MultiType: {
      type: Number,
      default: 2
    },
    //分割线颜色
    dividerColor: {
      type: String,
      default: '#eee'
    },
    //背景颜色
    backgroundColor: {
      type: String,
      default: 'rgba(22, 39, 119, .8)'
    },
    //回答正确提示颜色
    successColor: {
      type: String,
      default: 'rgb(255, 255, 18)'
    },
    //回答正确文字
    successText: {
      type: String,
      default: '回答正确'
    },
    //回答错误提示颜色
    errorColor: {
      type: String,
      default: 'rgb(235, 27, 35)'
    },
    //回答错误文字
    errorText: {
      type: String,
      default: '回答错误'
    },
    //主题文字颜色
    primaryColor: {
      type: String,
      default: '#fff'
    },
    //答案激活颜色
    activeColor: {
      type: String,
      default: 'rgb(255, 255, 18)'
    },
    //是否显示回答正误提示
    showTip: {
      type: Boolean,
      default: true
    },
    //是否显示正确答案
    showSuccessAnswer: {
      type: Boolean,
      default: true
    },
    //是否显示问题索引
    showQuestionIndex: {
      type: Boolean,
      default: true
    },
    //是否相等的判断条件
    isTrueAnswer: {
      type: Function,
      default: (trueAnswer, selectedAnswer) => trueAnswer.toString() === selectedAnswer.toString()
    }
  },
  watch: {
    questions: {
      immediate: true,
      handler() {
        this.initSelectedAnswers()
      }
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex]
    },
    isLast() {
      return this.currentQuestionIndex === this.questions.length - 1
    }
  },
  data: () => ({
    currentQuestionState: QuestionStates.PENDING,
    currentQuestionIndex: 0,
    isSubmit: false,
    tipText: '',
    trueOrder: '',
    selectedAnswers: {},
    counts: {
      success: 0,
      error: 0
    }
  }),
  methods: {
    isShowSubmit() {
      return (this.currentQuestionState & QuestionStates.PENDING && this.showTip) ||
        (!this.showTip && this.isLast)
    },
    isShowNext() {
      return (
        this.currentQuestionState &
        QuestionStates.DONE &&
        this.showTip && this.currentQuestionIndex !== this.questions.length - 1
        ) || (
          !this.showTip &&
          this.currentQuestionIndex !== this.questions.length - 1
        )
    },
    isShowTip() {
      return this.currentQuestionState & QuestionStates.DONE && this.showTip
    },
    isSelect() {
      if (!this.selectedAnswers[this.currentQuestion[this.questionPrimaryKey]].length) {
        this.$emit('requiredToast', '请选择一个答案')
        return false
      }
      return true
    },
    initSelectedAnswers() {
      this.selectedAnswers = this.questions.reduce((selectedAnswers, question) => {
        selectedAnswers[question[this.questionPrimaryKey]] = []
        return selectedAnswers
      }, {})
    },
    countAnswers() {
      this.isTrueAnswer(
        this.currentQuestion[this.trueAnswersKey],
        this.selectedAnswers[this.currentQuestion[this.questionPrimaryKey]]
      ) ? this.counts.success++ : this.counts.error++
    },
    alertAnswer() {
      const isTrueAnswer = this.isTrueAnswer(
        this.currentQuestion[this.trueAnswersKey],
        this.selectedAnswers[this.currentQuestion[this.questionPrimaryKey]]
      )
      this.tipText = isTrueAnswer ? this.successText : this.errorText
      this.trueOrder = '正确答案是:' + this.currentQuestion[this.trueAnswersKey]
        .map(
          answerId => this.currentQuestion[this.answersKey]
          .find(answer => answerId === answer[this.answerPrimaryKey])[this.answerOrderKey]
        )
        .join(',')
      this.currentQuestionState = QuestionStates.DONE
    },
    removeAnswer(answerIds, answerId) {
      answerIds.indexOf(answerId) > -1 && answerIds.splice(answerIds.indexOf(answerId), 1)
    },
    addAnswer(answerIds, answerId) {
      answerIds.push(answerId)
      answerIds.sort((a, b) => Number(a) - Number(b))
    },
    selectAnswer(answer) {
      if (this.currentQuestionState & QuestionStates.DONE) {
        return
      }
      const currentQuestionId = this.currentQuestion[this.questionPrimaryKey]
      const selectedAnswerId = answer[this.answerPrimaryKey]
      this.currentQuestion[this.questionTypeKey] === this.singleType
        ? this.selectedAnswers[currentQuestionId] = [selectedAnswerId]
        : this.selectedAnswers[currentQuestionId].includes(selectedAnswerId)
          ? this.removeAnswer(this.selectedAnswers[currentQuestionId], selectedAnswerId)
          : this.addAnswer(this.selectedAnswers[currentQuestionId], selectedAnswerId)
    },
    nextQuestion() {
      if (!this.showTip && !this.isSelect()) {
        return
      }
      this.countAnswers()
      this.currentQuestionIndex++
      this.currentQuestionState = QuestionStates.PENDING
      this.$emit('nextQuestion', this.currentQuestionIndex)
    },
    submit() {
      if (!this.isSelect() || this.isSubmit) {
        return
      }
      if (this.showTip) {
        this.alertAnswer()
        if (this.isLast) {
          this.countAnswers()
          this.$emit('submit', this.selectedAnswers, this.counts)
          this.isSubmit = true
        }
      } else {
        this.countAnswers()
        this.$emit('submit', this.selectedAnswers, this.counts)
        this.isSubmit = true
      }
    },
    resetQuestions() {
      this.initSelectedAnswers()
      this.currentQuestionIndex = 0
      this.currentQuestionState = QuestionStates.PENDING
      this.isSubmit = false
      this.counts = {
        success: 0,
        error: 0
      }
    },
    forceOverQuestion() {
      this.selectedAnswers[this.currentQuestion[this.questionPrimaryKey]] = [null]
      this.showTip
        ? this.submit()
        : this.isLast
          ? this.submit()
          : this.nextQuestion()
    }
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

.lbd-question-container {
  width: 86vw;
  padding: .3rem;
  font-size: .3rem;
  line-height: .44rem;
  border-radius: .2rem;

  .question-container {
    padding: .1rem;
  }

  .divider {
    width: 100%;
    height: 1px;
    margin: .2rem 0;
  }

  .answer-list {
    padding: .1rem;

    .answer-item {
      margin-bottom: .3rem;
    }
  }

  .button-list {
    display: flex;
    justify-content: center;
    margin-bottom: .16rem;

    .next-button {
      width: 3.4rem;
      height: .8rem;
      background: rgb(252, 205, 1);
      outline: none;
      border: .1rem solid #fff;
      font-size: .3rem;
      font-weight: bold;
      margin: 0;
    }
  }

  .answer-tip {
    margin-bottom: .4rem;
    padding: 0 .2rem;
    text-align: center;
  }
}
</style>