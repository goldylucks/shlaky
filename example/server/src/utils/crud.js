import pluralize from 'pluralize'

export const getOne = (model, { byUser = false } = {}) => async (req, res) => {
  const { item, error } = await this.services.db.getOne({ model, query })

  if (error) {
    console.error(error)
    res.status(400).end()
    return
  }

  if (!item) {
    res.status(400).end()
    return
  }

  res.status(200).json({ [itemKey(model)]: item })

  
  const query = { _id: req.params.id }
  if (byUser) {
    query.createdBy = req.user._id
  }
  try {
    const doc = await model
      .findOne(query)
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ [itemKey(model)]: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMany = model => async (req, res) => {
  try {
    const docs = await model
      .find({ createdBy: req.user._id })
      .lean()
      .exec()

    res.status(200).json({ [listKey(model)]: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOne = model => async (req, res) => {
  const createdBy = req.user._id
  try {
    const doc = await model.create({ ...req.body, createdBy })
    res.status(201).json({ [itemKey(model)]: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ [itemKey(model)]: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id,
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ [itemKey(model)]: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})

function itemKey(model) {
  return pluralize.singular(listKey(model))
}

function listKey(model) {
  return model.collection.name
}
