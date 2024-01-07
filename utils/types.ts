/* eslint-disable ts/consistent-type-definitions */
export type StudentData = {
  first_name: string
  last_name: string
  gender: string
  student_class: number
}

export type Culture = {
  id: number
  category_name: string
  culture_name: string
  culture_slug: string
  city_id: number
  city_name: string
  province_id: number
  province_name: string
  culture_value: string
  culture_description: string
  image_filenames: string[]
}

export type Slide = {
  image: string
  description: string
}
