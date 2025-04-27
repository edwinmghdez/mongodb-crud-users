const request = require("supertest");
const app = require("../src/server");
const db = require("../src/config/db");
const User = require("../src/models/userModel");

beforeAll(async () => db.connect());

afterEach(async () => db.clear());

afterAll(async () => db.close());

describe("User Controller", () => {
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
    });
  });

  it("should get all users", async () => {
    const response = await request(app).get("/api/v1/users");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: testUser.name,
          email: testUser.email,
        }),
      ])
    );
  });

  it("should get a specific user", async () => {
    const response = await request(app).get(`/api/v1/users/${testUser._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      _id: testUser._id.toString(),
      name: testUser.name,
    });
  });

  it("should create a new user", async () => {
    const newUser = {
      name: "John",
      last_name: "Does",
      email: "john@example.com",
      password: "Password123",
    };

    const response = await request(app).post("/api/v1/users").send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      name: newUser.name,
      email: newUser.email,
    });

    // Verify changes in DB
    const dbUser = await User.findById(response.body._id);
    expect(dbUser).toBeTruthy();
  });

  it("should update a user", async () => {
    const updates = { name: "Updated Name" };

    const response = await request(app)
      .put(`/api/v1/users/${testUser._id}`)
      .send(updates);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updates.name);

    // Verify changes in DB
    const updatedUser = await User.findById(testUser._id);
    expect(updatedUser.name).toBe(updates.name);
  });

  it("should delete a user", async () => {
    const response = await request(app).delete(`/api/v1/users/${testUser._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeNull();

    // Verify changes in DB
    const deletedUser = await User.findById(testUser._id);
    expect(deletedUser).toBeNull();
  });
});
