const express = require( 'express' )
const tasksController = require( '../controller/taskController' )
const router = express.Router()

router.get('/', tasksController.index  )
router.post('/', tasksController.storeTask )
router.get('/:id', tasksController.getTaskId )
router.delete('/:id', tasksController.delete )

module.exports = router