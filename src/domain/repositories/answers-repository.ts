import { Answer } from "../entities/answer"

export interface AsnwerRepository {
  create(answer: Answer): Promise<void>
}
