// PKDF2 的盐值，文档里建议至少 16 字节
// assert Buffer.from(SALT).length >= 16
export const SALT = "我为何这么帅";

// 提高迭代次数防爆破，但会增加运算量
export const iterations = 16;

// 固定的向量值，跟 Hash 里的盐值作用差不多
export const IV = "hithGRpq0orJcvDOZQwgZQ==";
