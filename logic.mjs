export const categories = ['all', 'resources', 'services', 'news'];

export function visibleItems(items, { category = 'all', query = '', language = 'pt' } = {}) {
  if (!categories.includes(category)) throw new TypeError('Invalid category');
  if (!['pt', 'en'].includes(language)) throw new TypeError('Invalid language');
  const term = String(query).trim().toLocaleLowerCase(language === 'pt' ? 'pt-BR' : 'en-US').slice(0, 80);
  return items.filter(item => {
    if (!item.visible || (category !== 'all' && item.category !== category)) return false;
    const text = `${item.title[language]} ${item.description[language]}`.toLocaleLowerCase(language === 'pt' ? 'pt-BR' : 'en-US');
    return !term || text.includes(term);
  });
}

export function toggleItem(items, id) {
  if (!items.some(item => item.id === id)) throw new TypeError('Unknown item');
  return items.map(item => item.id === id ? { ...item, visible: !item.visible } : item);
}
