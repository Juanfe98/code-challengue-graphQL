import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from "@apollo/client";

import { APOLLO_CLIENT_URI } from "./contants";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

const client = new ApolloClient({
  uri: APOLLO_CLIENT_URI,
  cache: new InMemoryCache()
});

root.render(
  // Disabled to avoid use with duplicate requests
  // <StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // </StrictMode>
);
