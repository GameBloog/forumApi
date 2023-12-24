import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositories"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug"
import { Question } from "../../enterprise/entities/question"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it("should be able to get a question by slug", async () => {
    const newQuestion = Question.create({
      title: "Example Question",
      slug: Slug.create("example-question"),
      authorId: new UniqueEntityID(),
      content: "Example content",
    })

    inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: "example-question",
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
