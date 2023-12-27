import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repositories"
import { makeAnswer } from "test/factories/make-answer"
import { DeleteAnswerUseCase } from "./delete-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1")
    )

    inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: "answer-1",
      authorId: "author-1",
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it("should not be able to delete a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1")
    )

    inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: "answer-1",
        authorId: "author-2",
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
