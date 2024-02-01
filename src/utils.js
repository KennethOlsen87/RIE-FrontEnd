export function calculateTotalCargoSize(productLine) {
  const totalCargoSize = productLine.reduce((acc, product) => {
    return acc + product.cargoSize;
  }, 0);

  return totalCargoSize;
}
