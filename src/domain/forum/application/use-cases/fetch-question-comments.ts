import { QuestionComment } from "../../enterprise/entities/question-comment"
import { QuestionCommentRepository } from "../repositories/question-comment-repository"

interface FetchQuestioCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestioCommentsUseCaseResponse {
  questionsComments: QuestionComment[]
}

export class FetchQuestioCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestioCommentsUseCaseRequest): Promise<FetchQuestioCommentsUseCaseResponse> {
    const questionsComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return {
      questionsComments,
    }
  }
}
