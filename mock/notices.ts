import { Request, Response } from 'express';
import mockjs from 'mockjs';
import { defineMock } from "umi";


const Mock = require('mockjs');

export default defineMock({
  "/api/notices": (req: Request, res: Response) => {
    const order = Mock.mock({
      'list|5': [{
        "id|+1": 1,
        "title": '@cword(5, 10)',
        "content": '@cword(20, 40)',
        'createTime': '@datetime',
        'userName': '@cname',
        'status|1': [0, 1],
      }],
      "total": '@integer(20, 200)'
    })
    res.status(200).json({
      "errorMessage": "success",
      "data": order,
      "success": true
    })
  },
  // 'DELETE /api/parkingSpace/:id': (req: Request, res: Response) => {
  //     res.send({ status: 'ok', message: '删除成功！' });
  // },
  // 'POST /api/parkingSpace': (req: Request, res: Response) => {
  //     console.log(req.body);
  //     res.send({ status: 'ok', message: '添加成功！' })
  //   },
}
)
