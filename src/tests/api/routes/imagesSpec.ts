import supertest from "supertest";
import app from "../../../api";

describe("/api/images endpoint", () => {
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

  it("responds with resized image", async () => {
    await requset
      .get("/api/images/fjord?width=100&height=100")
      .expect(200)
      .expect("Content-Type", /image/);
  });

  it("responds with status 400 if query parameters are invalid", async () => {
    await requset
      .get("/api/images/fjord?width=stringWidth&height=100")
      .expect(400);

    await requset
      .get("/api/images/fjord?width=100&height=stringHeight")
      .expect(400);
  });
});
