import { toNumber } from "@vue/shared";

const formatMoney = (
  value,
  isoCode,
  { minFractionDigits = 2, maxFractionDigits = 2 } = {}
) => {
  var formatter = new Intl.NumberFormat("en-DE", {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
    style: "currency",
    currency: isoCode,
    currencyDisplay: "narrowSymbol",
  });

  return formatter.format(value);
};

const getPagesList = (pagination) => {
  const totalPages = toNumber(pagination.last_page);
  const page = toNumber(pagination.current_page);
  const maxLength = 10;
  // Returns an array of maxLength (or less) page numbers
  // where a 0 in the returned array denotes a gap in the series.
  // Parameters:
  //   totalPages:     total number of pages
  //   page:           current page
  //   maxLength:      maximum size of returned array
  if (maxLength < 10) throw "maxLength must be at least 10";

  function range(start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  }

  var sideWidth = maxLength < 9 ? 1 : 2;
  var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
  if (totalPages <= maxLength) {
    // no breaks in list
    return range(1, totalPages);
  }
  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    // no break on left of page
    return range(1, maxLength - sideWidth - 1).concat(
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }
  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    // no break on right of page
    return range(1, sideWidth).concat(
      0,
      range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
    );
  }
  // Breaks on both sides
  return range(1, sideWidth).concat(
    0,
    range(page - leftWidth, page + rightWidth),
    0,
    range(totalPages - sideWidth + 1, totalPages)
  );
};

const debounce = function (func, wait = 500, immediate = true) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

export { formatMoney, getPagesList, debounce };

export default {
  methods: {
    formatMoney,
    getPagesList,
    debounce,
  },
};
