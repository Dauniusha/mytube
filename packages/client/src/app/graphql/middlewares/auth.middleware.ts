import { ApolloLink, DefaultContext } from "@apollo/client/core";
import { AuthenticationService } from "../../authentication/services/authentication.service";
import { IS_NEED_AUTHORISATION } from "../../core/http/auth-context-token.model";

export class AuthMiddleware extends ApolloLink {
  constructor(private readonly authService: AuthenticationService) {
    super((operation, forward) => {
      const context = operation.getContext();

      const authRequired = context.map.get(IS_NEED_AUTHORISATION);

      if (!authRequired) {
        return forward(operation);
      }

      operation.setContext(this.setAuthHeader(context));
      return forward(operation);
    });
  }

  private setAuthHeader(req: DefaultContext): DefaultContext {
    return req.clone({
      headers: req.headers.set('authorization', `Bearer ${this.authService.getAccessToken()}`),
    });
  }
}
