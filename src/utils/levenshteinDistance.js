// Levenshtein Distance algorithm function
function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) dp[i][j] = j;
      else if (j === 0) dp[i][j] = i;
      else if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}

// Search function using Levenshtein Distance
function searchProperty(data, query) {
  const { address, minPrice, maxPrice, bedrooms, washrooms, type } = query;
  const result = data.filter((property) => {
    let match = true;

    if (address) {
      const distance = levenshteinDistance(
        property.address.toLowerCase(),
        address.toLowerCase(),
      );
      if (
        distance > 3 &&
        !property.address.toLowerCase().includes(address.toLowerCase())
      ) {
        // You can adjust the Levenshtein Distance threshold (3 in this case) as needed
        match = false;
      }
    }

    if (minPrice !== undefined && property.price < minPrice) {
      match = false;
    }

    if (maxPrice !== undefined && property.price > maxPrice) {
      match = false;
    }

    if (bedrooms !== undefined && property.bedroom !== bedrooms) {
      match = false;
    }

    if (washrooms !== undefined && property.washroom !== washrooms) {
      match = false;
    }

    if (type) {
      if (property.type.toLowerCase() !== type.toLowerCase()) {
        match = false;
      }
    }

    return match;
  });

  return result;
}

module.exports = {
  searchProperty,
};
