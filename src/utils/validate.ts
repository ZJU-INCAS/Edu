import Schema from 'async-validator';
/*
* @params form: {
*   descriptor: 验证规则
*   source: 待验证字段
*   callback: 异步验证回调函数
* }
*
* @return errInfo {
*   isAllValid: 验证是否通过
 *  errors: 验证失败的字段信息
* }
* 不管验证结果成功还是失败,都会将结果信息写入errors中,方便调用者直接通过数组下标方式获取验证结果信息
* */
interface FormField {
  descriptor: any
  source: any
  callback?: any
}
function validate (form: FormField) {
    let errInfo: any = {};
    let errStatus:any = [];
    let descriptor = form.descriptor;
    let validator = new Schema(descriptor);
    validator.validate(form.source, {
        firstFields: true  // 如果一个字段对应多个验证规则, 只显示验证失败的第一个规则信息,并不再进行后续规则的验证
    }, (errors: any, fields: any) => {
        if (errors) {
            /* 如需异步验证需要传入回调函数callback */
            errors.forEach((item: any) => {
                errStatus.push(item.message.errStatus);
            });
            errInfo.errors = errors;
            errInfo.isAllValid = !errStatus.includes(true);
            form.callback && form.callback(errInfo);
        }
    });
    return errInfo;
}

export default validate;
