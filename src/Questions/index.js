import Question from './Questions'

Question.install = function(Vue) {
  Vue.component(Question.name, Question)
}

export default Question
