export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      behaviour: {
        Row: {
          clinical_case: number | null
          created_at: string
          details: string | null
          frequency: string | null
          habit: string | null
          id: number
          is_misleading: boolean | null
        }
        Insert: {
          clinical_case?: number | null
          created_at?: string
          details?: string | null
          frequency?: string | null
          habit?: string | null
          id?: number
          is_misleading?: boolean | null
        }
        Update: {
          clinical_case?: number | null
          created_at?: string
          details?: string | null
          frequency?: string | null
          habit?: string | null
          id?: number
          is_misleading?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "behaviour_clinical_case_fkey"
            columns: ["clinical_case"]
            isOneToOne: false
            referencedRelation: "clinical_case"
            referencedColumns: ["id"]
          }
        ]
      }
      body_district: {
        Row: {
          created_at: string | null
          id: number
          label: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          label: string
        }
        Update: {
          created_at?: string | null
          id?: number
          label?: string
        }
        Relationships: []
      }
      body_symptom: {
        Row: {
          body_district_id: number
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          body_district_id: number
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          body_district_id?: number
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "body_symptom_body_district_id_fkey"
            columns: ["body_district_id"]
            isOneToOne: false
            referencedRelation: "body_district"
            referencedColumns: ["id"]
          }
        ]
      }
      case_details: {
        Row: {
          created_at: string | null
          difficulty: number | null
          id: number
          solution: string | null
          specialization_id: number | null
        }
        Insert: {
          created_at?: string | null
          difficulty?: number | null
          id?: number
          solution?: string | null
          specialization_id?: number | null
        }
        Update: {
          created_at?: string | null
          difficulty?: number | null
          id?: number
          solution?: string | null
          specialization_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "case_details_specialization_id_fkey"
            columns: ["specialization_id"]
            isOneToOne: false
            referencedRelation: "specialization"
            referencedColumns: ["id"]
          }
        ]
      }
      clinical_case: {
        Row: {
          age: number
          author: string
          avatar: string | null
          brief_description: string
          case_details_id: number | null
          case_status: number
          gender: string
          id: number
          is_deleted: boolean
          patient_height: number
          patient_name: string
          patient_weight: number
          specialization: string | null
        }
        Insert: {
          age: number
          author: string
          avatar?: string | null
          brief_description: string
          case_details_id?: number | null
          case_status: number
          gender: string
          id?: number
          is_deleted?: boolean
          patient_height: number
          patient_name: string
          patient_weight: number
          specialization?: string | null
        }
        Update: {
          age?: number
          author?: string
          avatar?: string | null
          brief_description?: string
          case_details_id?: number | null
          case_status?: number
          gender?: string
          id?: number
          is_deleted?: boolean
          patient_height?: number
          patient_name?: string
          patient_weight?: number
          specialization?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clinical_case_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clinical_case_case_details_id_fkey"
            columns: ["case_details_id"]
            isOneToOne: false
            referencedRelation: "case_details"
            referencedColumns: ["id"]
          }
        ]
      }
      examined_area: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      family_member_grade: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      habit: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      health_state: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      instrumental_exam: {
        Row: {
          clinical_case: number
          details: string
          exam_type_id: number | null
          id: number
          is_misleading: boolean
          media: string | null
        }
        Insert: {
          clinical_case: number
          details: string
          exam_type_id?: number | null
          id?: number
          is_misleading: boolean
          media?: string | null
        }
        Update: {
          clinical_case?: number
          details?: string
          exam_type_id?: number | null
          id?: number
          is_misleading?: boolean
          media?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instrumental_exam_clinical_case_fkey"
            columns: ["clinical_case"]
            isOneToOne: false
            referencedRelation: "clinical_case"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instrumental_exam_exam_type_id_fkey"
            columns: ["exam_type_id"]
            isOneToOne: false
            referencedRelation: "instrumental_exam_type"
            referencedColumns: ["id"]
          }
        ]
      }
      instrumental_exam_type: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      laboratory_exam: {
        Row: {
          clinical_case: number
          details: string
          exam_type_id: number | null
          id: number
          is_misleading: boolean
          media: string | null
        }
        Insert: {
          clinical_case: number
          details: string
          exam_type_id?: number | null
          id?: number
          is_misleading: boolean
          media?: string | null
        }
        Update: {
          clinical_case?: number
          details?: string
          exam_type_id?: number | null
          id?: number
          is_misleading?: boolean
          media?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "laboratory_exam_clinical_case_fkey"
            columns: ["clinical_case"]
            isOneToOne: false
            referencedRelation: "clinical_case"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "laboratory_exam_exam_type_id_fkey"
            columns: ["exam_type_id"]
            isOneToOne: false
            referencedRelation: "laboratory_exam_type"
            referencedColumns: ["id"]
          }
        ]
      }
      laboratory_exam_type: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      objective_exam: {
        Row: {
          body_district_id: number
          clinical_case: number
          details: string
          id: number
          is_misleading: boolean
        }
        Insert: {
          body_district_id: number
          clinical_case: number
          details: string
          id?: number
          is_misleading: boolean
        }
        Update: {
          body_district_id?: number
          clinical_case?: number
          details?: string
          id?: number
          is_misleading?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "objective_exam_body_district_id_fkey"
            columns: ["body_district_id"]
            isOneToOne: false
            referencedRelation: "body_district"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objective_exam_clinical_case_fkey"
            columns: ["clinical_case"]
            isOneToOne: false
            referencedRelation: "clinical_case"
            referencedColumns: ["id"]
          }
        ]
      }
      objective_exam_type: {
        Row: {
          created_at: string
          exam_type_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          exam_type_id?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          exam_type_id?: number | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objective_exam_type_exam_type_id_fkey"
            columns: ["exam_type_id"]
            isOneToOne: false
            referencedRelation: "objective_exam_type"
            referencedColumns: ["id"]
          }
        ]
      }
      previous_visit: {
        Row: {
          clinical_case: number
          details: string | null
          diagnosis_reason: string | null
          diagnosis_short: string | null
          id: number
          is_misleading: boolean
          specialist_id: number | null
        }
        Insert: {
          clinical_case: number
          details?: string | null
          diagnosis_reason?: string | null
          diagnosis_short?: string | null
          id?: number
          is_misleading: boolean
          specialist_id?: number | null
        }
        Update: {
          clinical_case?: number
          details?: string | null
          diagnosis_reason?: string | null
          diagnosis_short?: string | null
          id?: number
          is_misleading?: boolean
          specialist_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "previous_visit_clinical_case_fkey"
            columns: ["clinical_case"]
            isOneToOne: false
            referencedRelation: "clinical_case"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "previous_visit_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialist"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          created_at: string | null
          firstname: string
          id: number
          role: string
          surname: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          firstname: string
          id?: number
          role: string
          surname: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          firstname?: string
          id?: number
          role?: string
          surname?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      quiz: {
        Row: {
          clinical_case: number
          id: number
          question: string
        }
        Insert: {
          clinical_case: number
          id?: number
          question: string
        }
        Update: {
          clinical_case?: number
          id?: number
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_clinical_case_fkey"
            columns: ["clinical_case"]
            isOneToOne: false
            referencedRelation: "clinical_case"
            referencedColumns: ["id"]
          }
        ]
      }
      quiz_answer: {
        Row: {
          id: number
          is_correct: boolean
          quiz: number
          text: string
        }
        Insert: {
          id?: number
          is_correct: boolean
          quiz: number
          text: string
        }
        Update: {
          id?: number
          is_correct?: boolean
          quiz?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_answer_quiz_fkey"
            columns: ["quiz"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          }
        ]
      }
      relationship: {
        Row: {
          clinical_case: number
          details: string
          family_member_grade_id: number | null
          health_state_id: number | null
          id: number
          is_misleading: boolean
        }
        Insert: {
          clinical_case: number
          details: string
          family_member_grade_id?: number | null
          health_state_id?: number | null
          id?: number
          is_misleading: boolean
        }
        Update: {
          clinical_case?: number
          details?: string
          family_member_grade_id?: number | null
          health_state_id?: number | null
          id?: number
          is_misleading?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "relationship_clinical_case_fkey"
            columns: ["clinical_case"]
            isOneToOne: false
            referencedRelation: "clinical_case"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relationship_family_member_grade_id_fkey"
            columns: ["family_member_grade_id"]
            isOneToOne: false
            referencedRelation: "family_member_grade"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relationship_health_state_id_fkey"
            columns: ["health_state_id"]
            isOneToOne: false
            referencedRelation: "health_state"
            referencedColumns: ["id"]
          }
        ]
      }
      requested_reports: {
        Row: {
          case: number | null
          created_at: string
          id: number
          requested_by: string | null
        }
        Insert: {
          case?: number | null
          created_at?: string
          id?: number
          requested_by?: string | null
        }
        Update: {
          case?: number | null
          created_at?: string
          id?: number
          requested_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requested_reports_case_fkey"
            columns: ["case"]
            isOneToOne: false
            referencedRelation: "clinical_case"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requested_reports_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      specialist: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      specialization: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      symptom: {
        Row: {
          body_district: number
          body_symptom_id: number | null
          clinical_case: number
          id: number
          is_misleading: boolean
          media: string | null
          symptom_details: string
        }
        Insert: {
          body_district: number
          body_symptom_id?: number | null
          clinical_case: number
          id?: number
          is_misleading: boolean
          media?: string | null
          symptom_details: string
        }
        Update: {
          body_district?: number
          body_symptom_id?: number | null
          clinical_case?: number
          id?: number
          is_misleading?: boolean
          media?: string | null
          symptom_details?: string
        }
        Relationships: [
          {
            foreignKeyName: "symptom_body_symptom_id_fkey"
            columns: ["body_symptom_id"]
            isOneToOne: false
            referencedRelation: "body_symptom"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "symptom_clinical_case_fkey"
            columns: ["clinical_case"]
            isOneToOne: false
            referencedRelation: "clinical_case"
            referencedColumns: ["id"]
          }
        ]
      }
      user_emails: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_email_contained: {
        Args: {
          email_arg: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
