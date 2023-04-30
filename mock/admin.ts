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
})
