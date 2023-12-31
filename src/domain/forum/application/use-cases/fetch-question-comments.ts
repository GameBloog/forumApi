import { Either, rigth } from "@/core/either"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { QuestionCommentRepository } from "../repositories/question-comment-repository"

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionsComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionsComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return rigth({
      questionsComments,
    })
  }
}
