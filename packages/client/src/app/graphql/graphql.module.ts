import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
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

const basicContext = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			Accept: 'charset=utf-8',
			authorization: `Bearer random token`,
			'Content-Type': 'application/json',
		},
	};
});

export function createDefaultApollo(httpLink: HttpLink): ApolloClientOptions<any> {
	const cache = new InMemoryCache();

	const http = httpLink.create({
		uri: 'http://localhost:3000/graphql',
	});

	return {
		connectToDevTools: !environment.production,
		assumeImmutableResults: true,
		cache,
		link: ApolloLink.from([basicContext, errorLink, http]),
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
			deps: [HttpLink],
		},
	],
})
export class GraphQLModule {}
