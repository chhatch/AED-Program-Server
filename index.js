const express = require('express')
const http = require('http')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()
const testRouter = require('./testRoute/router')
const userRouter = require('./user/route')
const connectDB = require('./db/mongoose')
const User = require('./user/model')
const Aed = require('./aed/model')
const AedModel = require('./aedModel/model')
const AedMake = require('./aedMake/model')
const { composeMongoose } = require('graphql-compose-mongoose')
const { schemaComposer } = require('graphql-compose')
//wrapping the whole thing in a self-executing function to await
;(async () => {
    //connect to mongo db
    try {
        console.log('connecting to db..')
        await connectDB()
        console.log('connected to db.')
    } catch (e) {
        console.log(e)
    }

    const customizationOptions = {} // left it empty for simplicity, described below
    const UserTC = composeMongoose(User, customizationOptions)
    UserTC.addFields({
        id: {
            type: 'String',
            description: '_id converted to string and renamed for convenience',
        },
    })

    schemaComposer.Query.addFields({
        userById: UserTC.mongooseResolvers.findById(),
        userByIds: UserTC.mongooseResolvers.findByIds(),
        userOne: UserTC.mongooseResolvers.findOne(),
        userMany: UserTC.mongooseResolvers.findMany(),
        userDataLoader: UserTC.mongooseResolvers.dataLoader(),
        userDataLoaderMany: UserTC.mongooseResolvers.dataLoaderMany(),
        //userByIdLean: UserTC.mongooseResolvers.findByIdLean(),
        //userByIdsLean: UserTC.mongooseResolvers.findByIdsLean(),
        //userOneLean: UserTC.mongooseResolvers.findOneLean(),
        //userManyLean: UserTC.mongooseResolvers.findManyLean(),
        //userDataLoaderLean: UserTC.mongooseResolvers.dataLoaderLean(),
        //userDataLoaderManyLean: UserTC.mongooseResolvers.dataLoaderManyLean(),
        userCount: UserTC.mongooseResolvers.count(),
        userConnection: UserTC.mongooseResolvers.connection(),
        userPagination: UserTC.mongooseResolvers.pagination(),
    })

    schemaComposer.Mutation.addFields({
        userCreateOne: UserTC.mongooseResolvers.createOne(),
        userCreateMany: UserTC.mongooseResolvers.createMany(),
        userUpdateById: UserTC.mongooseResolvers.updateById(),
        userUpdateOne: UserTC.mongooseResolvers.updateOne(),
        userUpdateMany: UserTC.mongooseResolvers.updateMany(),
        userRemoveById: UserTC.mongooseResolvers.removeById(),
        userRemoveOne: UserTC.mongooseResolvers.removeOne(),
        userRemoveMany: UserTC.mongooseResolvers.removeMany(),
    })

    const AedTC = composeMongoose(Aed, customizationOptions)
    AedTC.addFields({
        id: 'MongoID',
    })
    schemaComposer.Query.addFields({
        aedById: AedTC.mongooseResolvers.findById(),
        aedByIds: AedTC.mongooseResolvers.findByIds(),
        aedOne: AedTC.mongooseResolvers.findOne(),
        aedMany: AedTC.mongooseResolvers.findMany(),
        aedDataLoader: AedTC.mongooseResolvers.dataLoader(),
        aedDataLoaderMany: AedTC.mongooseResolvers.dataLoaderMany(),
        //aedByIdLean: AedTC.mongooseResolvers.findByIdLean(),
        //aedByIdsLean: AedTC.mongooseResolvers.findByIdsLean(),
        //aedOneLean: AedTC.mongooseResolvers.findOneLean(),
        //aedManyLean: AedTC.mongooseResolvers.findManyLean(),
        //aedDataLoaderLean: AedTC.mongooseResolvers.dataLoaderLean(),
        //aedDataLoaderManyLean: AedTC.mongooseResolvers.dataLoaderManyLean(),
        aedCount: AedTC.mongooseResolvers.count(),
        aedConnection: AedTC.mongooseResolvers.connection(),
        aedPagination: AedTC.mongooseResolvers.pagination(),
    })

    schemaComposer.Mutation.addFields({
        aedCreateOne: AedTC.mongooseResolvers.createOne(),
        aedCreateMany: AedTC.mongooseResolvers.createMany(),
        aedUpdateById: AedTC.mongooseResolvers.updateById(),
        aedUpdateOne: AedTC.mongooseResolvers.updateOne(),
        aedUpdateMany: AedTC.mongooseResolvers.updateMany(),
        aedRemoveById: AedTC.mongooseResolvers.removeById(),
        aedRemoveOne: AedTC.mongooseResolvers.removeOne(),
        aedRemoveMany: AedTC.mongooseResolvers.removeMany(),
    })

    const AedModelTC = composeMongoose(AedModel, customizationOptions)
    AedModelTC.addFields({
        id: 'MongoID',
    })
    schemaComposer.Query.addFields({
        aedModelById: AedModelTC.mongooseResolvers.findById(),
        aedModelByIds: AedModelTC.mongooseResolvers.findByIds(),
        aedModelOne: AedModelTC.mongooseResolvers.findOne(),
        aedModelMany: AedModelTC.mongooseResolvers.findMany(),
        aedModelDataLoader: AedModelTC.mongooseResolvers.dataLoader(),
        aedModelDataLoaderMany: AedModelTC.mongooseResolvers.dataLoaderMany(),
        //aedModelByIdLean: AedModelTC.mongooseResolvers.findByIdLean(),
        //aedModelByIdsLean: AedModelTC.mongooseResolvers.findByIdsLean(),
        //aedModelOneLean: AedModelTC.mongooseResolvers.findOneLean(),
        //aedModelManyLean: AedModelTC.mongooseResolvers.findManyLean(),
        //aedModelDataLoaderLean: AedModelTC.mongooseResolvers.dataLoaderLean(),
        //aedModelDataLoaderManyLean: AedModelTC.mongooseResolvers.dataLoaderManyLean(),
        aedModelCount: AedModelTC.mongooseResolvers.count(),
        aedModelConnection: AedModelTC.mongooseResolvers.connection(),
        aedModelPagination: AedModelTC.mongooseResolvers.pagination(),
    })

    schemaComposer.Mutation.addFields({
        aedModelCreateOne: AedModelTC.mongooseResolvers.createOne(),
        aedModelCreateMany: AedModelTC.mongooseResolvers.createMany(),
        aedModelUpdateById: AedModelTC.mongooseResolvers.updateById(),
        aedModelUpdateOne: AedModelTC.mongooseResolvers.updateOne(),
        aedModelUpdateMany: AedModelTC.mongooseResolvers.updateMany(),
        aedModelRemoveById: AedModelTC.mongooseResolvers.removeById(),
        aedModelRemoveOne: AedModelTC.mongooseResolvers.removeOne(),
        aedModelRemoveMany: AedModelTC.mongooseResolvers.removeMany(),
    })

    const AedMakeTC = composeMongoose(AedMake, customizationOptions)
    AedMakeTC.addFields({
        id: 'MongoID',
    })
    schemaComposer.Query.addFields({
        aedMakeMany: AedMakeTC.mongooseResolvers.findMany(),
    })

    schemaComposer.Mutation.addFields({
        aedMakeCreateOne: AedMakeTC.mongooseResolvers.createOne(),
    })

    /*
    schemaComposer.Mutation.addFields({
        addModelPic: {
            type: 'AedModel',
            args: {
                id: 'MongoID!',
                picLabel: 'String!',
                url: 'String!',
            },
            resolve: async (_, { id, picLabel, url }) => {
                const model = await AedModel.findById(id)
                console.log(picLabel, model.pics)
                if (!model) {
                    throw new Error(`Couldn't find post with id ${postId}`)
                }
                model.pics[picLabel] =  url 
                await model.save()
                return model
            },
        },
    })

    const testTC = schemaComposer.createObjectTC({
        name: 'Test',
        fields: {
            testProp: 'String',
            other: 'String'
        },
    })
    schemaComposer.Query.addFields({
        testField: {
            type: 'Test',
            resolve: (_) => ({ testProp: 'anything here?' }),
        },
    })
    */

    const graphqlSchema = schemaComposer.buildSchema()

    app.options('*', cors()) //this handles preflight requests
    app.use(cors())
    app.use('/test', testRouter)
    app.use('/user', userRouter)
    app.use(
        '/graphql',
        graphqlHTTP({
            schema: graphqlSchema,
            rootValue: root,
            graphiql: true,
        })
    )
    http.createServer(app).listen(5000, () => {
        console.log('Listening on port 5000...')
    })
})()
