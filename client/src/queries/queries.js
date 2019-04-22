import { gql } from "apollo-boost";

const addResturant = gql`
  mutation(
    $id: ID!
    $name: String!
    $vicinity: String!
    $rating: Float!
    $lat: Float!
    $lng: Float!
  ) {
    addResturant(
      id: $id
      name: $name
      vicinity: $vicinity
      rating: $rating
      lat: $lat
      lng: $lng
    ) {
      id
      name
      vicinity
      rating
      lat
      lng
    }
  }
`;

const savedResturantList = gql`
  {
    savedResturants {
      id
      name
      vicinity
      rating
    }
  }
`;

export { savedResturantList, addResturant };
