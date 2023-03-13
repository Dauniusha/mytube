import { GraphQLScalarType } from "graphql";

export const Void = new GraphQLScalarType({
    name: 'Void',
    description: 'Scalar type for void return value',
    parseValue: () => null,
    serialize: () => null,
    parseLiteral: () => null,
});
