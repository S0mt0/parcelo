declare module "countries-list" {
  const countries: Record<string, { name: string; alpha2: string }>;
  export { countries };
}
