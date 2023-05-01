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
            "data": orderList.data,
            "success": true
        })
    },
    "/api/admin/queryUserList": (req: Request, res: Response) => {
        const user = Mock.mock({
            'list|20': [{
                "id|+1": 1,
                "userName": '@cname',
                'phone': /^1[3456789]\d{9}$/,
                "address": '@county(true)@natural(1,100)号@natural(1,20)栋@natural(101,200)室',
                "idNum": () => {
                    return Mock.Random.id(18);
                },
                "lastLogin": '@datetime',
                "role|1": ["admin", "user"],
            }],
            'total': '@integer(20, 200)'
        })


        res.status(200).json({
            "errorMessage": "success",
            "data": user.data,
            "success": true
        })
    },
    "/api/admin/queryParkingSpace": (req: Request, res: Response) => {
        const parkingSpace = Mock.mock({
            'list|20': [{
                "id|+1": 1,
                "location": '@character("ABCDEF")区',
                'number': '@integer(1, 10)号',
                'price': '@integer(1, 10)',
                'desc': '@cword(5, 10)',
                'status|1': [0, 1, 2, 3],
                'type|1': [0, 1],
                'operateTime': '@datetime',
            }],
            "total":'@integer(20, 200)'
        })
        res.status(200).json({
            "errorMessage": "success",
            "data": parkingSpace,
            "success": true
        })
    },

}
)
