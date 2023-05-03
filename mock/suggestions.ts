import { Request, Response } from 'express';
import mockjs from 'mockjs';
import { defineMock } from "umi";


const Mock = require('mockjs');

export default defineMock({
    "/api/suggestions": (req: Request, res: Response) => {
        const order = Mock.mock({
            'list|20': [{
                "id|+1": 1,
                "userName": '@cword(2, 4)',
                "suggestTime": '@datetime',
                "content": '@cword(10, 20)',
                "reply": '@cword(10, 20)',
                "replyTime": '@datetime',
                "replyUser": '@cword(2, 4)',
                'status|1': [0, 1, 2],
            }],
            "total": '@integer(20, 200)'
        })
        res.status(200).json({
            "errorMessage": "success",
            "data": order,
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
