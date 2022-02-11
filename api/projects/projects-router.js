// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const {
    logger,
    checkProjectId
} = require('./projects-middleware');

const router = express.Router();

router.get('/', logger, async (req, res, next) => {
    try {
        const project = await Projects.get()
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
  })

router.get('/:id', logger, checkProjectId, async (req, res) => {
    res.json(req.project)
  })

router.post('/', logger, async (req, res, next) => {
    const newProject = req.body
    try {
      if(!req.body.name | !req.body.description | !req.body.completed){
            res.status(400).json({ message: 'invalid body structure'})
      } else{
        const addedProject = await Projects.insert(newProject)
        res.status(201).json(addedProject)
      }
    } catch (err) {
      next(err)
    }
  })

router.put('/:id', logger, checkProjectId, async (req, res, next) => {
    const { id } = req.params
    const projectChanges = req.body
    try {
      if(!req.body.name | !req.body.description | !req.body.completed){
            res.status(400).json({ message: 'invalid body structure'})
      } else{
        const updatedProject = await Projects.update(id, projectChanges)
        res.json(updatedProject)
      }
    } catch (err) {
      next(err)
    }
  })

router.delete('/:id', logger, checkProjectId, async (req, res, next) => {
    const id = req.params.id
    try {
      const deletedProject = await Projects.remove(id)
      res.json(deletedProject)
    } catch (err) {
      next(err)
    }
  })

router.get('/:id/actions', logger, checkProjectId, async (req, res, next) => {
    const id = req.params.id
    try {
        const projectActions = await Projects.getProjectActions(id)
        res.status(200).json(projectActions)
    } catch (err) {
        next(err)
    }
  })

module.exports = router