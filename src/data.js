export function generateData() {
  const items = [];
  const now = Date.now();

  for (let i = 0; i < 10; i++) {
    if (Math.random() > 0.7)
      continue;

    items.push({
      name: String.fromCharCode(65 + i),
      value: Math.random() * 100 + 10,
      timestamp: now
    });
  }

  return items;
}
