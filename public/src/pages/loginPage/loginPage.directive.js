
function LoginPageDirective($log) {
    return {
        scope: {
        },
        restrict: "E",
        controller: "LoginPageController",
        controllerAs: "ctrl",
        templateUrl: "src/pages/loginPage/loginPage.partial.html",
        link: function (scope, element, attrs, controller) {
        //    attrs.$observe("companyId", function (newVal) {
        //        controller.setCompanyByID(newVal);
        //    });
        //    scope.$watch("companyName", function (newVal) {
        //        if (angular.isObject(newVal)) {
        //            controller.setCompany(newVal);
        //        }
        //    });
        //    controller.setEnabled(scope.$eval(attrs.isEnabled));
        },
    };
}


angular.module("app").directive("ngjLoginPage", LoginPageDirective);
