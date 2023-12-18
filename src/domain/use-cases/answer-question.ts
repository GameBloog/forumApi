import { Answer } from "../entities/answer"
import { AsnwerRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AsnwerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ authorId: instructorId, content, questionId })

    await this.answerRepository.create(answer)

    return answer
  }
}
