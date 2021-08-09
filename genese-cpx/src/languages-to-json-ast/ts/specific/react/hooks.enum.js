"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReactHook = exports.ReactHook = void 0;
var ReactHook;
(function (ReactHook) {
    ReactHook["USE_ACTIONS"] = "useActions";
    ReactHook["USE_CALLBACK"] = "useCallback";
    ReactHook["USE_CONTEXT"] = "useContext";
    ReactHook["USE_DEBUG_VALUE"] = "useDebugValue";
    ReactHook["USE_DISPATCH"] = "useDispatch";
    ReactHook["USE_EFFECT"] = "useEffect";
    ReactHook["USE_HEADER"] = "useHeader";
    ReactHook["USE_IMPERATIVE_HANDLE"] = "useImperativeHandle";
    ReactHook["USE_LAYOUT_EFFECT"] = "useLayoutEffect";
    ReactHook["USE_MEMO"] = "useMemo";
    ReactHook["USE_MODAL"] = "useModal";
    ReactHook["USE_NAV_BAR"] = "useNavBar";
    ReactHook["USE_NAVIGATION"] = "useNavigation";
    ReactHook["USE_REDUCER"] = "useReducer";
    ReactHook["USE_REF"] = "useRef";
    ReactHook["USE_REQUEST"] = "useRequest";
    ReactHook["USE_ROUTE"] = "useRoute";
    ReactHook["USE_SELECTOR"] = "useSelector";
    ReactHook["USE_SHALLOW_EQUAL_SELECTOR"] = "useShallowEqualSelector";
    ReactHook["USE_STATE"] = "useState";
    ReactHook["USE_STORE"] = "useStore";
})(ReactHook = exports.ReactHook || (exports.ReactHook = {}));
function isReactHook(name) {
    return Object.values(ReactHook).includes(name);
}
exports.isReactHook = isReactHook;
