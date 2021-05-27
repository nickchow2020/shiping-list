process.env.NODE_ENV = "test"
const request = require("supertest")
const app = require("./app")
const db = require("./fakeDb")


beforeEach(function(){
    db.push({"name":"shumin"})
})

afterEach(function(){
    db.length = 0
})

describe("GET /items",function(){
    test("Get the list form db",async function(){
        const res = await request(app).get("/items")
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([{"name": "shumin"}])
    })
})


describe("POST /items",function(){
    test("post a new data",async function(){
        const res = await request(app).post("/items").send({
            "name":"stephen"
        })

        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({"added":{"name":"stephen"}})
    })

    test("Testing Error",async function(){
        const res = await request(app).post("/items").send({})

        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({
            "error": {
                "message": "Please enter body data",
                "status": 404
            }
            })
    })
})


describe("GET /:name",function(){
    test("testing getting specific object",async function(){
        const res = await request(app).get("/items/shumin")

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({"name":"shumin"})
    })
})


describe("PATCH /:name",function(){
    test("testing update object",async function(){
        const res = await request(app).patch("/items/shumin").send(
            {"name":"stephen"}
        )

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({"updated":{"name":"stephen"}})
    })
})


describe("DELETE /:name",function(){
    test("Testing delete object",async function(){
        const res = await request(app).delete("/items/shumin")

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({"message":"Deleted"})
    })
})
