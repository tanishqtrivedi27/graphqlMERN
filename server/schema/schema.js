/* import { projects, clients } from "../sampleData.js"; */

import { GraphQLID, GraphQLObjectType, GraphQLString, 
            GraphQLSchema, GraphQLList } from 'graphql';
import { Client } from '../models/Client.js';
import { Project } from '../models/Project.js';


const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.findById(parent.clientId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            }
        },

        client: {
            type: ClientType,   
            args: {id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            }
        },

        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            }
        },

        project: {
            type: ProjectType,   
            args: {id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        }
    }
});

export const schema = new GraphQLSchema({ query: RootQuery });