exports.formatDates = (arrObjList) => {};

exports.makeRefObj = (arrObjList) => {
  const objRef = {};
  arrObjList.forEach((list) => (objRef[list.title] = list.article_id));
  return objRef;
};

exports.formatComments = (comments, articleRef) => {};
