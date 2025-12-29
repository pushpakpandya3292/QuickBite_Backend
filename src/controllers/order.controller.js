
const orderService = require("../services/order.service");
const { Order } = require("../models");
exports.create=async(req,res)=>res.json(await orderService.createOrder(req.body));
exports.get=async(req,res)=>res.json(await Order.findByPk(req.params.id));
