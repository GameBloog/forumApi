import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repositories"
import { makeAnswer } from "test/factories/make-answer"
import { EditAnswerUseCase } from "./edit-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1")
    )

    inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: "author-1",
      content: "Conteúdo teste",
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: "Conteúdo teste",
    })
  })

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1")
    )

    inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: newAnswer.id.toValue(),
        authorId: "author-2",
        content: "Conteúdo teste",
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
