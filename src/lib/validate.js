// 姓名，2～4個中文字
export const reg_name = (val) => {
    const validate = /^[\u4e00-\u9fa5]{2,4}$/
    return validate.test(val)
}

// 手機號碼，開頭0，後面9個數字 (0987987987)
export const reg_phoneType2 = (val) => {
    const validate = /0\d{3}\d{3}\d{3}$/
    return validate.test(val)
}

// Email
// 英文字開頭，不可由數字起始。可以接受「.」「-」和「_」
// 需要有@，且@後面由「.」連接英文字，沒有數字、符號
// @的前面能接受一個以上的英數與符號組合，如-abc-和.abc.
// 符號間不可連接，也不可連續，比如不可能出現user.-.acount@-mail.-com
export const reg_email = (val) => {
    const validate = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    return validate.test(val)
}

// 中低強度的密碼，只能包含數字、字母、下底線，6~18碼
export const reg_pwdCommon = (val) => {
    const validate = /^[a-zA-Z][a-zA-Z0-9_]{5,16}$/
    return validate.test(val)
}




// URL
export const reg_url = (val) => {
    const validate = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/
    return validate.test(val)
}
  
// 身分證ID (TW)
export const reg_twid = (val) => {
    const validate = /^[A-Za-z][12]\d{8}$/
    return validate.test(val)
}
  
// TEL (北北基)
export const reg_telTaipei = (val) => {
    const validate = /\d{2}-[2]\d{7}/
    return validate.test(val)
}
  
// 手機號碼 (0987-987-987)
export const reg_phoneType1 = (val) => {
    const validate = /\d{4}-\d{3}-\d{3}/
    return validate.test(val)
}
  
// 帶國碼且有'+'的手機號碼 (886+987987987)
export const reg_phoneType3 = (val) => {
    const validate = /\d{3}\+\d{3}\d{3}\d{3}/
    return validate.test(val)
}
  
// 帳號是否合法 (字母開頭，允許下底線，6~16碼)
export const reg_account = (val) => {
    const validate = /^[a-zA-Z][a-zA-Z0-9_]{5,16}$/
    return validate.test(val)
}
  
// 高強度密碼，包含特殊字元，需含有大小寫和數字，8~18碼
export const reg_pwdStrong = (val) => {
    const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,18}$/
    return validate.test(val)
}