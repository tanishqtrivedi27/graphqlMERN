import { projects, clients } from "../sampleData";
import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

const ClienType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            args: {id: { type: GraphQLID } },
            resolve
        }
    }
})