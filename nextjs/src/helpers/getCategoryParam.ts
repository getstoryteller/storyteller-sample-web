export function getCategoryParamFromName(categoryName: string) {
  const hyphenatedCategory = categoryName.toLowerCase().split(' ').join('-');
  return encodeURIComponent(hyphenatedCategory);
}

export function getCategoryNameFromParam(categoryParam: string) {
  const decodedCategoryParam = decodeURIComponent(categoryParam);

  return decodedCategoryParam.split('-').join(' ');
}
