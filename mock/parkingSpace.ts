import { Request, Response } from 'express';
import mockjs from 'mockjs';
import { defineMock } from "umi";


const Mock = require('mockjs');

export default defineMock({
    "/api/parkingSpace": (req: Request, res: Response) => {
        const parkingSpace = Mock.mock({
            'list|20': [{
                "id|+1": 1,
                "location": '@character("ABCDEF")',
                'number': '@integer(1, 10)',
                'price': '@integer(3, 5)',
                'is_available|1': [true, false],
                'type|1': [0, 1],
                'user_id|': [7, 8, 9]
            }],
            "total": '@integer(20, 200)'
        })
        res.status(200).json({
            "errorMessage": "success",
            "data": parkingSpace,
            "success": true
        })
    },
    'DELETE /api/parkingSpace/:id': (req: Request, res: Response) => {
        res.send({ status: 'ok', message: '删除成功！' });
    },
    'POST /api/parkingSpace': (req: Request, res: Response) => {
        console.log(req.body);
        res.send({ status: 'ok', message: '添加成功！' })
    },
}
)
