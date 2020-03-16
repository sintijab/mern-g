import express from 'express';
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import config from '../../webpack.dev.config.js';

const server = async () => {
    const app = express();
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler))
    const port = 4001;
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    server.applyMiddleware({app});
    try {
      await mongoose.connect("mongodb+srv://admin:admin@cluster-32evw.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true})
    } catch(err) {
      console.log(err)
    }
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.html'));
    });
    app.listen({port}, ()=> {
        console.log(`Server is ready on port: ${port}`)
    })

}

server();
