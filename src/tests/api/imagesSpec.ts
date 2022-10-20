import supertest from "supertest";
import app from "../../api";

describe("/api/images", () => {
  const requset = supertest(app);

  it("responds with status 200", async () => {
    await requset.get("/api/images").expect(200);
  });

  /*
    TODO
    - dynamically generate test image names to avoid test bugs if file names change
  */
  it("responds with full image", async () => {
    await requset
      .get("/api/images/icelandwaterfall")
      .expect(200)
      .expect("Content-Type", /image/);
  });

  it("responds with status 404 if image is not found", async () => {
    await requset.get("/api/images/doesntexist").expect(404);
  });
});
