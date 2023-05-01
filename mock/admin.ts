import { Request, Response } from 'express';
import mockjs from 'mockjs';
import { defineMock } from "umi";

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
        res.status(200).json({
            "errorMessage": "success",
            "data": [{
                "id": mockjs.Random.integer(0, 1000),
                "orderNo": mockjs.Random.integer(0, 1000),
                "orderType": mockjs.Random.integer(0, 1000),
                "orderStatus": mockjs.Random.integer(0, 1000),
                "orderTime": mockjs.Random.integer(0, 1000),
                "orderAmount": mockjs.Random.integer(0, 1000),
                "orderUser": mockjs.Random.integer(0, 1000),
                "orderPhone": mockjs.Random.integer(0, 1000),
                "orderAddress": mockjs.Random.integer(0, 1000),
                "orderRemark": mockjs.Random.integer(0, 1000),
                "orderParkingSpace": mockjs.Random.integer(0, 1000),
                "orderParkingSpaceNo": mockjs.Random.integer(0, 1000),
                "orderParkingSpaceAddress": mockjs.Random.integer(0, 1000),
                "orderParkingSpacePrice": mockjs.Random.integer(0, 1000),
                "orderParkingSpaceStatus": mockjs.Random.integer(0, 1000),
                "orderParkingSpaceRemark": mockjs.Random.integer(0, 1000),
                "orderParkingSpaceType": mockjs.Random.integer(0, 1000),
                "orderParkingSpaceOwner": mockjs.Random.integer(0, 1000),
                "orderParkingSpacePhone": mockjs.Random.integer(0, 1000),
                "orderParkingSpaceDesc": mockjs.Random.integer(0, 1000),
                "orderParkingSpaceImg": mockjs.Random.integer(0, 1000),
            }],
            "success": true
        })
    }
})
