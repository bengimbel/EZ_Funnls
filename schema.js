const graphql = require("graphql");
const Resturant = require("./models/resturant");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const ResturantType = new GraphQLObjectType({
  name: "Resturant",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    savedResturants: {
      type: new GraphQLList(ResturantType),
      resolve(parent, args) {
        return Resturant.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addResturant: {
      type: ResturantType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLNonNull(GraphQLFloat) },
        lat: { type: GraphQLNonNull(GraphQLFloat) },
        lng: { type: GraphQLNonNull(GraphQLFloat) }
      },
      resolve(parent, args) {
        let resturant = new Resturant({
          id: args.id,
          name: args.name,
          address: args.address,
          rating: args.rating,
          lat: args.lat,
          lng: args.lng
        });
        return resturant.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
