import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Answer } from "../../enterprise/entities/answer"
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
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      content,
      questionId: new UniqueEntityID(questionId),
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
