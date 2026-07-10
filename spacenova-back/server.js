import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 7300
let asteroids = []

app.use(express.json())

app.use(cors({
    origin: "https://spacenova-fb63f.web.app/"
}))

app.get('/asteroids', (req, res) => {
    res.status(200).json(asteroids)
})

app.get('/asteroids/:id', (req, res) => {
    const asteroid = asteroids.find(a => a.id === req.params.id)
    if (!asteroid) {
        return res.status(404).json({
            error: 'Asteroid not found'
        })
    }

    res.status(200).json(asteroid)
})

app.delete('/asteroids/:id', (req, res) => {
    const index = asteroids.findIndex(a => a.id === req.params.id)

    if (index === -1) {
        return res.status(404).json({
            error: 'Not found'
        })
    }

    asteroids.splice(index, 1)
    res.status(200).json({
        message: 'Delete successfully'
    })

})

app.post('/asteroids', (req, res) => {
    const { name, minDiameter, maxDiameter, hazardous, approachDate, velocity, orbitingBody } = req.body

    if (!name || !minDiameter || !maxDiameter || hazardous === undefined || !approachDate || !velocity || !orbitingBody) {
        return res.status(400).json({
            error: 'Input required'
        })
    }

    const newAsteroid = {
        id: crypto.randomUUID(),
        name,
        minDiameter,
        maxDiameter,
        hazardous,
        approachDate,
        velocity,
        orbitingBody
    }

    asteroids.push(newAsteroid)
    res.status(201).json(newAsteroid)
})

app.put('/asteroids/:id', (req, res) => {
    const { name, minDiameter, maxDiameter, hazardous, approachDate, velocity, orbitingBody } = req.body

    if (!name || !minDiameter || !maxDiameter || hazardous === undefined || !approachDate || !velocity || !orbitingBody) {
        return res.status(400).json({
            error: 'Input required'
        })
    }

    const index = asteroids.findIndex(a => a.id === req.params.id)
    if (index === -1) {
        return res.status(404).json({
            error: 'Not found'
        })
    }

    asteroids[index] = {
        ...asteroids[index],
        name,
        minDiameter,
        maxDiameter,
        hazardous,
        approachDate,
        velocity,
        orbitingBody
    }

    res.status(200).json(asteroids[index])
})

app.patch('/asteroids/:id', (req, res) => {
    const asteroid = asteroids.find(a => a.id === req.params.id)

    if (!asteroid) {
        return res.status(404).json({
            error: 'Not found'
        })
    }

    const { name, minDiameter, maxDiameter, hazardous, approachDate, velocity, orbitingBody } = req.body

    if (name) asteroid.name = name
    if (minDiameter) asteroid.minDiameter = minDiameter
    if (maxDiameter) asteroid.maxDiameter = maxDiameter
    if (hazardous) asteroid.hazardous = hazardous
    if (approachDate) asteroid.approachDate = approachDate
    if (velocity) asteroid.velocity = velocity
    if (orbitingBody) asteroid.orbitingBody = orbitingBody

    res.status(200).json(asteroid)
})

app.listen(PORT, async () => {
    const API_URL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key='
    const API_KEY = '6U6EJ2FYWVaAyd55wY6loz9JcGIs4IwDMuVRv3iV'

    try {
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
        console.log(asteroids)

    } catch (error) {
        console.log(error)
    }
})