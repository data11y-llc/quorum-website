//! comment out import statements before building for canvas
// import type * as CSS from 'csstype'

//typescript types
export type imageSearchResType = {
  id: string
  description: string
  user: string
  user_url: string
  alt: string
  large_url: string
  regular_url: string
  small_url: string
}[]

export type quizSubmissionType = {
  attempt: number
  attempts_left: number
  end_at: number | null
  excused?: null | number
  extra_attempts: number | null
  extra_time: string | null
  finished_at: Date
  fudge_points: number | null
  has_seen_results: string | null
  html_url: string
  id: number
  kept_score: number
  manually_unlocked: string | null
  overdue_and_needs_submission: boolean
  quiz_id: number
  quiz_points_possible: number | null
  quiz_version: number
  result_url: string
  score: number | null
  score_before_regrade: number | null
  started_at: Date
  submission_id: number | null
  time_spent: number
  user_id: number
  validation_token: string
  workflow_state: string
}

