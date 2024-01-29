import type { Quiz, QuizUser } from '~/utils/types'

export const useTebakBudayaStore = defineStore('tebakBudaya', {
  state: (): QuizUser => ({
    quizzes: [],
    studentUUID: '',
    score: 0,
    currentQuestionIndex: 0,
    completedQuiz: 0,
    isSubmitted: false,
  }),

  getters: {
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

    setStudentUUID(studentUUID: string) {
      this.studentUUID = studentUUID
    },

    selectChoice(selectedChoiceId: number) {
      if (!this.quizzes[this.currentQuestionIndex].isChecked)
        this.quizzes[this.currentQuestionIndex].selectedChoiceId = selectedChoiceId
    },

    checkChoice() {
      this.completedQuiz++
      this.quizzes[this.currentQuestionIndex].isChecked = true
      this.addScore(100, this.getSelectedChoiceId())
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

    async submit() {
      // const { error } = await useSupabaseClient()
      //   .schema('quiz' as never)
      //   .from('quiz_scores')
      //   .insert({
      //     quiz_id: 1,
      //     student_id: this.studentUUID,
      //     score: this.score,
      //   } as never)

      // if (!error)
      this.isSubmitted = true
    },
  },
})
