// add middlewares here related to actions
const Actions = require('../actions/actions-model')

function logger(req, res, next) {
    console.log(req.method)
    console.log(req.url)
    console.log(Date.now())
    next()
  }

async function checkActionId(req, res, next) {
    try {
        const possibleAction = await Actions.get(req.params.id)
        if (possibleAction) {
          req.action = possibleAction
          next()
        } else {
          next({ status: 404, message: `No Action ${req.params.id}` })
        }
      } catch (err) {
        next(err)
      }
}

module.exports = {
    logger,
    checkActionId,
}