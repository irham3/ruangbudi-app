/* eslint-disable ts/consistent-type-definitions */
export type Student = {
  first_name: string
  last_name: string
  gender: string
  student_class: number
}

export type Slide = {
  image: string
  description: string
}

export type Culture = {
  id: number
  category_id: number
  category_name: string
  culture_name: string
  culture_slug: string
  city_id: number
  city_name: string
  culture_value: string
  culture_description: string
  image_filenames: string[]
}

export type City = {
  id: number
  city_name: string
}

export type CultureCategory = {
  id: number
  category_name: string
}

export type CultureScore = {
  value: CultureScore
  student_id: number
  culture_id: number
  student_score: number
  student_evaluation: number
}

export type Video = {
  video_id: number
  category_id: number
  category_name: string
  title: string
  slug: string
}
