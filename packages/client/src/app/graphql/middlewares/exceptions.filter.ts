import { FetchResult, Observable } from "@apollo/client/core";
import { ErrorLink } from "@apollo/client/link/error";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../authentication/services/authentication.service";

export class ExceptionsFilter extends ErrorLink {
  constructor(private readonly authService: AuthenticationService) {
    super(({ graphQLErrors, forward, operation }) => {
      console.log(graphQLErrors)
      if (graphQLErrors && graphQLErrors.length > 0) {
        if (graphQLErrors.some((x) => x.message.toLowerCase().includes('unauthorized'))) {
          return this.authService
            .refresh()
            .pipe(switchMap(async () => forward(operation))) as unknown as Observable<FetchResult>;
        }
      }

      return;
    });
  }
}
