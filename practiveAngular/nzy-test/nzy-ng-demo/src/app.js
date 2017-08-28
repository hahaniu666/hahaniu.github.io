/**
 * Created by nzy on 17-5-5.
 */
angular.module("lottery", [])
    .controller('ctrl_lottery', ['$scope', '$timeout', function ($scope, $timeout) {

        //1.初始化奖品数据
        $scope.items = [
            {id: 1, name: "欧洲豪华游", status: 0},
            {id: 2, name: "Mac台式电脑", status: 0},
            {id: 3, name: "IPhone6手机", status: 0},
            {id: 4, name: "时尚山地车", status: 0},
            {id: 5, name: "高清数字电视", status: 0},
            {id: 6, name: "100元话费", status: 0}
        ];

        $scope.result = "奖品为空";
        $scope.$$ = function (id) {
            return document.getElementById(id);
        };

        $scope.showhide = function (pre, next) {
            pre = "step" + pre;
            next = "step" + next;
            $scope.$$(pre).style.display = "none";
            $scope.$$(next).style.display = "block";
        };

        //开始抽奖
        $scope.start = function () {
            $scope.showhide(1, 2);  //step1隐藏 step2显示
            var circle = 5;
            var selkey = Math.floor(Math.random() * $scope.items.length);
            var next = function (key) {
                $scope.items[key].status = true; //该奖品显示active状态 ng-class="{'active':item.status}"
                if ((key - 1) >= 0) {
                    $scope.items[key - 1].status = false;  //前一个奖品removeClass active
                }
                if (key == 0) {
                    $scope.items[$scope.items.length - 1].status = false;
                }
                var timer = $timeout(function () {
                    if (circle <= 0 && selkey == key) {  //完成指定圈数&&随机中奖数值与某个奖品的索引号一致
                        $scope.showhide(2, 3); //切换到显示奖品页面
                        $scope.result = $scope.items[key].name;
                        return;
                    }
                    if ($scope.items.length == key + 1) {
                        circle--;   //一圈结束
                    }
                    if ($scope.items[key + 1]) {
                        next(key + 1);       //循环调用next() 下一个奖品active
                    } else {
                        next(0);      //一圈结束，从头开始
                    }
                }, 100);
            };
            next(0); //首次执行next()
        };
        //显示奖品时
        $scope.reset = function () {
            $scope.showhide(3, 1); //隐藏 step3 显示step1
        };
        $scope.edit = function () {
            $scope.showhide(3, 4);
        };

        //修改奖品时
        $scope.add = function () {
            var last_id = lastid();
            $scope.items.push({id: last_id, name: $scope.name, status: 0});
        };
        $scope.del = function (id) {
            angular.forEach($scope.items, function (value, key) {
                if (id == value.id) {
                    $scope.items.splice(key, 1);
                }
            })
        };

        $scope.return = function () {
            $scope.showhide(4, 3);
        };

        //内部函数，获取最后一项数据的id号
        function lastid() {
            var id = 0;
            angular.forEach($scope.items, function (value, key) {
                if (id < value.id) {
                    id = value.id;
                }
            });
            return ++id; //最后一个元素id加1
        }
    }]);