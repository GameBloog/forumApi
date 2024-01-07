import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"
import { AnswerAttachmentList } from "./answer-attachment-list"

export interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  attachment: AnswerAttachmentList
  createdAt: Date
  updatdeAt?: Date
}
export class Answer extends Entity<AnswerProps> {
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get content() {
    return this.props.content
  }

  get attachment() {
    return this.props.attachment
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatdeAt() {
    return this.props.updatdeAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...")
  }

  private touch() {
    this.props.updatdeAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachment(attachments: AnswerAttachmentList) {
    this.props.attachment = attachments
    this.touch()
  }

  static create(
    props: Optional<AnswerProps, "createdAt" | "attachment">,
    id?: UniqueEntityID
  ) {
    const answer = new Answer(
      {
        ...props,
        attachment: props.attachment ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return answer
  }
}
