import type { Quiz, QuizUser } from '~/utils/types'

export const useTebakBudayaStore = defineStore('tebakBudaya', {
  state: (): QuizUser => ({
    quizzes: [],
    userUUID: '',
    score: 0,
    currentQuestionIndex: 0,
  }),

  getters: {
    // getQuizByIndex: (state) => {
    //   const quizzes = state.quizzes
    //   return (currentQuestionIndex: number) => quizzes[currentQuestionIndex] as Quiz
    // },

    // getQuestion() {
    //   return () => this.quizzes[this.currentQuestionIndex].question_text
    // },

    getSelectedChoiceId() {
      return () => this.quizzes[this.currentQuestionIndex].selectedChoiceId
    },

    getIsChecked() {
      return () => this.quizzes[this.currentQuestionIndex].isChecked
    },

    getRightChoiceId() {
      return () => this.quizzes[this.currentQuestionIndex].choices.find(choice => choice.is_right === true)!.id
    },
  },

  actions: {
    async fetch() {
      const { data: supaData } = await useSupabaseClient()
        .schema('quiz' as never)
        .from('v_tebak_budaya')
        .select('*') as { data: Quiz[] }

      supaData.map(sd =>
        this.quizzes.push({
          ...sd,
          selectedChoiceId: 0,
          isChecked: false,
        }),
      )
    },

    setUserUUID(userUUID: string) {
      this.userUUID = userUUID
    },

    selectChoice(selectedChoiceId: number) {
      // Save user's choice
      this.quizzes[this.currentQuestionIndex].selectedChoiceId = selectedChoiceId
    },

    checkChoice() {
      this.quizzes[this.currentQuestionIndex].isChecked = true
      this.addScore(100, this.getSelectedChoiceId())
      // correctChoiceId.value = questions[currentQuestionIndex.value].choices.find(choice => choice.is_right === true)?.id
      // score.value += (correctChoiceId.value === selectedChoiceId.value) ? 100 : 0
    },

    addScore(currentScore: number, selectedChoiceId: number) {
      this.score += this.getRightChoiceId() === selectedChoiceId ? currentScore : 0
    },

    nextQuestion() {
      if (this.currentQuestionIndex !== this.quizzes.length - 1)
        this.currentQuestionIndex++
    },

    prevQuestion() {
      if (this.currentQuestionIndex !== 0)
        this.currentQuestionIndex--
    },
  },
})
