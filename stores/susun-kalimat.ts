import { defineStore } from 'pinia'
import type { Leaderboard, Sentence, SentenceUser } from '~/utils/types'

export const useSusunKalimatStore = defineStore('susunKalimat', {
  state: (): SentenceUser => ({
    sentences: [],
    score: 0,
    studentUUID: '',
    completedSentence: 0,
    isSubmitted: false,
    leaderboard: [],
    currentQuestionIndex: 0,
  }),

  getters: {
    getIsChecked() {
      return () => this.sentences[this.currentQuestionIndex].isChecked
    },

    getRightAnswer() {
      return () => this.sentences[this.currentQuestionIndex].answer_text
    },

    getUserAnswer() {
      return () => this.sentences[this.currentQuestionIndex].userAnswerText
    },
  },

  actions: {
    async fetchSentences() {
      const { data: supaData } = await useSupabaseClient()
        .schema('quiz' as never)
        .from('v_susun_kalimat')
        .select('*') as { data: Sentence[] }

      this.sentences = supaData
    },

    async fetchLeaderboard() {
      const { data: supaData } = await useSupabaseClient()
        .schema('quiz' as never)
        .from('v_susun_kalimat_leaderboard')
        .select('student_name, score') as { data: Leaderboard[] }

      this.leaderboard = supaData
    },

    setStudentUUID(studentUUID: string) {
      this.studentUUID = studentUUID
    },

    addScore() {
      this.score += this.getRightAnswer() === this.getUserAnswer() ? 200 : 0
    },

    checkAnswer() {
      this.completedSentence++
      this.sentences[this.currentQuestionIndex].isChecked = true
      this.addScore()
    },

    nextQuestion() {
      if (this.currentQuestionIndex !== this.sentences.length - 1)
        this.currentQuestionIndex++
    },

    prevQuestion() {
      if (this.currentQuestionIndex !== 0)
        this.currentQuestionIndex--
    },

    async submit() {
      const { error } = await useSupabaseClient()
        .schema('quiz' as never)
        .from('quiz_scores')
        .insert({
          quiz_id: 1,
          student_id: this.studentUUID,
          score: this.score,
        } as never)

      if (!error)
        this.isSubmitted = true
    },
  },
})
