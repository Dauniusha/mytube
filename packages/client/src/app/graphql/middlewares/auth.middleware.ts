import { ApolloLink, DefaultContext } from "@apollo/client/core";
import { AuthenticationService } from "../../authentication/services/authentication.service";
import { IS_NEED_AUTHORISATION } from "../../core/http/auth-context-token.model";

export class AuthMiddleware extends ApolloLink {
  constructor(private readonly authService: AuthenticationService) {
    super((operation, forward) => {
      const context = operation.getContext();

      const authRequired = context.map?.get(IS_NEED_AUTHORISATION) ?? true;

      console.log(context);
      if (!authRequired) {
        return forward(operation);
      }

      operation.setContext(this.setAuthHeader(context));
      return forward(operation);
    });
  }

  private setAuthHeader(req: DefaultContext): DefaultContext {
    console.log(req)
    req.headers.authorization = `Bearer ${this.authService.getAccessToken()}`;
    return req;
  }
}
