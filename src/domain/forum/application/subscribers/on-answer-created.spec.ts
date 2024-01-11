import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repositories"
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachment-repository"

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository

describe("On answer Created", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()

    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository
    )
  })
  it("should send a notification when an answer is created", async() => {
    const onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer()

    inMemoryAnswerRepository.create(answer)
  })
})
