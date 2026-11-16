import { initialItems } from './data.mjs';
import { categories, toggleItem, visibleItems } from './logic.mjs';

const copy = {
  pt: {
    eyebrow: 'VITRINE TÉCNICA INDEPENDENTE',
    heading: 'Informação clara, em um só lugar.',
    intro: 'Uma demonstração isolada de como organizar conteúdo e serviços para uma comunidade acadêmica.',
    explore: 'Explorar conteúdo',
    editorLink: 'Ver painel simulado',
    notice: 'Dados fictícios. Esta vitrine não se conecta ao sistema real, não possui contas e não representa um serviço oficial.',
    contentLabel: 'CONTEÚDO',
    contentTitle: 'Encontre o que precisa',
    searchLabel: 'Buscar conteúdo',
    searchPlaceholder: 'Digite para filtrar',
    editorLabel: 'INTERAÇÃO',
    editorTitle: 'Prévia do painel',
    editorDescription: 'Ative ou oculte itens para observar como a vitrine responde. As mudanças ficam apenas nesta página e somem ao recarregar.',
    footer: 'Demonstração independente · dados fictícios',
    count: n => `${n} ${n === 1 ? 'item visível' : 'itens visíveis'}`,
    empty: 'Nenhum item encontrado.',
    categories: { all: 'Todos', resources: 'Recursos', services: 'Serviços', news: 'Notícias' },
    visible: 'Visível',
    hidden: 'Oculto'
  },
  en: {
    eyebrow: 'INDEPENDENT TECHNICAL SHOWCASE',
    heading: 'Clear information, all in one place.',
    intro: 'A standalone demonstration of content and service organization for an academic community.',
    explore: 'Explore content',
    editorLink: 'View simulated panel',
    notice: 'Fictional data. This showcase does not connect to the real system, has no accounts and is not an official service.',
    contentLabel: 'CONTENT',
    contentTitle: 'Find what you need',
    searchLabel: 'Search content',
    searchPlaceholder: 'Type to filter',
    editorLabel: 'INTERACTION',
    editorTitle: 'Panel preview',
    editorDescription: 'Show or hide items to see the showcase respond. Changes exist only on this page and reset when you reload.',
    footer: 'Independent demonstration · fictional data',
    count: n => `${n} visible ${n === 1 ? 'item' : 'items'}`,
    empty: 'No items found.',
    categories: { all: 'All', resources: 'Resources', services: 'Services', news: 'News' },
    visible: 'Visible',
    hidden: 'Hidden'
  }
};

let items = initialItems.map(item => ({ ...item }));
let language = 'pt';
let category = 'all';
let query = '';

const byId = id => document.getElementById(id);
const setText = (id, value) => { byId(id).textContent = value; };

function renderFilters() {
  const container = byId('filters');
  const nodes = categories.map(value => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter';
    button.textContent = copy[language].categories[value];
    button.setAttribute('aria-pressed', String(category === value));
    button.addEventListener('click', () => { category = value; render(); });
    return button;
  });
  container.replaceChildren(...nodes);
}

function renderCards() {
  const selected = visibleItems(items, { category, query, language });
  setText('visible-count', copy[language].count(selected.length));
  const nodes = selected.map(item => {
    const article = document.createElement('article');
    article.className = 'card';
    const icon = document.createElement('span');
    icon.className = 'card-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = { resources: '◈', services: '↗', news: '✦' }[item.category];
    const label = document.createElement('span');
    label.className = 'card-label';
    label.textContent = copy[language].categories[item.category];
    const title = document.createElement('h3');
    title.textContent = item.title[language];
    const description = document.createElement('p');
    description.textContent = item.description[language];
    article.append(icon, label, title, description);
    return article;
  });
  if (!nodes.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = copy[language].empty;
    nodes.push(empty);
  }
  byId('cards').replaceChildren(...nodes);
}

function renderEditor() {
  const nodes = items.map(item => {
    const row = document.createElement('div');
    row.className = 'editor-row';
    const info = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = item.title[language];
    const categoryLabel = document.createElement('small');
    categoryLabel.textContent = copy[language].categories[item.category];
    info.append(title, categoryLabel);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'visibility';
    button.setAttribute('aria-pressed', String(item.visible));
    button.setAttribute('aria-label', `${item.title[language]}: ${item.visible ? copy[language].visible : copy[language].hidden}`);
    button.textContent = item.visible ? copy[language].visible : copy[language].hidden;
    button.addEventListener('click', () => { items = toggleItem(items, item.id); render(); });
    row.append(info, button);
    return row;
  });
  byId('editor-items').replaceChildren(...nodes);
}

function render() {
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  const c = copy[language];
  for (const [id, key] of [
    ['eyebrow', 'eyebrow'], ['heading', 'heading'], ['intro', 'intro'],
    ['explore-link', 'explore'], ['editor-link', 'editorLink'], ['notice', 'notice'],
    ['content-label', 'contentLabel'], ['content-title', 'contentTitle'],
    ['search-label', 'searchLabel'], ['editor-label', 'editorLabel'],
    ['editor-title', 'editorTitle'], ['editor-description', 'editorDescription'],
    ['footer-note', 'footer']
  ]) setText(id, c[key]);
  byId('search').placeholder = c.searchPlaceholder;
  byId('language').textContent = language === 'pt' ? 'EN' : 'PT';
  renderFilters();
  renderCards();
  renderEditor();
}

byId('search').addEventListener('input', event => {
  query = event.target.value;
  renderCards();
});
byId('language').addEventListener('click', () => {
  language = language === 'pt' ? 'en' : 'pt';
  render();
});

render();
