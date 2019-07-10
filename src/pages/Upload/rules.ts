export default {
  fileTitle: {
      validator(rule:any, value:any, callback:any, source:any, options:any) {
          /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
         if(!value) {
              callback({
                  errMsg: "名称不能为空",
                  value,
                  errStatus: true
              });
          }else{
            callback({
              errMsg: "",
              value,
              errStatus: false
          });
          }
      }
  },
  fileInitialProvider: {
    validator(rule:any, value:any, callback:any, source:any, options:any) {
      /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
     if(!value) {
          callback({
              errMsg: "提供商不能为空",
              value,
              errStatus: true
          });
      }else{
        callback({
          errMsg: "",
          value,
          errStatus: false
      });
      }
  }
  },
  fileKeyWord:{
    validator(rule:any, value:any, callback:any, source:any, options:any) {
      /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
     if(!value) {
          callback({
              errMsg: "关键词不能为空",
              value,
              errStatus: true
          });
      }else{
        callback({
          errMsg: "",
          value,
          errStatus: false
      });
      }
  }
  },
  fileOwnerShipPrice:{
    validator(rule:any, value:any, callback:any, source:any, options:any) {
      /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
     if(!value) {
          callback({
              errMsg: "拥有价不能为空",
              value,
              errStatus: true
          });
      }else{
        callback({
          errMsg: "",
          value,
          errStatus: false
      });
      }
  }
  },
  fileReadPrice: {
    validator(rule:any, value:any, callback:any, source:any, options:any) {
      /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
     if(!value) {
          callback({
              errMsg: "阅读价不能为空",
              value,
              errStatus: true
          });
      }else{
        callback({
          errMsg: "",
          value,
          errStatus: false
      });
      }
  }
},
fileDescription:{
  validator(rule:any, value:any, callback:any, source:any, options:any) {
    /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
   if(!value) {
        callback({
            errMsg: "简介不能为空",
            value,
            errStatus: true
        });
    }else{
      callback({
        errMsg: "",
        value,
        errStatus: false
    });
    }
}
},
fileImage:{
  validator(rule:any, value:any, callback:any, source:any, options:any) {
    /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
   if(!value) {
        callback({
            errMsg: "封面链接不能为空",
            value,
            errStatus: true
        });
    }else{
      callback({
        errMsg: "",
        value,
        errStatus: false
    });
    }
}
}
};
