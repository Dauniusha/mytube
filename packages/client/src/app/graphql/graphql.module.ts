import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ExceptionsFilter } from './middlewares/exceptions.filter';

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
	console.log(graphQLErrors)
	if (graphQLErrors && graphQLErrors.length > 0) {
		if (
			(graphQLErrors[0] as any)?.statusCode >= 400 && 
			(graphQLErrors[0] as any)?.statusCode < 500
		) {
			console.error(`[Client side error]: ${graphQLErrors[0].message}`);
		} else {
			console.error(`[Server side error]: ${graphQLErrors[0].message}`);
		}
	}
	if (networkError) {
	  console.error(`[Network error]: ${networkError.message}`);
	}
});

const basicContext = setContext((_, context) => {
	return {
		headers: {
			Accept: 'charset=utf-8',
			'Content-Type': 'application/json',
		},
	};
});

export function createDefaultApollo(
  httpLink: HttpLink,
  authService: AuthenticationService,
): ApolloClientOptions<any> {
	const cache = new InMemoryCache();

	const http = httpLink.create({
		uri: 'http://localhost:3000/graphql',
	});

  const authMiddleware = new AuthMiddleware(authService);
  const exceptionsFilter = new ExceptionsFilter(authService);

	return {
		connectToDevTools: !environment.production,
		assumeImmutableResults: true,
		cache,
		link: ApolloLink.from([basicContext, authMiddleware, exceptionsFilter, http]),
		defaultOptions: {
			watchQuery: {
				errorPolicy: 'all',
			},
		},
	};
}

@NgModule({
	imports: [BrowserModule, HttpClientModule, ApolloModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createDefaultApollo,
			deps: [HttpLink, AuthenticationService],
		},
	],
})
export class GraphQLModule {}
