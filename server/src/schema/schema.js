const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');
const User = require('../models/User');
const Company = require('../models/Company');

const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: () => ({
		_id: {type: GraphQLString},
		name: {type: GraphQLString},
		description: {type: GraphQLString},
		users: {
			type: new GraphQLList(UserType),
			async resolve({_id}) {
				return await User.find({companyId: _id});
			}
		}
	})
});

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		_id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: {
			type: CompanyType,
			async resolve({companyId}) {
				console.log(companyId);
				return await Company.findOne({_id: companyId});
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		user: {
			type: UserType,
			args: { id: {type: GraphQLString} },
			async resolve(parent,{id}) {
				return await User.findOne({
					_id: id
				});
			}
		},
		company: {
			type: CompanyType,
			args: { id: {type: GraphQLString } },
			async resolve(parent,{id}) {
				return await Company({_id: id});
			}
		}
	}
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				companyId: { type: GraphQLString }
			},
			async resolve(parentValue,args) {
				const newUser = new User({
					...args
				});
				await newUser.save();
				return newUser;
			}
		},
		updateUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				firstName: { type: GraphQLString },
				age: { type: GraphQLString },
				companyId: { type: GraphQLString }
			},
			async resolve(parent,{id, ...info}) {
				console.log(info);
				return await User.findOneAndUpdate(
					{
						_id: id
					},
					{
						...info
					},
					{
						new: true
					}
				)
			}
		},
		removeUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			async resolve(parent,{id}) {
				await User.deleteOne({_id: id});
				return _id;
			}
		},
		addCompany: {
			type: CompanyType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				description: { type:  GraphQLString }
			},
			async resolve(parent,args) {
				const newCompany = new Company({
					...args
				});
				await newCompany.save();
				return newCompany;
			}
		},
		updateCompany: {
			type: CompanyType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				name: { type: GraphQLString },
				description: { type: GraphQLString }
			},
			async resolve(parent,{id, ...info}) {
				return await Company.findOneAndUpdate(
					{
						_id: id
					},
					{
						...info
					},
					{
						new: true
					}
				);
			}
		},
		removeCompany: {
			type: CompanyType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			async resolve(parent,{id}) {
				await Company.delete({ _id: id });
				return id;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation
});