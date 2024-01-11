import { DomainEvents } from "@/core/events/domain-events"
import { EventHandler } from "@/core/events/event-handler"
import { AnswerCreatedEvent } from "../../../forum/enterprise/events/answer-created-events"
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification"
import { AsnwerRepository } from "@/domain/forum/application/repositories/answers-repository"
import { QuestionBestAnswerChosenEvent } from "@/domain/forum/enterprise/events/question-best-answer-chosen-event"

export class OnQuestionbestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AsnwerRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString()
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: "Sua reposta foi escolhida!",
        content: `A reposta que você enviou em "${question.title
          .substring(0, 20)
          .concat("...")}" foi escolhida pelo autor`,
      })
    }
  }
}
