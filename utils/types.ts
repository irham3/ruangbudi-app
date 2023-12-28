/* eslint-disable ts/consistent-type-definitions */
export type StudentData = {
  first_name: string
  last_name: string
  gender: string
  student_class: number
}

export type Culture = {
  id: number
  culture_name: string
  culture_slug: string
  image_paths: string[] | null
  city: string
  province: string
  culture_value: string
  culture_description: string
}
