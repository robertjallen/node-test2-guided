const supertest = require('supertest')
const server = require('../index')
const db = require('../data/config')

// afterAll(async () => {
//   await db.destroy()
// })

test("GET", async () => {
  const res = await supertest(server).get("/")
  expect(res.statusCode).toBe(200)
  expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(res.body.message).toBe("Welcome")
})

test("GET /hobbits", async () => {
  const res = await supertest(server).get("/hobbits")
  expect(res.statusCode).toBe(200)
  expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(res.body).toHaveLength(4)
  expect(res.body[0].name).toBe("sam")
})

test("GET /hobbits/:id", async () => {
  const res = await supertest(server).get("/hobbits/2")
  expect(res.statusCode).toBe(200)
  expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(res.body.id).toBe(2)
  expect(res.body.name).toBe("frodo")
})

test("POST /hobbits", async () => {
  const res = await supertest(server).post("/hobbits")
  .send({name: "bilbo"})
  expect(res.statusCode).toBe(200)
  expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(res.body.id).toBeDefined()
  expect(res.body.name).toBe("bilbo")
})