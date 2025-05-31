import * as yup from 'yup';

export const formulaSchema = yup.object().shape({
    value: yup.string()
        .required("Это поле не может быть пустым")
        .min(12, "Формула написана не полностью")
        .test('balanced-brackets',
            'Скобки должны быть сбалансированы',
            (value) => {
                const stack = [];
                for (let i = 0; i < value.length; i++) {
                    if (value[i] === '(') stack.push('(');
                    else if (value[i] === ')') {
                        if (stack.length === 0) return false;
                        stack.pop();
                    }
                }
                return stack.length === 0;
            })
        .test('no-forbidden-symbols',
            'Выражение содержит недопустимые символы',
            (value) => {
                const hasForbidden = /[#№"'{}<>$&%@^|~`_]/.test(value);
                const hasCyrillic = /[\u0400-\u04FF]/.test(value);
                return !hasForbidden && !hasCyrillic;
            })
        .matches(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:=\s*((?:(?:-?\d+(?:\.\d+)?)|(?:[a-zA-Z_][a-zA-Z0-9_]*)))(?:\s*([+\-*/])\s*((?:(?:-?\d+(?:\.\d+)?)|(?:[a-zA-Z_][a-zA-Z0-9_]*))))?\s*$/,
            'Формат:переменная:=выражение')


});