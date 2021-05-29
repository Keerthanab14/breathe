import configJson from "./auth_config.json";

export function getConfig() {
  // Configure the audience here. By default, it will take whatever is in the config
  // (specified by the `audience` key) unless it's the default value of "YOUR_API_IDENTIFIER" (which
  // is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you
  // don't have an API).
  // If this resolves to `null`, the API page changes to show some helpful info about what to do
  // with the audience.
  const audience =
    configJson.audience && configJson.audience !== "YOUR_API_IDENTIFIER"
      ? configJson.audience
      : null;

  const graphCMS = "https://api-eu-central-1.graphcms.com/v2/ckp9dhs06n1et01xpbrd37gd4/master?query=%7B%0A%20%20products%7B%0A%20%20%20%20name%0A%20%20%20%20breath%0A%20%20%7D%0A%7D";

  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
    ...(audience ? { audience } : null),
    graphCMS,
  };
}
