import { Answer } from "../../enterprise/entities/answer"

export interface AsnwerRepository {
  create(answer: Answer): Promise<void>
}
