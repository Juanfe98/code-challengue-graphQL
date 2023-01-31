import { render, screen } from "../../test-utils";
import { MockedProvider } from "@apollo/client/testing";
import CountryList, { GET_COUNTRIES } from "./CountryList";

it("renders with an error message", async () => {
  const mock = {
    request: {
      query: GET_COUNTRIES
    },
    error: new Error("An error occurred")
  };

  render(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <CountryList />
    </MockedProvider>
  );

  expect(await screen.findByText("An error occurred")).toBeInTheDocument();
});

it("renders the country cards", async () => {
  const mock = {
    request: {
      query: GET_COUNTRIES
    },
    result: {
      data: {
        countries: [
          {
            name: "Angola",
            code: "AO",
            emoji: "🇦🇴"
          }
        ]
      }
    }
  };

  const { findAllByTestId } = render(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <CountryList />
    </MockedProvider>
  );

  const countryCards = await findAllByTestId("country-card");

  expect(countryCards).toHaveLength(1);
});
