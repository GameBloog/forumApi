import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface AnswerCommentProps {
  authorId: UniqueEntityID
  answerId: UniqueEntityID
  content: string
  createdAt: Date
  updatdeAt?: Date
}
export class AnswerComment extends Entity<AnswerCommentProps> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatdeAt() {
    return this.props.updatdeAt
  }

  private touch() {
    this.props.updatdeAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(
    props: Optional<AnswerCommentProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return answerComment
  }
}
