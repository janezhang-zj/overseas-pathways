// Generate access codes for 面包多 digital product sales
// Usage: node scripts/generate-codes.mjs [count] [prefix]
import { randomBytes } from "crypto";

const count = parseInt(process.argv[2] || "20");
const prefix = process.argv[3] || "PW2026";

console.log(`Generating ${count} codes with prefix "${prefix}"...\n`);

for (let i = 0; i < count; i++) {
  const random = randomBytes(4).toString("hex").toUpperCase();
  const code = `${prefix}-${random}`;
  console.log(code);
}

console.log(`\n✅ ${count} codes generated.`);
console.log("Copy these codes into data/access-codes.json under the 'codes' key.");
console.log("Then upload each code as a separate 'sku' on 面包多 (mbd.pub).");
