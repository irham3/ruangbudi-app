/* eslint-disable ts/consistent-type-definitions */
export type StudentData = {
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
