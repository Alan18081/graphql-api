const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');
const SongModel = require('../../models/Song');
const LyricModel = require('../../models/Lyric');

const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      async resolve({_id}) {
        return await LyricModel.find({songId: _id});
      }
    }
  })
});

const LyricType = new GraphQLObjectType({
  name: 'Lyric',
  fields: () => ({
    _id: { type: GraphQLString },
    content: { type: GraphQLString },
    song: {
      type: SongType,
      async resolve({songId}) {
        return await SongModel.find({_id: songId});
      }
    }
  })
});

module.exports = {
  LyricType,
  SongType
};

