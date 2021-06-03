import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./styles/index.css";
import { Listings } from "./sections";

const client = new ApolloClient({
  uri: "http://localhost:4000/api",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Listings title="Tiny House app" />
  </ApolloProvider>,
  document.getElementById("root")
);
