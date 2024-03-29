import { Either, left, rigth } from "@/core/either"
import { Question } from "../../enterprise/entities/question"
import { QuestionsRepository } from "../repositories/questions-repository"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { QuestionsAttachmentRepository } from "../repositories/question-attachmentIds-repository"
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsAttachmentRepository: QuestionsAttachmentRepository
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionsAttachmentRepository.findManyByQuestionId(questionId)

    const questionsAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments
    )

    const questionAttachments = attachmentIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    questionsAttachmentList.update(questionAttachments)

    question.attachment = questionsAttachmentList
    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return rigth({ question })
  }
}
