import { gql } from "apollo-boost";

const addResturant = gql`
  mutation(
    $id: ID!
    $name: String!
    $address: String!
    $rating: Float!
    $lat: Float!
    $lng: Float!
  ) {
    addResturant(
      id: $id
      name: $name
      address: $address
      rating: $rating
      lat: $lat
      lng: $lng
    ) {
      id
      name
      address
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
      address
      rating
      lat
      lng
    }
  }
`;

export { savedResturantList, addResturant };
