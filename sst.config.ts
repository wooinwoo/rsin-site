/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "rsin-site",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      domain: input?.stage === "production" ? "rsin.rs-team.com" : "d-site-rsin.rsteam.co.kr",
    };
  },
  async run() {
    new sst.aws.Remix("RsinSite", {
      domain: $app.stage === "prod" ? "rsin.rs-team.com" : "d-site-rsin.rsteam.co.kr",
    });
  },
});
