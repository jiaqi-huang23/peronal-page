
import {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull
 } from 'graphql'
import db from './server';


const Post = new GraphQLObjectType({
     name: 'Post',
     fields: {
        id: { type: GraphQLID },
        title : { type: GraphQLString},
        createdDate: { type: Date},
        lastModifiedDate: { type: Date },
        content: { type: GraphQLString}
     }
 });


const typeDefs =[`
    type Query {
        post(_id: String): ${Post}
        posts:[${Post}]
    }
    type Mutation {
        createPost(title: String, content: String) : ${Post}
    }
    schema {
        query: Query
        mutation: Mutation
    }
`];

const resolver = {
    Query: {
        post: async (root, {_id}) => {
            return (await Posts.findOne(ObjectId(_id)));
        },
        posts: async () => {
            return (await Posts.find({}).toArray());
        }
    }
}