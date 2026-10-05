(function(root){root.PythonRunner=String.raw`
import json, io, contextlib, traceback

class _LimitedOutput(io.StringIO):
    def write(self, text):
        available = max(0, 6000 - self.tell())
        super().write(text[:available])
        return len(text)

def _same_value(actual, expected):
    if isinstance(expected, bool):
        return isinstance(actual, bool) and actual == expected
    if expected is None:
        return actual is None
    if isinstance(expected, (int, float)):
        return type(actual) in (int, float) and actual == expected
    if isinstance(expected, list):
        return isinstance(actual, list) and len(actual) == len(expected) and all(_same_value(a, b) for a, b in zip(actual, expected))
    if isinstance(expected, dict):
        return isinstance(actual, dict) and actual.keys() == expected.keys() and all(_same_value(actual[k], expected[k]) for k in expected)
    return type(actual) is type(expected) and actual == expected

def _run_case(source, case, check):
    output = _LimitedOutput()
    try:
        scope = {"__name__": "__practice__"}
        with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
            exec(compile(source, "solution.py", "exec"), scope)
            solve = scope.get("solve")
            if not callable(solve):
                raise ValueError("Определите функцию solve(data) и верните результат через return.")
            value = solve(case["input"])
        passed = _same_value(value, case.get("expected")) if check else None
        try:
            shown = json.dumps(value, ensure_ascii=False, allow_nan=False)
        except (TypeError, ValueError):
            shown = repr(value)
        return {"passed": passed, "actual": shown[:4000], "stdout": output.getvalue(), "error": None}
    except BaseException:
        return {"passed": False, "actual": None, "stdout": output.getvalue(), "error": traceback.format_exc(limit=5)[-5000:]}

_request = json.loads(payload)
_result = [_run_case(_request["code"], case, _request["check"]) for case in _request["cases"]]
json.dumps(_result, ensure_ascii=False)
`;if(typeof module!=='undefined')module.exports=root.PythonRunner;})(typeof globalThis!=='undefined'?globalThis:this);
