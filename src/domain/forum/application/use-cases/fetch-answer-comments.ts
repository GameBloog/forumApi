import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { AnswerCommentRepository } from "../repositories/answer-comments-repository"

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  answersComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answernCommentRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answersComments =
      await this.answernCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return {
      answersComments,
    }
  }
}
