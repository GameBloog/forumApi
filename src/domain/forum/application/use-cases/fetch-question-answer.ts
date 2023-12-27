import { Answer } from "../../enterprise/entities/answer"
import { AsnwerRepository } from "../repositories/answers-repository"

interface FetchRecentAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchRecentAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchRecentAnswersUseCase {
  constructor(private answersRepository: AsnwerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchRecentAnswersUseCaseRequest): Promise<FetchRecentAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId,{ page })

    return {
      answers,
    }
  }
}
