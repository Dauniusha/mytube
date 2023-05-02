import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { CreateCommentGQL, CreateCommentInput } from "../../../graphql/types.generated";

@Injectable({
  providedIn: 'root'
})
export class CommentsApi {
  constructor(
    private readonly createCommentGql: CreateCommentGQL,
  ) {}

  create(createCommentData: CreateCommentInput) {
    return this.createCommentGql.mutate({ createCommentData })
      .pipe(map((response) => response.data));
  }
}
