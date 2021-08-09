var simpleReactComponent = function () {
    var arrow = function () {
        var b = 3;
    };
};
var typedReactComponent = function () {
    var a = 2;
    var arrow = function () {
        var b = 3;
    };
};
var reactComponentWithTwoArrowFunctions = function () {
    var firstArrow = function () {
        var a = 3;
    };
    var secondArrow = function () {
        var b = 3;
    };
};
var arrowFunctionWithParameter = function (a) {
    if (a === 2) {
        a++;
    }
    var arrow = function () {
        var b = 3;
    };
};
