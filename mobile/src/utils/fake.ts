export function generateRandomPatternArray(): number[] {
  const array: number[] = [];

  // Gera um número aleatório entre 0 e 5 para determinar a quantidade de 1s no início
  const numOnes = Math.floor(Math.random() * 6);

  // Preenche o array conforme o padrão
  for (let i = 0; i < numOnes; i++) {
    array.push(1);
  }
  for (let i = numOnes; i < 5; i++) {
    array.push(0);
  }

  return array;
}

export function generateRandomValue(): string {
  const randomRealPart = Math.floor(Math.random() * 6) + 10; // Gera um número aleatório entre 10 e 15 (inclusive)
  const randomCentavosPart = Math.random() < 0.5 ? "00" : "50"; // 50% de chance de ser 00, 50% de chance de ser 50

  // Formata o valor no formato desejado
  const formattedValue = `${randomRealPart},${randomCentavosPart}`;

  return formattedValue;
}
