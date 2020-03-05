const express = require( 'express' )
const tasksController = require( '../controller/taskController' )
const router = express.Router()

router.get('/', tasksController.index  )
router.post('/', tasksController.storeTask )
router.get('/:id', tasksController.getTaskId )
router.delete('/:id', tasksController.delete )
router.put('/:id/change', tasksController.changeDone )
router.put('/:id', tasksController.update )

module.exports = router 