// add middlewares here related to projects
const Projects = require('../projects/projects-model')

function logger(req, res, next) {
    console.log(req.method)
    console.log(req.url)
    console.log(Date.now())
    next()
  }

async function checkProjectId(req, res, next) {
    try {
        const possibleProject = await Projects.get(req.params.id)
        if (possibleProject) {
          req.project = possibleProject
          next()
        } else {
          next({ status: 404, message: `No Project ${req.params.id}` })
        }
      } catch (err) {
        next(err)
      }
}

module.exports = {
    logger,
    checkProjectId,
}