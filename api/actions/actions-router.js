// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const {
    logger,
    checkActionId
} = require('./actions-middlware');

const router = express.Router();

router.get('/', logger, async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
  })

router.get('/:id', logger, checkActionId, async (req, res) => {
    res.json(req.action)
  })

router.post('/', logger, async (req, res, next) => {
    const newAction = req.body
    try {
      if(!req.body.notes | !req.body.description | !req.body.project_id){
            res.status(400).json({ message: 'invalid action structure'})
      } else{
        const addedAction = await Actions.insert(newAction)
        res.status(201).json(addedAction)
      }
    } catch (err) {
      next(err)
    }
  })

router.put('/:id', logger, checkActionId, async (req, res, next) => {
    const { id } = req.params
    const actionChanges = req.body
    try {
      if(!req.body.notes | !req.body.description | !req.body.completed | !req.body.project_id){
          res.status(400).json({ message: 'invalid action structure'})
      } else{
        const updatedAction = await Actions.update(id, actionChanges)
        res.json(updatedAction)
      } 
    } catch (err) {
      next(err)
    }
  })

router.delete('/:id', logger, checkActionId, async (req, res, next) => {
    const id = req.params.id
    try {
      const deletedAction = await Actions.remove(id)
      res.json(deletedAction)
    } catch (err) {
      next(err)
    }
  })

module.exports = router