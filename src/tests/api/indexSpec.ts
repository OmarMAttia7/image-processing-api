import supertest from 'supertest';

import app from "../../api"

const request = supertest(app);

describe("GET /api", () => {

  it("responds with a 200 status", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  })

});