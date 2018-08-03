const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');
const { SongType, LyricType } = require('./types');
const SongModel = require('../models/Song');
const LyricModel = require('../models/Lyric');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    song: {
      type: SongType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent,{id}) {
        return await SongModel.findOne({ _id: id});
      }
    },
  }
});
