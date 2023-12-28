import { InMemoryQuestionRepository } from "test/repositories/in-memory-comment-repositories"
import { makeQuestion } from "test/factories/make-question"
import { FetchRecentCommentUseCase } from "./fetch-question-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments-repository"
import { FetchQuestioCommentsUseCase } from "./fetch-question-comments"
import { makeQuestionComment } from "test/factories/make-question-comment"

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository
let sut: FetchQuestioCommentsUseCase

describe("Fetch Comment Comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchQuestioCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it("should be able to fetch question comment", async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      })
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      })
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      })
    )

    const { questionsComments } = await sut.execute({
      questionId: "question-1",
      page: 1,
    })

    expect(questionsComments).toHaveLength(3)
  })

  it("should be able to fetch paginated question comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID("question-1"),
        })
      )
    }

    const { questionsComments } = await sut.execute({
      questionId: "question-1",
      page: 2,
    })

    expect(questionsComments).toHaveLength(2)
  })
})
