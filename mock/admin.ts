import { Request, Response } from 'express';
import mockjs from 'mockjs';
import { defineMock } from "umi";


const Mock = require('mockjs');

export default defineMock({
    "/api/admin/queryPanalData": (req: Request, res: Response) => {
        res.status(200).json({
            "errorMessage": "success",
            "data": {
                "userCount": mockjs.Random.integer(0, 1000),
                "orderCount": mockjs.Random.integer(0, 1000),
                "traffic": mockjs.Random.integer(0, 1000),
                "vacParkingSpace": mockjs.Random.integer(0, 1000)
            },
            "success": true
        })
    },
    "/api/admin/queryLineData": (req: Request, res: Response) => {
        res.status(200).json({
            "errorMessage": "success",
            "data": [{
                "Date": "2023-04-01",
                "scales": mockjs.Random.integer(0, 1000)
            }, {
                "Date": "2023-04-02",
                "scales": mockjs.Random.integer(0, 1000)
            },
            {
                "Date": "2023-04-03",
                "scales": mockjs.Random.integer(0, 1000)
            },
            {
                "Date": "2023-04-04",
                "scales": mockjs.Random.integer(0, 1000)
            },
            {
                "Date": "2023-04-05",
                "scales": mockjs.Random.integer(0, 1000)
            }
            ],
            "success": true
        })
    },
    "/api/admin/queryPieData": (req: Request, res: Response) => {
        res.status(200).json({
            "errorMessage": "success",
            "data": [{
                "type": "租赁",
                "value": mockjs.Random.integer(0, 1000)
            }, {
                "type": "购买",
                "value": mockjs.Random.integer(0, 1000)
            }
            ],
            "success": true
        })
    },
    "/api/admin/queryOrderList": (req: Request, res: Response) => {
        const orderList = Mock.mock({
            'data|10': [{
                "id|+1": 1,
                "orderNo": mockjs.Random.integer(0, 1000),
                "orderType": mockjs.Random.integer(0, 1000),
                "orderTime": mockjs.Random.datetime(),
                "orderUser": mockjs.Random.name(),
                "orderRemark": mockjs.Random.cword(5, 10),
                "orderParkingSpace": mockjs.Random.string(5),
                "orderParkingSpacePrice": mockjs.Random.integer(0, 1000),
                "orderParkingSpaceDesc": mockjs.Random.cword(5, 10),
            }]
        })
        res.status(200).json({
            "errorMessage": "success",
            "data": orderList,
            "success": true
        })
    },
}
)
