import { Request, Response } from "express";
import { LIstOrderService } from "../../services/order/LIstOrderService";

class ListOrdersController {
  async handle(req: Request, res: Response) {
    const listOrdersService = new LIstOrderService();
    const orders = await listOrdersService.execute();
    return res.json(orders);
  }
}

export { ListOrdersController };
