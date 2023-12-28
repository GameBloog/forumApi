import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repositories"
import { makeAnswer } from "test/factories/make-answer"
import { CommentOnAnswerUseCase } from "./comment-on-answer"
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository"


let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository
    )
  })

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Comentário teste",
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      "Comentário teste"
    )
  })
})
