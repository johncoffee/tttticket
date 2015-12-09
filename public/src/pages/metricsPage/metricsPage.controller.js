function MetricsPageController($log) {
    
    this.onChartReady = function () {
    };
    
    this.chartObject = {
        "type": "AreaChart",
        "displayed": true,
        "data": {
            "cols": [
                {
                    "id": "month",
                    "label": "Month",
                    "type": "string",
                    "p": {}
                },
                {
                    "id": "regular",
                    "label": "Regular",
                    "type": "number",
                    "p": {}
                },
                {
                    "id": "student",
                    "label": "Student",
                    "type": "number",
                    "p": {}
                },
            ],
            "rows": [
                {
                    "c": [
                        {
                            "v": "January"
                        },
                        {
                            "v": 5,
                        },
                        {
                            "v": 2,
                        },
                    ]
                },
                {
                    "c": [
                        {
                            "v": "February"
                        },
                        {
                            "v": 19
                        },
                        {
                            "v": 12
                        },
                    ]
                },
                {
                    "c": [
                        {
                            "v": "March"
                        },
                        {
                            "v": 24
                        },
                        {
                            "v": 21
                        },
                    ]
                }
            ]
        },
        "options": {
            "title": "Total sales",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "Tickets sold",
                "gridlines": {
                    "count": 15
                }
            },
            "hAxis": {
                "title": "Date"
            }
        },
        "formatters": {},
        "view": {}
    };
    
}

angular.module("app").controller("MetricsPageController", MetricsPageController);
