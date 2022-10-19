import supertest from "supertest";
import app from "../../api";

describe("api/images", () => {
  const requset = supertest(app);

  it("responds with status 200", async () => {
    await requset.get("/api/images").expect(200);
  });

  it("responds with full image", async () => {
    await requset
      .get("/api/images/icelandwaterfall")
      .expect(200)
      .expect("Content-Type", /image/);
  });
});
