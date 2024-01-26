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
  culture_description: string
  image_filenames: string[]
}

export type CultureDetail = {
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
  preview_yt_id: string
  signlanguage_yt_id: string
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
  culture_id: number
  student_score: number
  student_evaluation: number
}

export type SignLanguage = {
  id: number
  category_id: number
  title: string
  slug: string
}

export type SignLanguageDetail = {
  id: number
  title: string
  youtube_id: string
}

export type SignLanguageDetailScore = {
  video_detail_id: number
  student_score: number
  student_evaluation: number
}

export type Craft = {
  id: number
  slug: string
  title: string
}

export type CraftDetail = {
  id: number
  slug: string
  title: string
  description: string
  youtube_id: string
}

export type Quiz = {
  id: number
  title: string
  slug: string
  type: string
}
