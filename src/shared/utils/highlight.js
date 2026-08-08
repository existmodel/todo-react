const escapeHTML = (unsafeString) => {
  // Экранирует специальные символы HTML.
  return unsafeString
    .replaceAll(/&/g, "&amp;")
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&#39;");
};

const escapeRegExp = (unsafeString) => {
  //Экранирует спецсимволы в регулярных выражениях.
  return unsafeString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const highlightCaseInsensitive = (text, query) => {
  //Находит все совпадения поискового запроса query в тексте text и оборачивает их в HTML-тег <mark> для визуальной подсветки.
  const safeText = escapeHTML(text);
  const queryFormatted = query.trim();

  if (queryFormatted.length === 0) {
    return safeText;
  }

  const pattern = new RegExp(escapeRegExp(queryFormatted), "ig");

  return safeText.replace(pattern, `<mark>$&</mark>`);
};

// защита от XSS и работа с чувствительными данным
//безопасно подсветить искомый текст (поисковую фразу) внутри строки, не допуская XSS-уязвимостей.
