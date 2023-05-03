import { Request, Response } from 'express';
import mockjs from 'mockjs';
import { defineMock } from "umi";


const Mock = require('mockjs');

export default defineMock({
    "/api/orders": (req: Request, res: Response) => {
        const order = Mock.mock({
            'list|20': [{
                "id|+1": 1,
                "location": '@character("ABCDEF")',
                'number': '@integer(1, 10)',
                'price': '@integer(3, 5)',
                'status|1': [0, 1],
                'type|1': [0, 1],
                'startTime': '@datetime',
                'endTime': '@datetime',
                'totalPrice': '@integer(20, 200)',
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
