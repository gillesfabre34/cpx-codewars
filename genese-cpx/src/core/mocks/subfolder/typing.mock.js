function functionWithoutTyping(z) {
    var a;
    var b;
    var c = 3;
    var d = 'a';
    var e = false;
    var f = new ClassWithUntypedMethods();
    var g = { a: 1 };
    var h = ClassWithUntypedMethods.getValue();
}
// TODO: detect classes with untyped properties
var ClassWithUntypedProperties = /** @class */ (function () {
    function ClassWithUntypedProperties() {
        this.c = 3;
        this.d = 'a';
        this.e = false;
        this.f = new ClassWithUntypedMethods();
    }
    return ClassWithUntypedProperties;
}());
var ClassWithUntypedMethods = /** @class */ (function () {
    function ClassWithUntypedMethods() {
    }
    ClassWithUntypedMethods.prototype.methodWithoutTyping = function (z) {
        var a;
        var b;
    };
    ClassWithUntypedMethods.getValue = function () {
        return 'v';
    };
    return ClassWithUntypedMethods;
}());
