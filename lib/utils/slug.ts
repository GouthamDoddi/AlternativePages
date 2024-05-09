function createSlug(title: string) {
  let slug = title.toLowerCase().trim();
  slug = slug.replace(/\s+/g, "-");
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  slug = slug.replace(/[^\w-]/g, "");
  slug = slug.replace(/-+/g, "-");
  slug = slug.replace(/^-+|-+$/g, "");
  return slug;
}

export default createSlug;
