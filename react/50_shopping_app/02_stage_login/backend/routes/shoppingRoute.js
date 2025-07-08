import express from 'express';
import itemModel from '../models/item.js';

const router = express.Router();

router.get("/shopping", (req, res) => {
  itemModel.find().then((items) => {
    return res.status(200).json(items);
  }).catch((err) => {
    console.log("Failed to find shopping items. Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  })
});

router.post("/shopping", (req, res) => {
  if (!req.body || !req.body.type) {
    return res.status(400).json({ error: "Bad request" });
  }

  const item = new itemModel({
    type: req.body.type,
    count: req.body.count,
    price: req.body.price
  })

  item.save().then((item) => {
    return res.status(201).json(item);
  }).catch((err) => {
    console.log("Failed to create shopping item. Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  })
});

router.delete("/shopping/:id", (req, res) => {
  itemModel.deleteOne({"_id": req.params.id}).then(() => {
    return res.status(200).json({ message: "Success" });
  }).catch((err) => {
    console.log("Failed to delete shopping item. Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  })
});

router.put("/shopping/:id", (req, res) => {
  if (!req.body || !req.body.type) {
    return res.status(400).json({ error: "Bad request" });
  }

  const item = {
    type: req.body.type,
    count: req.body.count,
    price: req.body.price
  }

  itemModel.replaceOne({"_id": req.params.id}, item).then(() => {
    res.status(200).json({ message: "Success" });
  }).catch((err) => {
    console.log("Failed to edit shopping item. Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  })
});

export default router;