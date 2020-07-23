import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
// import { renderToStringAsync } from "react-render-to-string-async";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  useQuery,
  gql,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/react-ssr";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res, next) => {
  try {
    const client = new ApolloClient({
      link: new HttpLink({
        // Force failure
        // uri: "https://foo.bar",
        uri: "https://48p1r2roz4.sse.codesandbox.io",
        fetch: fetch as any,
      }),
      cache: new InMemoryCache(),
      ssrMode: true,
    });
    const root = <App client={client} />;
    await getDataFromTree(root);
    const html = renderToString(root);
    res.send(
      `<!doctype html>
      <html>
        <head>
          <title>Apollo Client Async SSR</title>
        </head>
        <body>
          ${html}
        <body>
      </html>
      `
    );
  } catch (ex) {
    console.error(ex);
    next(ex);
  }
});

app.listen(6060, () => {
  console.log("Server started on port 6060");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const ExchangeRates: React.FunctionComponent<any> = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  const hasData = !!data && data.rates;

  // 🤔 for some reason data exists but `loading` is true when we perform `renderToString`
  // after `getDataFromTree`?
  if (loading) return <p>Loading...{hasData ? "true" : "false"}</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }: any) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
};

const App: React.FunctionComponent<any> = ({ client }) => {
  console.log("RENDERING");
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <ExchangeRates />
      </div>
    </ApolloProvider>
  );
};
