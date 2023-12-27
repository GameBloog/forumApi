import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repositories"
import { makeQuestion } from "test/factories/make-question"
import { FetchRecentAnswersUseCase } from "./fetch-question-answer"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryQuestionRepository: InMemoryAnswerRepository
let sut: FetchRecentAnswersUseCase

describe("Fetch Questions Answers", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryAnswerRepository()
    sut = new FetchRecentAnswersUseCase(inMemoryQuestionRepository)
  })

  it("should be able to fetch question answers", async () => {
    await inMemoryQuestionRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryQuestionRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryQuestionRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it("should be able to fetch paginated questions asnwers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID("question-1"),
        })
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
