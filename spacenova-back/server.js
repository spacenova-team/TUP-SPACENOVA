import express from 'express'
import cors from 'cors'
import { db, auth } from './firebase.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 7300
let asteroids = []

app.use(express.json())

app.use(cors({
    origin: ["https://spacenova-fb63f.web.app", "http://localhost:4200"]
}))

async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token required",
            })
        }

        const token = authHeader.split(' ')[1]
        const decoded = await auth.verifyIdToken(token)

        req.user = decoded
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Error to authenticate'
        })
    }
}

function isCientific(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            message: 'Authentication required'
        })
    }

    if (req.user.role !== 'cientific') {
        return res.status(403).json({
            message: 'Access denied. Only cientifics can access'
        })
    }

    next()
}

app.get('/asteroids', authenticate, async (req, res) => {

    const snapshot = await db.collection('asteroids').get()
    const allAsteroids = snapshot.docs.map(doc => doc.data())

    console.log(allAsteroids)

    res.status(200).json(allAsteroids)
})

app.get('/asteroids/:id', authenticate, async (req, res) => {
    const asteroid = await db.collection('asteroids').doc(req.params.id).get()

    if (!asteroid.exists) {
        return res.status(404).json({
            error: 'Asteroid not found'
        })
    }

    res.status(200).json(asteroid.data())
})

app.delete('/asteroids/:id', authenticate, isCientific, async (req, res) => {

    await db.collection('asteroids').doc(req.params.id).delete()

    res.status(200).json({
        message: 'Delete successfully'
    })

})

app.post('/asteroids', authenticate, isCientific, async (req, res) => {
    const { name, minDiameter, maxDiameter, hazardous, approachDate, velocity, orbitingBody } = req.body

    if (!name || !minDiameter || !maxDiameter || hazardous === undefined || !approachDate || !velocity || !orbitingBody) {
        return res.status(400).json({
            error: 'Input required'
        })
    }

    try {
        const newId = crypto.randomUUID()
        const newAsteroid = {
            id: newId,
            name,
            minDiameter,
            maxDiameter,
            hazardous,
            approachDate,
            velocity,
            orbitingBody
        }

        await db.collection('asteroids').doc(newId).set(newAsteroid)
        res.status(201).json(newAsteroid)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server error'
        })
    }

})

app.put('/asteroids/:id', authenticate, isCientific, async (req, res) => {
    const { name, minDiameter, maxDiameter, hazardous, approachDate, velocity, orbitingBody } = req.body

    if (!name || !minDiameter || !maxDiameter || hazardous === undefined || !approachDate || !velocity || !orbitingBody) {
        return res.status(400).json({
            error: 'Input required'
        })
    }

    try {
        const docRef = db.collection('asteroids').doc(req.params.id)
        const snapshot = await docRef.get()

        if (!snapshot.exists) {
            return res.status(404).json({
                message: 'Not found asteroid to update'
            })
        }

        const updateAsteroid = {
            id: snapshot.data().id,
            name,
            minDiameter,
            maxDiameter,
            hazardous,
            approachDate,
            velocity,
            orbitingBody
        }

        await docRef.set(updateAsteroid)
        res.status(200).json(updateAsteroid)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

app.patch('/asteroids/:id', authenticate, isCientific, async (req, res) => {

    try {
        const docRef = db.collection('asteroids').doc(req.params.id)
        const snapshot = await docRef.get()

        if (!snapshot.exists) {
            return res.status(404).json({
                message: 'Not found asteroid to update'
            })
        }

        const currentAsteroid = snapshot.data()
        const { name, minDiameter, maxDiameter, hazardous, approachDate, velocity, orbitingBody } = req.body

        const updateFields = {}
        if (name) updateFields.name = name
        if (minDiameter) updateFields.minDiameter = minDiameter
        if (maxDiameter) updateFields.maxDiameter = maxDiameter
        if (hazardous) updateFields.hazardous = hazardous
        if (approachDate) updateFields.approachDate = approachDate
        if (velocity) updateFields.velocity = velocity
        if (orbitingBody) updateFields.orbitingBody = orbitingBody

        await docRef.update(updateFields)
        const updateSnapshot = await docRef.get()
        res.status(200).json(updateSnapshot.data())

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server error'
        })
    }

})

app.listen(PORT, async () => {
    const API_URL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key='
    const API_KEY = '6U6EJ2FYWVaAyd55wY6loz9JcGIs4IwDMuVRv3iV'

    try {

        const database = await db.collection('asteroids').limit(1).get()
        if (!database.empty) {
            console.log('Asteroids collection is already full')
            return
        }

        const response = await fetch(`${API_URL}${API_KEY}`)

        if (!response.ok) {
            return 'error'
        }

        const data = await response.json()
        asteroids = Object.values(data.near_earth_objects).flat().map(a => ({
            id: a.id,
            name: a.name,
            minDiameter: Number(a.estimated_diameter.meters?.estimated_diameter_min.toFixed(2)),
            maxDiameter: Number(a.estimated_diameter.meters?.estimated_diameter_max.toFixed(2)),
            hazardous: a.is_potentially_hazardous_asteroid,
            approachDate: a.close_approach_data[0].close_approach_date_full,
            velocity: Number(a.close_approach_data[0].relative_velocity?.kilometers_per_hour),
            orbitingBody: a.close_approach_data[0].orbiting_body
        }))

        const batch = db.batch()
        asteroids.forEach(asteroid => {
            const docRef = db.collection('asteroids').doc(asteroid.id)

            batch.set(docRef, {
                id: asteroid.id,
                name: asteroid.name,
                minDiameter: asteroid.minDiameter,
                maxDiameter: asteroid.maxDiameter,
                hazardous: asteroid.hazardous,
                approachDate: asteroid.approachDate,
                velocity: asteroid.velocity,
                orbitingBody: asteroid.orbitingBody
            })
        })
        await batch.commit()
        console.log(asteroids)

    } catch (error) {
        console.log(error)
    }
})