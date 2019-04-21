const graphql = require("graphql");
const Resturant = require("./models/resturant");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema
} = graphql;

const res = [
  {
    id: "123",
    name: "res 1",
    address: "123 main street",
    rating: 1,
    lat: 1.23,
    lng: 4.55
  },
  {
    id: "456",
    name: "res 2",
    address: "234 central ave",
    rating: 2,
    lat: 18.2233,
    lng: 46.3255
  },
  {
    id: "789",
    name: "res 3",
    address: "2020 north ave",
    rating: 3,
    lat: 45.2663,
    lng: 422.52355
  }
];

const ResturantType = new GraphQLObjectType({
  name: "Resturant",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    rating: { type: GraphQLInt },
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
        // return Resturant.find();
        return res;
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
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        rating: { type: GraphQLInt },
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat }
      },
      resolve(parent, args) {
        let resturant = new Resturant({
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
