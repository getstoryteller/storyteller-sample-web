import { Category } from './Category';

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return <Category category={params.category} />;
}
