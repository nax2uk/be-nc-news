exports.formatDates = (arrObjList) => {
  return arrObjList.map(({ created_at, ...restOfList }) => {
    return { ...restOfList, created_at: new Date(created_at) };
  });
};

exports.makeRefObj = (arrObjList) => {
  const objRef = {};
  arrObjList.forEach((list) => (objRef[list.title] = list.article_id));
  return objRef;
};

exports.formatComments = (arrObjCommentsData, objArticleRef) => {
  return arrObjCommentsData.map((obj) => {
    const newObj = { ...obj };
    newObj.article_id = objArticleRef[newObj.belongs_to];
    delete newObj.belongs_to;
    newObj.author = newObj.created_by;
    delete newObj.created_by;
    newObj.created_at = new Date(newObj.created_at);
    return newObj;
  });
};
