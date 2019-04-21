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
    rating: 1,
    location: {
      lat: 1.23,
      lng: 4.55
    }
  },
  {
    id: "456",
    name: "res 2",
    rating: 2,
    location: {
      lat: 18.2233,
      lng: 46.3255
    }
  },
  {
    id: "789",
    name: "res 3",
    rating: 3,
    location: {
      lat: 45.2663,
      lng: 422.52355
    }
  }
];

const ResturantType = new GraphQLObjectType({
  name: "Resturant",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    rating: { type: GraphQLInt },
    location: {
      type: LocationType
    }
  })
});

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
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

module.exports = new GraphQLSchema({
  query: RootQuery
});
