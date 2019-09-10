
import {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull
 } from 'graphql'


const PostType = new GraphQLObjectType({
     name: 'Post',
     fields: {
        id: { type: GraphQLID },
        title : { type: GraphQLString},
        createdDate: { type: Date},
        lastModifiedDate: { type: Date },
        content: { type: GraphQLString}
     }
 });

const ReadPost = new GraphQLObjectType({
    
})
const typeDefs =[`
    type Query {
        post(_id: String): PostType
    }
`]