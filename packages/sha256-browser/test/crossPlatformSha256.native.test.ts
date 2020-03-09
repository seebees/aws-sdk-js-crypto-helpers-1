import { expect } from "chai";
import "mocha";
import { Sha256 } from "../src/crossPlatformSha256";

describe("Sha256", () => {
  it("should proxy method calls to underlying implementation", async () => {
    const sha256 = new Sha256();

    sha256.update("foo", "utf8");
    const promise =  await sha256.digest();
    console.log(promise)
  });
});
