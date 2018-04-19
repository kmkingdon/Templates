const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = module.exports = express()
const port = parseInt(process.env.PORT || 3000)
const queries = require("./queries");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))
app.use(cors({ origin: true }))

// Optional Static file handler:
// app.use('/', express.static('./build'))

// TODO: ADD (MOUNT) YOUR MIDDLEWARE (ROUTES) HERE:
// Example: app.use('/api/kitten', require('./routes/kitten'))


// These 2 `app.use` MUST be last `.use`'s
app.use(notFound)
app.use(errorHandler)

app.get("/lessonplans", (request, response) => {
    queries.read('lessonplans', request.params.id).then(plans => {
        plans
            ? response.json({ plans })
            : response.sendStatus(404)
    }).catch(console.error);
});

app.post("/lessonplans", (request, response) => {
    queries.create('lesson_plans', request.body).then(plans => {
        response.json({ plans });
    }).catch(console.error);
});

app.put("/lessonplans/:id", (request, response) => {
    queries.update('lesson_plans', request.params.id, request.body).then(plans => {
        response.json({ plans });
    }).catch(console.error);
});

app.delete("/lessontemplates/:id", (request, response) => {
    queries.delete('lesson_templates', request.params.id).then(() => {
        response.sendStatus(204);
    }).catch(console.error);
});

function notFound(req, res, next) {
    const url = req.originalUrl
    if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
        // Don't log less important (automatic) browser requests
        console.error('[404: Requested file not found] ', url)
    }
    res.status(404).send({ error: 'Url not found', status: 404, url })
}

function errorHandler(err, req, res, next) {
    console.error('ERROR', err)
    const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({ error: err.message, stack, url: req.originalUrl })
}

app.listen(port)
    .on('error', console.error.bind(console))
    .on('listening', console.log.bind(console, 'Listening on ' + port));